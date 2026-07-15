import Image from "next/image";

import mapForestBg from "@/public/images/landing/map-forest-bg.png";
import mapIllustration from "@/public/images/landing/map-illustration.png";
import mapCanopyWordmark from "@/public/images/landing/map-canopy-wordmark.svg";
import mapEmblem from "@/public/images/landing/map-emblem.svg";
import mapMoodyMoon from "@/public/images/landing/map-moody-moon.svg";
import mapRidge from "@/public/images/landing/map-ridge.svg";

export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <Image
        src={mapForestBg}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div className="relative mx-auto max-w-[1296px] px-6 py-10 lg:py-14">
        <div className="relative mx-auto w-full max-w-[925px]">
          {/* Brand lockup — overlays the map's top right on desktop, sits above it on mobile */}
          <div className="mx-auto mb-10 flex w-fit flex-col items-center gap-[11px] lg:absolute lg:top-[15%] lg:right-[10.5%] lg:z-10 lg:mx-0 lg:mb-0">
            <Image
              src={mapCanopyWordmark}
              alt="The Canopy"
              width={203}
              height={32}
            />
            <div className="flex flex-col items-center gap-[6px]">
              <Image src={mapEmblem} alt="" width={26} height={26} />
              <div className="flex items-center gap-[5.5px]">
                <Image src={mapMoodyMoon} alt="Moody Moon" width={69} height={6} />
                <Image src={mapRidge} alt="Ridge" width={28} height={6} />
              </div>
            </div>
          </div>

          <Image
            src={mapIllustration}
            alt="Illustrated map of The Canopy, nestled in the heart of the Tennessee Smoky Mountains, marking drive times to Knoxville (50 minutes), McGhee Tyson Airport (1 hour), Morristown Regional Airport (30 min), Sevierville (45 min), Gatlinburg (45 minutes), Smoky Mountain National Park (20 min), and Asheville, NC (1 hour) — centrally located near public and private airports, outdoor recreation, and entertainment"
            sizes="(min-width: 1024px) 925px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
