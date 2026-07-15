import WaitlistForm from "@/components/WaitlistForm";
import { BRAND } from "@/lib/config";

/**
 * Step 1 — Landing page.
 * Foundation skeleton: branded hero + working waitlist capture.
 * Full Figma build (node 16418:982, ~14 sections) lands in Milestone 2.
 */
export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-24 text-center text-cream">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-copper">
          Moody Moon Ridge
        </p>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          {BRAND.name}
        </h1>
        <p className="mt-4 max-w-xl font-serif text-xl italic text-cream/90">
          {BRAND.tagline}
        </p>
        <p className="mt-10 text-lg font-semibold">{BRAND.waitlistHook}</p>
        <WaitlistForm source="hero" className="mt-6 w-full max-w-md" />
        <p className="mt-4 text-sm text-cream/70">
          Be first in line when the six treehouses open for booking.
        </p>
      </section>
    </main>
  );
}
