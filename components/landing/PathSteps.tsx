type Step = {
  number: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Join the waitlist",
    body: "Enter your email to reserve your spot on the VIP list. You'll be the first to hear when booking opens.",
  },
  {
    number: "2",
    title: "Get early access",
    body: "VIP members receive exclusive launch-day pricing and first pick of dates before the public.",
  },
  {
    number: "3",
    title: "Book your retreat",
    body: "Choose your treehouse, customize your arrival experience, and begin your reconnection.",
  },
];

export default function PathSteps() {
  return (
    <section className="bg-[#f1ece4]">
      <div className="mx-auto max-w-[1296px] px-6 pt-12 pb-16 lg:pt-[57px] lg:pb-[86px]">
        <div className="mx-auto flex max-w-[634px] flex-col items-center gap-2 text-center">
          <p className="font-sans text-xs leading-6 tracking-[3.6px] text-copper">
            HOW IT WORKS
          </p>
          <h2 className="font-serif text-[28px] leading-[36px] text-navy sm:text-[35px] sm:leading-[42px]">
            Your path to the ridge
          </h2>
          <p className="p-2 font-sans text-base leading-6 text-navy">
            {"We're launching soon, Here's how to be first in line."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-[26px] md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center justify-center gap-[18px] rounded-2xl bg-[#fcfaf8] px-8 py-14 text-center shadow-[0px_4px_8px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] md:min-h-[404px] md:px-[34px]"
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
  );
}
