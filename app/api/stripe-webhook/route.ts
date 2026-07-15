import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer, hasServiceRole } from "@/lib/supabase";
import { upsertGhlContact } from "@/lib/ghl";

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 501 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    if (!hasServiceRole()) {
      // Updates require the service-role key; insert-only publishable key can't flip status.
      console.error("[stripe-webhook] SUPABASE_SERVICE_ROLE_KEY missing — cannot mark paid");
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from("reservations")
      .update({ status: "paid" })
      .eq("stripe_payment_intent_id", intent.id);
    if (error) {
      console.error("[stripe-webhook] failed to mark paid:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
    if (intent.receipt_email) {
      await upsertGhlContact({
        email: intent.receipt_email,
        tags: ["canopy-reserved"],
        source: "canopy-stripe",
      });
    }
  }

  return NextResponse.json({ received: true });
}
