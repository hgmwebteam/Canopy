import Image from "next/image";

import heroTreehouse from "@/public/images/landing/hero-treehouse.jpg";

/**
 * Full-bleed hero video — edge to edge, 90vh on desktop. The optimized
 * photo renders instantly underneath (LCP); the video plays over it
 * once loaded.
 */
export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden sm:h-[75vh] lg:h-[90vh]">
      <Image
        src={heroTreehouse}
        alt="Glass-gabled treehouse and lookout cabin glowing at sunrise above the forest canopy, connected by a suspension bridge"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </section>
  );
}
