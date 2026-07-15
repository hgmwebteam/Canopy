import Link from "next/link";
import { BRAND, RESERVATION_AMOUNT_CENTS } from "@/lib/config";

/**
 * Step 2 — Reservation (upgrade) page.
 * Foundation skeleton: offer framing + CTA to checkout.
 * Full LaunchBoom-style offer design lands in Milestone 3.
 */
export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; lead?: string }>;
}) {
  const params = await searchParams;
  const checkoutQuery = new URLSearchParams();
  if (params.email) checkoutQuery.set("email", params.email);
  if (params.lead) checkoutQuery.set("lead", params.lead);
  const deposit = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-cream px-6 py-24 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-copper">
        You&apos;re on the list
      </p>
      <h1 className="max-w-2xl font-serif text-3xl text-navy sm:text-4xl">
        Move to the front of the waitlist
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/80">
        {BRAND.waitlistHook} Reserve priority booking access with a fully
        refundable {deposit} deposit and choose your dates before the public.
      </p>
      <Link
        href={`/checkout?${checkoutQuery.toString()}`}
        className="mt-10 rounded-md bg-copper px-8 py-4 font-semibold text-white transition hover:brightness-110"
      >
        Reserve My Priority Spot — {deposit}
      </Link>
      <p className="mt-4 text-sm text-ink/60">
        100% refundable, any time before opening.
      </p>
    </main>
  );
}
