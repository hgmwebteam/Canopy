import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FunnelHeader from "@/components/funnel/FunnelHeader";
import Footer from "@/components/landing/Footer";
import { PRICING, RESERVATION_AMOUNT_CENTS } from "@/lib/config";
import heroTreehouse from "@/public/images/landing/hero-treehouse.jpg";
import waitlistForestBg from "@/public/images/landing/waitlist-forest-bg.png";

export const metadata: Metadata = {
  title: "Become a VIP — 50% OFF Your Stay — The Canopy",
  robots: { index: false, follow: false },
};

/** First value if a param arrives repeated; undefined stays undefined. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const CTA_CLASS =
  "inline-flex h-11 items-center justify-center rounded-[4px] bg-copper px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110";

/**
 * Step 2 — VIP upgrade offer (exact content from the live LaunchBoom page:
 * $50 VIP Spot locks in 50% OFF the $1,150 Nightly Rate → $575/night + first
 * choice of dates). Propagates email + lead params forward to /checkout.
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

  const vipPrice = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  const nightlyRate = `$${PRICING.nightlyRatePerNight.toLocaleString("en-US")}`;

  // Exact copy from canopy.moodymoonridge.com/reservation — single strings so
  // no JSX expression boundaries can swallow whitespace.
  const offerSubhead = `Upgrade to VIP status for ${vipPrice} today and lock in 50% OFF your stay when we launch!`;
  const offerBody = `By purchasing your ${vipPrice} VIP Spot today — you’ll lock in 50% OFF our Nightly Rate of ${nightlyRate} and only pay $${PRICING.vipPerNight} per night for The Canopy Treehouse. You’ll also be one of the first in line to choose your dates!`;

  const benefits = [
    {
      numeral: "01",
      label: "50% OFF LOCKED IN",
      body: `Lock in 50% OFF our Nightly Rate of $${PRICING.nightlyRatePerNight.toLocaleString(
        "en-US"
      )} — you'll only pay $${PRICING.vipPerNight} per night for The Canopy Treehouse.`,
    },
    {
      numeral: "02",
      label: "FIRST IN LINE",
      body: "You'll be one of the first in line to choose your dates when we launch — before the public waitlist.",
    },
    {
      numeral: "03",
      label: "ONLY SIX TREEHOUSES",
      body: "With only six treehouses on the ridge, VIP spots are strictly limited. Your place is held ahead of everyone else.",
    },
  ];

  const faqs = [
    {
      question: `What do I get for ${vipPrice}?`,
      answer: `VIP status: 50% OFF our Nightly Rate of $${PRICING.nightlyRatePerNight.toLocaleString(
        "en-US"
      )} locked in for your stay ($${PRICING.vipPerNight}/night), plus first choice of dates when booking opens.`,
    },
    {
      question: "Is my VIP Spot refundable?",
      answer: `Yes — your ${vipPrice} VIP Spot is fully refundable any time before launch. One short email and it is returned in full.`,
    },
    {
      question: "When do I book my dates?",
      answer:
        "As launch approaches, VIPs are invited — in order — to choose their dates first, at the locked-in VIP rate, before the public waitlist.",
    },
  ];

  return (
    <>
      <FunnelHeader />

      <main className="flex-1">
        {/* Offer hero — exact LaunchBoom copy + image */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 pt-14 pb-16 sm:pt-16 lg:pt-20 lg:pb-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start">
                <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                  You&rsquo;re on the list — one step remains
                </p>
                <h1 className="mt-2 font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                  Get 50% OFF and be one of the first to book your stay!
                </h1>
                <p className="mt-4 font-sans text-lg font-semibold leading-7 text-navy">
                  {offerSubhead}
                </p>
                <p className="mt-4 font-sans text-base leading-6 text-[#393939]">
                  {offerBody}
                </p>
                <Link href={checkoutHref} className={`${CTA_CLASS} mt-8 w-full sm:w-auto`}>
                  Become a VIP Today — {vipPrice}
                </Link>
                <p className="mt-3 font-sans text-sm leading-6 text-[#393939]/70">
                  Become a VIP today to lock in your 50% OFF discount!
                </p>
              </div>

              <div className="flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={heroTreehouse}
                    alt="The Canopy Treehouse glowing among the trees at dusk"
                    fill
                    priority
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-[4px] bg-copper px-3 py-1.5 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                    {PRICING.discountLabel}
                  </span>
                </div>
                {/* Price lock strip */}
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#e5e1db] bg-[#fcfaf8] px-6 py-5">
                  <div>
                    <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                      Nightly Rate
                    </p>
                    <p className="font-serif text-2xl leading-[29px] text-navy/50 line-through">
                      ${PRICING.nightlyRatePerNight.toLocaleString("en-US")}
                      <span className="font-sans text-sm">/night</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                      Your VIP rate
                    </p>
                    <p className="font-serif text-[32px] leading-9 text-navy">
                      ${PRICING.vipPerNight}
                      <span className="font-sans text-sm text-[#393939]">/night</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What VIP unlocks */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 pb-16 sm:pb-20 lg:pb-24">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
                VIP privileges
              </p>
              <h2 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                What your VIP Spot unlocks
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
                  <p className="font-sans text-base leading-6 text-copper">{benefit.label}</p>
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
                Very few VIP spots.
              </h2>
              <p className="mt-4 font-sans text-base leading-6 text-cream">
                {`Become a VIP today to lock in your 50% OFF discount — $${PRICING.vipPerNight} per night instead of ${nightlyRate} — and be one of the first in line to choose your dates.`}
              </p>
            </div>
            <div className="flex w-full max-w-[463px] shrink-0 flex-col gap-3.5">
              <Link
                href={checkoutHref}
                className="flex h-11 w-full items-center justify-center rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
              >
                Become a VIP Today — {vipPrice}
              </Link>
              <p className="text-center font-sans text-sm leading-6 text-cream/70">
                Fully refundable any time before launch.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ rows */}
        <section className="bg-[#f3efe8]">
          <div className="mx-auto max-w-[1296px] px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-[760px]">
              <h2 className="text-center font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
                Good to know
              </h2>
              <ul className="mt-8">
                {faqs.map((faq) => (
                  <li key={faq.question} className="border-b border-[#e5e1db] py-[22px]">
                    <p className="font-serif text-xl leading-7 text-navy">{faq.question}</p>
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
