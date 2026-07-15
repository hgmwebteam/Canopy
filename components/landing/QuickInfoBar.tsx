type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "6", label: "curated chances to unplug" },
  { value: "2", label: "travelers" },
  { value: "1", label: "trip where you feel genuinely cared for" },
];

export default function QuickInfoBar() {
  return (
    <section className="bg-[#2a465a]">
      <div className="mx-auto max-w-[1296px] px-6 py-6 sm:py-9">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-4 py-4 text-center sm:px-8 sm:py-0 ${
                index < stats.length - 1
                  ? "border-b border-[#4a6273] sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="font-serif text-[28px] leading-[1.8] tracking-[-0.16px] text-white sm:text-[32px]">
                {stat.value}
              </p>
              <p className="font-sans text-sm uppercase leading-[1.8] tracking-[1.12px] text-[#aab5bd]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
