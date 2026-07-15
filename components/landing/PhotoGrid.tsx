import Image from "next/image";

import bathroomTub from "@/public/images/landing/photo-grid-bathroom.jpg";
import aframeForest from "@/public/images/landing/photo-grid-aframe.jpg";
import sunsetLounge from "@/public/images/landing/for-you-analog.jpg";
import coupleTub from "@/public/images/landing/photo-grid-couple-tub.jpg";
import coupleCouch from "@/public/images/landing/for-you-celebrating.jpg";
import treehouseDoor from "@/public/images/landing/photo-grid-treehouse-door.jpg";
import nightDeck from "@/public/images/landing/photo-grid-night-deck.jpg";
import saunaGlow from "@/public/images/landing/photo-grid-sauna.jpg";
import bridgeWalk from "@/public/images/landing/for-you-disconnection.jpg";

type Photo = {
  image: typeof bathroomTub;
  alt: string;
  /** Tailwind aspect-ratio class derived from the Figma crop. */
  aspect: string;
  objectPosition?: string;
};

const columns: Photo[][] = [
  [
    {
      image: bathroomTub,
      alt: "Bright treehouse bathroom with a freestanding tub beneath a forest-view window",
      aspect: "aspect-[16/9]",
    },
    {
      image: aframeForest,
      alt: "A-frame treehouse with a glass gable wall glowing in a misty pine forest",
      aspect: "aspect-[3/4]",
      objectPosition: "50% 85%",
    },
    {
      image: sunsetLounge,
      alt: "Guest reading in a sunlit lounge with floor-to-ceiling mountain views",
      aspect: "aspect-square",
      objectPosition: "50% 35%",
    },
  ],
  [
    {
      image: coupleTub,
      alt: "Guest reading in a bubble bath beneath a sunset forest window",
      aspect: "aspect-[3/4]",
    },
    {
      image: coupleCouch,
      alt: "Couple sharing coffee together on a couch beside the bed",
      aspect: "aspect-square",
    },
    {
      image: treehouseDoor,
      alt: "Suspension bridge leading to a warmly lit treehouse door in the forest canopy",
      aspect: "aspect-[16/9]",
      objectPosition: "50% 26%",
    },
  ],
  [
    {
      image: nightDeck,
      alt: "Guest stepping onto a lantern-lit treehouse deck at night",
      aspect: "aspect-square",
    },
    {
      image: saunaGlow,
      alt: "Guest unwinding in a warm cedar sauna on a treetop deck",
      aspect: "aspect-[4/3]",
    },
    {
      image: bridgeWalk,
      alt: "Guest crossing a suspension bridge to a treehouse in the morning light",
      aspect: "aspect-[411/471]",
    },
  ],
];

export default function PhotoGrid() {
  return (
    <section className="bg-[#f3efe8]">
      <div className="mx-auto max-w-[1296px] px-6 py-12 md:pt-16 md:pb-[141px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.map((photo) => (
                <div
                  key={photo.alt}
                  className={`relative w-full overflow-hidden rounded-2xl ${photo.aspect}`}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    style={
                      photo.objectPosition
                        ? { objectPosition: photo.objectPosition }
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
