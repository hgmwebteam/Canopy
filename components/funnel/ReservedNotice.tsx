"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Reads the arrival context for /reserved:
 * - ?demo=1 — checkout ran in demo mode (no payment collected yet).
 * - ?redirect_status=succeeded — plain Stripe success; nothing extra shown.
 * - ?redirect_status=failed|canceled — gentle nudge back to /checkout,
 *   carrying the funnel params (email, lead) forward.
 * Renders nothing on a plain success.
 */
export default function ReservedNotice() {
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");
  const isDemo = searchParams.get("demo") === "1";
  const paymentIncomplete =
    redirectStatus === "failed" || redirectStatus === "canceled";

  if (paymentIncomplete) {
    const checkoutQuery = new URLSearchParams();
    const email = searchParams.get("email");
    const lead = searchParams.get("lead");
    if (email) checkoutQuery.set("email", email);
    if (lead) checkoutQuery.set("lead", lead);
    const query = checkoutQuery.toString();

    return (
      <div className="mt-4 w-full max-w-[520px] rounded-[4px] border border-cream/25 bg-white/5 px-6 py-5">
        <p className="font-sans text-sm leading-6 text-cream/85">
          One small step remains &mdash; the payment didn&apos;t complete this
          time, and nothing has been charged. Your details are safely held
          whenever you&apos;re ready to finish.
        </p>
        <Link
          href={query ? `/checkout?${query}` : "/checkout"}
          className="mt-3 inline-block font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-cream underline decoration-copper decoration-2 underline-offset-4 transition hover:brightness-110"
        >
          Return to checkout
        </Link>
      </div>
    );
  }

  if (isDemo) {
    return (
      <p className="mt-4 max-w-[480px] font-sans text-sm leading-6 text-cream/70">
        A quiet note: our secure payment step is being finalized. Your details
        are safely recorded, and we&apos;ll email you to complete your deposit
        the moment checkout opens.
      </p>
    );
  }

  return null;
}
