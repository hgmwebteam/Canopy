"use client";

import { useEffect, useState } from "react";
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
  /** Tailwind aspect-ratio class for the grid crop. */
  aspect: string;
  objectPosition?: string;
};

const photos: Photo[] = [
  { image: bathroomTub, alt: "Bright treehouse bathroom with a freestanding tub beneath a forest-view window", aspect: "aspect-[16/9]" },
  { image: coupleTub, alt: "Guest reading in a bubble bath beneath a sunset forest window", aspect: "aspect-[3/4]" },
  { image: aframeForest, alt: "A-frame treehouse with a glass gable wall glowing in a misty pine forest", aspect: "aspect-[3/4]", objectPosition: "50% 85%" },
  { image: coupleCouch, alt: "Couple sharing coffee together on a couch beside the bed", aspect: "aspect-square" },
  { image: sunsetLounge, alt: "Guest reading in a sunlit lounge with floor-to-ceiling mountain views", aspect: "aspect-square", objectPosition: "50% 35%" },
  { image: treehouseDoor, alt: "Suspension bridge leading to a warmly lit treehouse door in the forest canopy", aspect: "aspect-[16/9]", objectPosition: "50% 26%" },
  { image: nightDeck, alt: "Guest stepping onto a lantern-lit treehouse deck at night", aspect: "aspect-square" },
  { image: saunaGlow, alt: "Guest unwinding in a warm cedar sauna on a treetop deck", aspect: "aspect-[4/3]" },
  { image: bridgeWalk, alt: "Guest crossing a suspension bridge to a treehouse in the morning light", aspect: "aspect-[411/471]" },
];

export default function PhotoGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section className="bg-[#f3efe8]">
      <div className="mx-auto max-w-[1296px] px-6 py-12 md:pt-16 md:pb-[141px]">
        <div className="columns-2 gap-3 md:columns-3 md:gap-6 [&>button]:mb-3 md:[&>button]:mb-6">
          {photos.map((photo, i) => (
            <button
              key={photo.alt}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className={`relative block w-full break-inside-avoid overflow-hidden rounded-xl transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-copper md:rounded-2xl ${photo.aspect}`}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 50vw"
                className="object-cover"
                style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between p-4 text-cream">
            <span className="font-sans text-sm tabular-nums">
              {lightbox + 1} / {photos.length}
            </span>
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setLightbox(null)}
              className="flex size-10 items-center justify-center rounded-full text-3xl leading-none transition hover:bg-white/10"
            >
              &times;
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[lightbox].image}
              alt={photos[lightbox].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
              className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-3xl leading-none text-white transition hover:bg-copper"
            >
              &#8249;
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setLightbox((lightbox + 1) % photos.length)}
              className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-3xl leading-none text-white transition hover:bg-copper"
            >
              &#8250;
            </button>
          </div>
          <p className="p-4 text-center font-sans text-sm text-cream/80">
            {photos[lightbox].alt}
          </p>
        </div>
      )}
    </section>
  );
}
