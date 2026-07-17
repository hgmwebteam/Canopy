import Image from "next/image";

import careBeforeYouArrive from "@/public/images/landing/care-icon-before-you-arrive.png";
import carePhoneFreeWelcome from "@/public/images/landing/care-icon-phone-free-welcome.png";
import careCanopyExperience from "@/public/images/landing/care-icon-canopy-experience.png";
import careForestBand from "@/public/images/landing/care-forest-band.jpg";

type Column = {
  icon: typeof careBeforeYouArrive;
  iconAlt: string;
  label: string;
  body: string;
};

const columns: Column[] = [
  {
    icon: careBeforeYouArrive,
    iconAlt: "Copper line icon of a book with a ribbon bookmark",
    label: "BEFORE YOU ARRIVE",
    body: "Every stay begins with intention. Choose your preferred coffee or tea, and we'll have it ready and waiting. Ten days before check-in, simply tell us which book you'd like to read - it will be on your nightstand when you walk through the door.",
  },
  {
    icon: carePhoneFreeWelcome,
    iconAlt: "Copper line icon of a phone crossed out",
    label: "A PHONE-FREE WELCOME",
    body: "We gently encourage you to set your phone aside. A record player fills the treehouse with music. A digital camera is yours to stay moments. The weather forecast arrives on paper - and if rain is on the way, we'll tuck in everything you need to enjoy it.",
  },
  {
    icon: careCanopyExperience,
    iconAlt: "Copper line icon of sparkling stars",
    label: "THE CANOPY EXPERIENCE",
    body: "Start your mornings or wind down your evenings with an outdoor shower and sauna, designed to be a grounding ritual. Sink into our deep soaking tub whenever you need to slow down completely. Refresh from the inside with hydrogen-infused water - shown to support antioxidant activity, reduce inflammation, and promote mental clarity and energy. And always, in every direction: endless forest and mountain views.",
  },
];

export default function CareSection() {
  return (
    <section className="bg-[#21384a]">
      <div className="mx-auto max-w-[1296px] px-6 pt-10 pb-4 sm:pt-12">
        <h2 className="pb-8 text-center font-serif font-bold text-[28px] leading-9 text-[#e7ebed] sm:pb-10 sm:text-[35px] sm:leading-[42px]">
          Canopy is about being truly cared for.
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.label} className="flex flex-col">
              <Image
                src={column.icon}
                alt={column.iconAlt}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0"
              />
              <div className="flex flex-col gap-6 py-4 text-base leading-6 text-[#e7ebed]">
                <p className="font-sans font-bold">{column.label}</p>
                <p className="font-sans">{column.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Image
        src={careForestBand}
        alt="Illustrated dusk treeline with a cabin tucked among forested ridges"
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}
