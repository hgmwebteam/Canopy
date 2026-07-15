import Image from "next/image";

import pricingTopoBg from "@/public/images/landing/pricing-topo-bg.svg";
import pricingTreehouse from "@/public/images/landing/pricing-gallery-treehouse.jpg";
import soakingTub from "@/public/images/landing/for-you-nature.jpg";
import sunlitLounge from "@/public/images/landing/for-you-analog.jpg";
import suspensionBridge from "@/public/images/landing/for-you-disconnection.jpg";
import pricingCouple from "@/public/images/landing/pricing-gallery-couple.jpg";

const gridCells = [
  {
    image: soakingTub,
    alt: "Guest relaxing in a freestanding soaking tub beside a forest-view window at sunset",
  },
  {
    image: sunlitLounge,
    alt: "Guest reading in a sunlit lounge with floor-to-ceiling mountain views",
  },
  {
    image: suspensionBridge,
    alt: "Guest crossing the suspension bridge toward a treehouse in the forest",
  },
  {
    image: pricingCouple,
    alt: "Couple sharing coffee on a couch beside the bed inside the treehouse",
  },
];

export default function PricingGallery() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <Image
        src={pricingTopoBg}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div className="relative mx-auto max-w-[1296px] px-6 py-14 lg:pt-[107px] lg:pb-[71px]">
        <div className="flex flex-col gap-4 overflow-hidden rounded-2xl lg:flex-row">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-[51%]">
            <Image
              src={pricingTreehouse}
              alt="Canopy treehouse glowing among misty forest treetops at golden hour"
              fill
              sizes="(min-width: 1024px) 653px, 100vw"
              className="object-cover"
              style={{ objectPosition: "58% 50%" }}
            />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {gridCells.map((cell) => (
              <div key={cell.alt} className="relative aspect-[306/300]">
                <Image
                  src={cell.image}
                  alt={cell.alt}
                  fill
                  sizes="(min-width: 1024px) 306px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
