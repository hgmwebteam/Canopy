import Stripe from "stripe";

/** Returns a Stripe client, or null while STRIPE_SECRET_KEY is not yet configured. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}
