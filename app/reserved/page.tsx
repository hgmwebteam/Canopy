import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import ReservedNotice from "@/components/funnel/ReservedNotice";
import { RESERVATION_AMOUNT_CENTS } from "@/lib/config";
import finalCtaForestBg from "@/public/images/landing/final-cta-forest-bg.png";

export const metadata: Metadata = {
  title: "Reservation Confirmed — The Canopy",
  description:
    "Your place in the Canopy Circle is reserved. Priority access to opening dates at exclusive rates.",
  robots: { index: false, follow: false },
};

type Step = {
  number: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Your confirmation email",
    body: "A note confirming your reservation is on its way to your inbox, with everything worth knowing between now and opening.",
  },
  {
    number: "2",
    title: "Your private invitation",
    body: "When the calendar is ready, you’ll receive your invitation to the priority booking window — held for the Canopy Circle alone.",
  },
  {
    number: "3",
    title: "First choice of dates",
    body: "Choose your treehouse and your dates before the public, at the exclusive rates reserved for our first guests.",
  },
];

/**
 * Step 4 — Confirmation page.
 * Celebration hero + what-happens-next steps + refundability reassurance.
 * Arrival context (?demo=1 or Stripe redirect_status) is read client-side
 * by <ReservedNotice /> inside Suspense; the rest renders on the server.
 */
export default function ReservedPage() {
  const deposit = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <main className="flex flex-1 flex-col">
      {/* 1 — Dark celebration hero */}
      <section className="relative overflow-hidden bg-navy-deep">
        <Image
          src={finalCtaForestBg}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <div className="relative mx-auto max-w-[1296px] px-6 py-24 lg:py-32">
          <div className="mx-auto flex max-w-[634px] flex-col items-center gap-4 text-center">
            <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
              Reservation confirmed
            </p>
            <h1 className="font-serif text-[28px] leading-9 text-cream sm:text-[35px] sm:leading-[42px]">
              Your spot on the ridge is reserved.
            </h1>
            <p className="font-sans text-base leading-6 text-cream">
              Welcome to the Canopy Circle &mdash; the small company of guests
              who will be first among the trees. Only six treehouses stand on
              the ridge, and your name now waits near the front of the line.
              Your reconnection begins here.
            </p>
            <Suspense fallback={null}>
              <ReservedNotice />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 2 — What happens next */}
      <section className="bg-[#f1ece4]">
        <div className="mx-auto max-w-[1296px] px-6 pt-12 pb-16 lg:pt-[57px] lg:pb-[86px]">
          <div className="mx-auto flex max-w-[634px] flex-col items-center gap-2 text-center">
            <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
              What happens next
            </p>
            <h2 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
              Three quiet steps to the trees
            </h2>
            <p className="p-2 font-sans text-base leading-6 text-navy">
              Nothing more is needed from you today. Here is how the path
              unfolds.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-[26px] md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center justify-center gap-[18px] rounded-2xl bg-[#fcfaf8] px-8 py-14 text-center shadow-[0px_4px_8px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] md:px-[34px]"
              >
                <div className="flex size-[58px] items-center justify-center rounded-full border-[1.4px] border-[#dccfb8]">
                  <span className="font-serif text-[32px] leading-[29px] text-copper">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-serif text-2xl leading-[29px] text-navy">
                  {step.title}
                </h3>
                <p className="max-w-[343px] font-sans text-base leading-6 text-navy">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Reassurance band */}
      <section className="border-t border-[#e5e1db] bg-[#f3efe8]">
        <div className="mx-auto max-w-[1296px] px-6 py-16 lg:py-20">
          <div className="mx-auto flex max-w-[634px] flex-col items-center gap-6 text-center">
            <p className="font-sans text-base leading-6 text-[#393939]">
              Your {deposit} deposit simply holds your place in line for first
              choice of opening dates at exclusive rates &mdash; it is fully
              refundable at any time, for any reason, and applied in full
              toward your stay when booking opens.
            </p>
            <Link
              href="/"
              className="font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-copper underline-offset-4 transition hover:underline hover:brightness-110"
            >
              Back to The Canopy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
