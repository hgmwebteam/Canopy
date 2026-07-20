import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";
import { sanitizeUtm } from "@/lib/utm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Early abandoned-checkout capture: syncs the contact to GHL with the
 * canopy-reservation-started tag as soon as name + email are typed on
 * /checkout — before any payment attempt, so recovery emails reach
 * people who never click Pay. No DB write; the reservation row is still
 * created by /api/reservations at pay-click.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const fullName =
    typeof body?.fullName === "string" ? body.fullName.trim().slice(0, 200) : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim().slice(0, 40) : "";

  const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);
  await upsertGhlContact({
    email,
    firstName,
    lastName: rest.join(" ") || undefined,
    phone: phone || undefined,
    tags: ["canopy-reservation-started"],
    source: "canopy-checkout",
    utm: sanitizeUtm(body?.utm),
  });

  return NextResponse.json({ ok: true });
}
