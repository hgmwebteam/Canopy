"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

export type Slide = {
  image: StaticImageData;
  alt: string;
  objectPosition?: string;
};

/**
 * Square (1:1) five-image slideshow: arrows, dots, swipe, auto-advance
 * (pauses after any manual interaction and on hover).
 */
export default function GallerySlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const interacted = useRef(false);

  useEffect(() => {
    if (paused || interacted.current) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  function go(next: number) {
    interacted.current = true;
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[640px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Treehouse photo gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.alt} className="relative aspect-square w-full shrink-0">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(min-width: 768px) 640px, 100vw"
                className="object-cover"
                priority={i === 0}
                style={
                  slide.objectPosition
                    ? { objectPosition: slide.objectPosition }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-copper"
      >
        &#8249;
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-copper"
      >
        &#8250;
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`size-2.5 rounded-full transition ${
              i === index ? "bg-cream" : "bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
