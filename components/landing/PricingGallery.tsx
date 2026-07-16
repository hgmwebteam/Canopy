import Image from "next/image";

import GallerySlideshow, { type Slide } from "@/components/landing/GallerySlideshow";
import pricingTopoBg from "@/public/images/landing/pricing-topo-bg.svg";
import pricingTreehouse from "@/public/images/landing/pricing-gallery-treehouse.jpg";
import soakingTub from "@/public/images/landing/for-you-nature.jpg";
import sunlitLounge from "@/public/images/landing/for-you-analog.jpg";
import suspensionBridge from "@/public/images/landing/for-you-disconnection.jpg";
import pricingCouple from "@/public/images/landing/pricing-gallery-couple.jpg";

const slides: Slide[] = [
  {
    image: pricingTreehouse,
    alt: "Canopy treehouse glowing among misty forest treetops at golden hour",
    objectPosition: "58% 50%",
  },
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
        <GallerySlideshow slides={slides} />
      </div>
    </section>
  );
}
