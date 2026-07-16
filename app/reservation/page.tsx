import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FunnelHeader from "@/components/funnel/FunnelHeader";
import Footer from "@/components/landing/Footer";
import { RESERVATION_AMOUNT_CENTS } from "@/lib/config";
import waitlistForestBg from "@/public/images/landing/waitlist-forest-bg.png";

export const metadata: Metadata = {
  title: "Reserve Your Priority Spot — The Canopy",
  robots: { index: false, follow: false },
};

/** First value if a param arrives repeated; undefined stays undefined. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const CTA_CLASS =
  "inline-flex h-11 items-center justify-center rounded-[4px] bg-copper px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110";

/**
 * Step 2 — Reservation offer page (LaunchBoom-style upgrade pitch).
 * Shown immediately after a waitlist signup; invites the lead to place a
 * fully refundable deposit for priority access — a place in line, not a
 * booking of dates. Propagates email + lead params forward to /checkout.
 */
export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const email = first(params.email);
  const lead = first(params.lead);

  const query = new URLSearchParams();
  if (email) query.set("email", email);
  if (lead) query.set("lead", lead);
  const queryString = query.toString();
  const checkoutHref = queryString ? `/checkout?${queryString}` : "/checkout";

  const deposit = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const benefits = [
    {
      numeral: "01",
      label: "FIRST CHOICE OF DATES",
      body: "When our opening calendar is released, founding guests choose their dates before anyone on the public waitlist. The calendar is yours first.",
    },
    {
      numeral: "02",
      label: "FOUNDING-GUEST RATES",
      body: "Opening rates reserved exclusively for founding guests — never offered publicly, and honored when you book your stay.",
    },
    {
      numeral: "03",
      label: "PRIORITY OVER THE WAITLIST",
      body: "Your place in line is held ahead of the public waitlist. With only six treehouses, order is everything.",
    },
  ];

  const faqs = [
    {
      question: "Is it refundable?",
      answer: `Completely. Your ${deposit} deposit is 100% refundable at any time, for any reason. One short email and it is returned in full.`,
    },
    {
      question: "Does this book my dates?",
      answer:
        "Not yet — by design. Your deposit holds your place in line for priority access; it is not a booking of specific dates. Nothing is decided today except your position.",
    },
    {
      question: "When do I choose dates?",
      answer:
        "Before the public waitlist. As opening approaches, founding guests are invited — in order — to select their dates first, at founding-guest rates.",
    },
  ];

  return (
    <>
      <FunnelHeader />

      <main className="flex-1">
        {/* Offer hero */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 pt-16 pb-14 sm:pt-20 lg:pt-24 lg:pb-16">
            <div className="mx-auto flex max-w-[634px] flex-col items-center text-center">
              <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                You&rsquo;re on the list
              </p>
              <h1 className="mt-2 font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                Move to the front of the line.
                <br />
                Become a founding guest.
              </h1>
              <p className="mt-4 font-sans text-base leading-6 text-[#393939]">
                Your reconnection begins here. A fully refundable {deposit}{" "}
                deposit places you ahead of the public waitlist — first choice
                of opening dates, at rates reserved for our founding guests.
              </p>
              <Link
                href={checkoutHref}
                className={`${CTA_CLASS} mt-8 w-full sm:w-auto`}
              >
                Reserve My Priority Spot — {deposit}
              </Link>
              <p className="mt-3 font-sans text-sm leading-6 text-[#393939]/70">
                100% refundable, any time.
              </p>
            </div>
          </div>
        </section>

        {/* What your deposit unlocks */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 pb-16 sm:pb-20 lg:pb-24">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                Founding-guest privileges
              </p>
              <h2 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                What your deposit unlocks
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-14">
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#e5e1db] bg-[#fcfaf8] px-[30px] py-10 text-center"
                >
                  <p className="font-serif text-[35px] leading-[42px] text-navy">
                    {benefit.numeral}
                  </p>
                  <p className="font-sans text-base leading-6 text-copper">
                    {benefit.label}
                  </p>
                  <p className="mt-1 font-sans text-base leading-6 text-[#393939]">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scarcity band */}
        <section className="relative overflow-hidden bg-navy-deep">
          <Image
            src={waitlistForestBg}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
          <div className="relative mx-auto flex max-w-[1296px] flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
            <div className="max-w-[634px]">
              <h2 className="font-serif text-[28px] leading-[36px] text-cream sm:text-[35px] sm:leading-[42px]">
                Only six treehouses.
                <br />
                A short line to the front.
              </h2>
              <p className="mt-4 font-sans text-base leading-6 text-cream">
                When we open, six treehouses will hold the quiet for a handful
                of guests at a time. Founding guests step ahead of the waitlist
                and choose first — a place in line held by a deposit you can
                reclaim at any moment.
              </p>
            </div>
            <div className="flex w-full max-w-[463px] shrink-0 flex-col gap-3.5">
              <Link
                href={checkoutHref}
                className="flex h-11 w-full items-center justify-center rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
              >
                Reserve My Priority Spot — {deposit}
              </Link>
              <p className="text-center font-sans text-sm leading-6 text-cream/80">
                100% refundable, any time.
              </p>
            </div>
          </div>
        </section>

        {/* Reassurance rows */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[760px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                  Before you decide
                </p>
                <h2 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                  The quiet details
                </h2>
              </div>
              <ul className="mt-10 border-t border-[#e5e1db]">
                {faqs.map((faq) => (
                  <li
                    key={faq.question}
                    className="border-b border-[#e5e1db] py-[22px]"
                  >
                    <h3 className="font-serif text-lg leading-7 text-navy">
                      {faq.question}
                    </h3>
                    <p className="mt-2 font-sans text-base leading-6 text-[#393939]">
                      {faq.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
