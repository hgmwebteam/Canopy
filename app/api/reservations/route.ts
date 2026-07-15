import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseServer } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { upsertGhlContact } from "@/lib/ghl";
import { RESERVATION_AMOUNT_CENTS } from "@/lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const fullName =
    typeof body?.fullName === "string" ? body.fullName.trim().slice(0, 200) : null;
  const phone = typeof body?.phone === "string" ? body.phone.trim().slice(0, 40) : null;
  const leadId = typeof body?.leadId === "string" ? body.leadId : null;

  const id = randomUUID();
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("reservations").insert({
    id,
    lead_id: leadId,
    email,
    full_name: fullName,
    phone,
    status: "started",
    amount_cents: RESERVATION_AMOUNT_CENTS,
  });
  if (error) {
    console.error("[reservations] insert failed:", error);
    return NextResponse.json(
      { error: "Could not start your reservation — please try again" },
      { status: 500 }
    );
  }

  const [firstName, ...rest] = (fullName ?? "").split(/\s+/).filter(Boolean);
  await upsertGhlContact({
    email,
    firstName,
    lastName: rest.join(" ") || undefined,
    phone: phone ?? undefined,
    tags: ["canopy-reservation-started"],
    source: "canopy-checkout",
  });

  const stripe = getStripe();
  if (!stripe) {
    // Demo mode until Stripe keys are configured (Milestone 3).
    return NextResponse.json({ ok: true, demo: true, reservationId: id });
  }

  const intent = await stripe.paymentIntents.create({
    amount: RESERVATION_AMOUNT_CENTS,
    currency: "usd",
    receipt_email: email,
    metadata: { reservationId: id },
  });
  return NextResponse.json({
    ok: true,
    reservationId: id,
    clientSecret: intent.client_secret,
  });
}
