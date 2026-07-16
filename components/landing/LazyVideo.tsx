"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

type Props = {
  src: string;
  /** Optimized poster (served through next/image until the video mounts). */
  poster: StaticImageData;
  alt: string;
  sizes: string;
  objectPosition?: string;
};

/**
 * Defers video download until the element approaches the viewport
 * (400px lookahead). Until then renders only the optimized poster image,
 * so below-fold videos cost nothing on initial page load.
 */
export default function LazyVideo({ src, poster, alt, sizes, objectPosition }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      {load && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
    </div>
  );
}
