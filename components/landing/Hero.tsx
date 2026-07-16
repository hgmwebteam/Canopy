import heroTreehouse from "@/public/images/landing/hero-treehouse.jpg";

/**
 * Full-bleed hero video — edge to edge, 90vh on desktop, with the
 * original hero photo as poster for instant first paint.
 */
export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden sm:h-[75vh] lg:h-[90vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        poster={heroTreehouse.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Glass-gabled treehouse and lookout cabin glowing at sunrise above the forest canopy, connected by a suspension bridge"
      />
    </section>
  );
}
