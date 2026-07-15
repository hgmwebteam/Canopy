export default function TreehouseInfo() {
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
              $1,150
            </span>
            <span className="font-serif text-[29px] font-bold leading-[35px] text-[#e7ebed]">
              $575
            </span>
            <span className="font-sans text-base font-bold leading-6 text-[#e7ebed]">
              /night
            </span>
          </div>
        </div>
        <div className="mt-9 flex min-h-[92px] items-center rounded-3xl bg-[#3c5260] px-6 py-4">
          <p className="font-sans text-base leading-6 text-[#e7ebed]">
            {
              "Pay just $1 today to claim your VIP spot — and stay for half price when we open. Regular rate: $1,150/night. Your VIP rate: $575/night at The Canopy Treehouse. Plus, you'll get first pick of dates."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
