"use client";

import { useEffect, useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import { BRAND } from "@/lib/config";

/**
 * Mobile-only sticky CTA: appears after scrolling past the hero; opens a
 * waitlist modal (heading + description + email form).
 */
export default function StickyWaitlistCta() {
  const [visible, setVisible] = useState(false);
  const [bandInView, setBandInView] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide while any waitlist band (which has its own form) or the footer is on screen.
  useEffect(() => {
    const bands = document.querySelectorAll("[data-waitlist-band], footer");
    if (!bands.length) return;
    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setBandInView(seen.size > 0);
      },
      { threshold: 0.15 }
    );
    bands.forEach((b) => observer.observe(b));
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

  return (
    <div className="lg:hidden">
      {/* Sticky bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 ${
          visible && !open && !bandInView ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-12 w-full rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition hover:brightness-110"
        >
          Join the Waitlist
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Join the waitlist"
            className="w-full max-w-md rounded-2xl bg-cream p-6 pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-[26px] leading-8 text-navy">
                {BRAND.waitlistHook.split(". ")[0]}.
                <br />
                {BRAND.waitlistHook.split(". ")[1]}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-navy/60 transition hover:bg-navy/10 hover:text-navy"
              >
                &times;
              </button>
            </div>
            <p className="mt-3 font-sans text-base leading-6 text-[#393939]">
              Your reconnection begins here. Join us in the Treetops in the
              Canopy Circle for first access to opening dates at exclusive
              rates.
            </p>
            <WaitlistForm
              source="sticky-cta"
              variant="stacked"
              buttonLabel="Reserve My Spot"
              className="mt-5"
            />
          </div>
        </div>
      )}
    </div>
  );
}
