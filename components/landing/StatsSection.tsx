type DriveTime = {
  destination: string;
  time: string;
};

type Stat = {
  value: string;
  label: string;
};

const driveTimes: DriveTime[] = [
  { destination: "Great Smoky Mountains National Park", time: "20 min" },
  { destination: "Gatlinburg", time: "45 min" },
  { destination: "Dollywood", time: "45 min" },
  { destination: "Knoxville", time: "50 min" },
  { destination: "Asheville, NC", time: "1 hour" },
];

const stats: Stat[] = [
  { value: "900", label: "MILES OF HIKING" },
  { value: "15", label: "GRAND WATERFALLS" },
  { value: "600", label: "MILES OF BIKE PATHS" },
  { value: "12M+", label: "ANNUAL PARK VISITORS" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[#d6c7af] bg-[#f1ece4]">
      <div className="mx-auto max-w-[1296px] px-6 pt-14 pb-20 lg:pt-[58px] lg:pb-[108px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-sans text-xs leading-6 tracking-[3.6px] text-copper">
            CENTRALLY LOCATED
          </p>
          <h2 className="font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
            Close enough to get here. Far enough to exhale.
          </h2>
          <p className="max-w-[657px] p-2 font-sans text-base leading-6 text-navy">
            Nestled on English Mountain in Smoky Mountains &mdash; deep in the
            Smokies but never too far from the places that matter.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-12 lg:mt-[108px] lg:flex-row lg:justify-center lg:gap-[88px]">
          <ul className="w-full lg:max-w-[514px] lg:flex-1">
            {driveTimes.map((row) => (
              <li
                key={row.destination}
                className="flex items-center justify-between gap-4 border-b border-[#e5e1db] py-[22px]"
              >
                <span className="font-sans text-base leading-6 text-navy">
                  {row.destination}
                </span>
                <span className="shrink-0 font-sans text-base leading-6 text-copper">
                  {row.time}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid w-full grid-cols-1 gap-y-[22px] overflow-hidden rounded-2xl sm:grid-cols-2 sm:gap-x-[23px] lg:max-w-[641px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-[169px] flex-col items-center justify-center gap-2 bg-[#fcfaf8] px-[30px]"
              >
                <p className="font-serif text-[35px] leading-[42px] text-navy">
                  {stat.value}
                </p>
                <p className="text-center font-sans text-base leading-6 text-copper">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
