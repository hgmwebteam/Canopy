import Image from "next/image";

import forYouDisconnection from "@/public/images/landing/for-you-disconnection.jpg";
import forYouCelebrating from "@/public/images/landing/for-you-celebrating.jpg";
import forYouAnalog from "@/public/images/landing/for-you-analog.jpg";
import forYouNature from "@/public/images/landing/for-you-nature.jpg";
import forYouExperiences from "@/public/images/landing/for-you-experiences.jpg";

type Card = {
  image: typeof forYouDisconnection;
  alt: string;
  title: string;
  body: string;
  objectPosition?: string;
};

const rowOne: Card[] = [
  {
    image: forYouDisconnection,
    alt: "Guest crossing a suspension bridge to a treehouse in the morning light",
    title: "You crave real disconnection",
    body: "No notifications, no noise — just treetop silence and the sound of the forest at night.",
    objectPosition: "50% 45%",
  },
  {
    image: forYouCelebrating,
    alt: "Couple sharing coffee together on a couch beside the bed",
    title: "You're celebrating something",
    body: 'An anniversary, a milestone, a "we made it" moment that deserves more than a hotel room.',
  },
  {
    image: forYouAnalog,
    alt: "Guest reading in a sunlit lounge with floor-to-ceiling mountain views",
    title: "You love analog pleasures",
    body: "Vinyl records, a curated library, morning coffee with a view — no screens required.",
    objectPosition: "50% 40%",
  },
];

const rowTwo: Card[] = [
  {
    image: forYouNature,
    alt: "Guest reading in a soaking tub beside a forest-view window at sunset",
    title: "You want nature, not roughing it",
    body: "Surrounded by Tennessee wilderness, but with hydrogen-infused soaking tubs and curated amenities waiting inside.",
  },
  {
    image: forYouExperiences,
    alt: "Aerial view of a treehouse cabin glowing among the trees",
    title: "You seek experiences, not things",
    body: 'Your travel stories start with "we found this place in the woods…" — not star ratings or loyalty points.',
    objectPosition: "50% 65%",
  },
];

function GridCard({
  card,
  aspect,
  sizes,
}: {
  card: Card;
  aspect: string;
  sizes: string;
}) {
  return (
    <div className="flex flex-col">
      <div className={`relative w-full overflow-hidden rounded-xl ${aspect}`}>
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={
            card.objectPosition
              ? { objectPosition: card.objectPosition }
              : undefined
          }
        />
      </div>
      <div className="py-4">
        <p className="font-sans text-xl italic leading-[30px] text-[#0d1d10]">
          {card.title}
        </p>
        <p className="font-sans text-base leading-6 text-[#393939]">
          {card.body}
        </p>
      </div>
    </div>
  );
}

export default function ForYouGrid() {
  return (
    <section className="bg-[#eee7dd]">
      <div className="mx-auto max-w-[1296px] px-6 pt-10 pb-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {rowOne.map((card) => (
            <GridCard
              key={card.title}
              card={card}
              aspect="aspect-[3/4]"
              sizes="(min-width: 1024px) 385px, (min-width: 768px) 33vw, 100vw"
            />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1296px] px-6 py-4 pb-10">
        <div className="grid grid-cols-1 gap-x-[26px] gap-y-10 md:grid-cols-2">
          {rowTwo.map((card) => (
            <GridCard
              key={card.title}
              card={card}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 603px, (min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
