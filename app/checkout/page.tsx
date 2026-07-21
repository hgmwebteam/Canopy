import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";

import FunnelHeader from "@/components/funnel/FunnelHeader";
import Footer from "@/components/landing/Footer";
import CheckoutFlow from "@/components/funnel/CheckoutFlow";
import { PRICING, RESERVATION_AMOUNT_CENTS } from "@/lib/config";
import heroTreehouse from "@/public/images/landing/hero-treehouse.jpg";

export const metadata: Metadata = {
  title: "Complete Your Reservation — The Canopy",
  robots: { index: false, follow: false },
};

/**
 * Step 3 — Checkout. Details form (left) + order summary (right).
 * CheckoutFlow handles both API modes: demo (no Stripe keys → /reserved?demo=1)
 * and live (clientSecret → Stripe Payment Element).
 */
export default function CheckoutPage() {
  const deposit = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <FunnelHeader />
      <main className="flex-1 bg-[#f3efe8]">
        <div className="mx-auto max-w-[1296px] px-6 py-14 lg:py-20">
          <div className="mx-auto flex max-w-[634px] flex-col items-center gap-2 text-center">
            <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
              Secure your spot
            </p>
            <h1 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
              Complete your VIP upgrade
            </h1>
            <p className="p-2 font-sans text-base leading-6 text-[#393939]">
              {`Your ${deposit} VIP Spot locks in 50% OFF — $${PRICING.vipPerNight} per night instead of our $${PRICING.nightlyRatePerNight.toLocaleString("en-US")} Nightly Rate — and puts you first in line to choose your dates.`}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1040px] grid-cols-1 items-start gap-6 lg:mt-14 lg:grid-cols-[1fr_420px]">
            {/* Details / payment */}
            <div className="rounded-2xl border border-[#e5e1db] bg-[#fcfaf8] p-6 sm:p-8">
              <Suspense fallback={null}>
                <CheckoutFlow
                  amountLabel={deposit}
                  amountCents={RESERVATION_AMOUNT_CENTS}
                />
              </Suspense>
            </div>

            {/* Order summary */}
            <aside className="rounded-2xl border border-[#e5e1db] bg-[#fcfaf8] p-6 sm:p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image
                  src={heroTreehouse}
                  alt="A Canopy treehouse glowing among the trees at dusk"
                  fill
                  sizes="(min-width: 1024px) 356px, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-5 font-serif text-2xl leading-[29px] text-navy">
                VIP Spot — 50% OFF locked in
              </h2>
              <p className="mt-1 font-sans text-base leading-6 text-[#393939]">
                The Canopy Treehouse · first in line to choose your dates
              </p>
              <dl className="mt-5 border-t border-[#e5e1db]">
                <div className="flex items-center justify-between border-b border-[#e5e1db] py-4">
                  <dt className="font-sans text-base leading-6 text-navy">
                    Your rate at launch
                  </dt>
                  <dd className="font-sans text-base leading-6 text-navy">
                    <span className="text-navy/50 line-through">
                      ${PRICING.nightlyRatePerNight.toLocaleString("en-US")}
                    </span>{" "}
                    ${PRICING.vipPerNight}/night
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-[#e5e1db] py-4">
                  <dt className="font-sans text-base font-semibold leading-6 text-navy">
                    Due today
                  </dt>
                  <dd className="font-serif text-2xl leading-[29px] text-copper">
                    {deposit}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 font-sans text-sm leading-6 text-[#393939]/70">
                Fully refundable any time before launch.
              </p>
            </aside>
          </div>

          {/* Disclaimer — exact client-provided copy */}
          <div className="mx-auto mt-12 max-w-[1040px] border-t border-[#e5e1db] pt-8 lg:mt-16">
            <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
              Disclaimer
            </p>
            <p className="mt-2 font-sans text-sm leading-6 text-[#393939]/70">
              The Canopy at Moody Moon Ridge is still in development and the
              final designs may change. The images shown are the latest
              prototypes that we have, and we will update you with any changes
              to appearance, cost, or function. The final Kickstarter price is
              subject to change. If we do change it though, we will notify you
              before the campaign launches.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
