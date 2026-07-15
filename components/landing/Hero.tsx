import Image from "next/image";

import heroTreehouse from "@/public/images/landing/hero-treehouse.jpg";

/**
 * Full-bleed hero image card (Figma node 16418:983).
 * A rounded photo card centered on the warm cream page background.
 */
export default function Hero() {
  return (
    <section className="bg-[#f3efe8]">
      <div className="mx-auto max-w-[1273px] px-6 pt-8 pb-6 lg:pt-[52px] lg:pb-[34px]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[1225/775]">
          <Image
            src={heroTreehouse}
            alt="Glass-gabled treehouse and lookout cabin glowing at sunrise above the forest canopy, connected by a suspension bridge"
            fill
            priority
            sizes="(min-width: 1280px) 1225px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
