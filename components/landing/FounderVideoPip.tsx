"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import founderPortrait from "@/public/images/landing/founder-sue-hough.png";

const PREVIEW_SRC = "/videos/founder-preview.mp4";
const FULL_SRC = "/videos/founder-full.mp4";

/**
 * Picture-in-picture founder video: when the "Meet the Founder" section
 * ([data-founder-section]) scrolls into view, a small floating card appears
 * bottom-right playing a short muted preview. Clicking it opens the full
 * video with sound; the card can be dismissed for the rest of the visit.
 */
export default function FounderVideoPip() {
  const [inSection, setInSection] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = document.querySelector("[data-founder-section]");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => setInSection(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const showPip = inSection && !dismissed && !open;

  return (
    <>
      {/* Floating PiP card */}
      <div
        className={`fixed right-4 z-40 w-40 transition-all duration-300 sm:w-52 ${
          showPip
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } bottom-20 lg:bottom-6`}
      >
        <div className="relative overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-black/20">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Watch the founder's video"
            className="block w-full"
          >
            <div className="relative aspect-[3/4] w-full bg-navy-deep">
              <Image
                src={founderPortrait}
                alt=""
                fill
                sizes="208px"
                className="object-cover"
              />
              {showPip && (
                <video
                  ref={previewRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={PREVIEW_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                ▶ Meet Sue — watch
              </span>
            </div>
          </button>
          <button
            type="button"
            aria-label="Dismiss video"
            onClick={() => setDismissed(true)}
            className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/50 text-lg leading-none text-white transition hover:bg-black/75"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Full video modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Founder video"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end pb-2">
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-3xl leading-none text-white transition hover:bg-white/10"
              >
                &times;
              </button>
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              className="max-h-[80vh] w-full rounded-xl"
              src={FULL_SRC}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}
