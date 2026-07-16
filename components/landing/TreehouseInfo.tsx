import Link from "next/link";

import { PRICING, RESERVATION_AMOUNT_CENTS } from "@/lib/config";

export default function TreehouseInfo() {
  const vipPrice = (RESERVATION_AMOUNT_CENTS / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <section className="bg-[#21384a]">
      <div className="mx-auto max-w-[1296px] px-6 pt-2 pb-14 lg:pb-[84px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-[28px] font-bold leading-9 text-[#e7ebed] sm:text-[35px] sm:leading-[42px]">
              Private Treehouse
            </h2>
            <p className="mt-3 whitespace-pre font-sans text-base font-bold leading-6 text-[#e7ebed]">
              {"2 Guests ・1 bed  ・ 2 baths"}
            </p>
          </div>
          <div className="flex items-baseline gap-4 whitespace-nowrap">
            <span className="font-serif text-[25px] font-bold leading-[29px] text-[#e7ebed] line-through opacity-[0.46]">
              ${PRICING.msrpPerNight.toLocaleString("en-US")}
            </span>
            <span className="font-serif text-[29px] font-bold leading-[35px] text-[#e7ebed]">
              ${PRICING.vipPerNight}
            </span>
            <span className="font-sans text-base font-bold leading-6 text-[#e7ebed]">
              /night
            </span>
          </div>
        </div>
        <div className="mt-9 overflow-hidden rounded-2xl border border-white/10 bg-[#2c4557]">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-[640px]">
              <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper-light">
                VIP offer
              </p>
              <p className="mt-2 font-serif text-xl leading-8 text-[#e7ebed] sm:text-2xl sm:leading-9">
                {`Pay just ${vipPrice} today — stay for half price when we open.`}
              </p>
              <p className="mt-3 font-sans text-base leading-7 text-[#b9c4cc]">
                {`Regular rate $${PRICING.msrpPerNight.toLocaleString("en-US")}/night · your VIP rate $${PRICING.vipPerNight}/night at The Canopy Treehouse. Plus, you'll get first pick of dates.`}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 lg:w-[300px]">
              <Link
                href="/reservation"
                className="inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
              >
                Claim My VIP Spot — {vipPrice}
              </Link>
              <p className="text-center font-sans text-sm leading-5 text-[#b9c4cc]">
                Fully refundable, any time before launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
