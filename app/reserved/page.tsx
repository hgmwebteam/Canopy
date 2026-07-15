import Link from "next/link";
import { BRAND } from "@/lib/config";

/**
 * Step 4 — Confirmation page.
 * Foundation skeleton: confirmation message + next steps.
 */
export default function ReservedPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-navy px-6 py-24 text-center text-cream">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-copper">
        Reservation confirmed
      </p>
      <h1 className="max-w-2xl font-serif text-3xl sm:text-4xl">
        Your spot on the ridge is reserved.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-cream/85">
        Welcome to {BRAND.name}. Watch your inbox — you&apos;ll get priority
        access to choose your treehouse and dates before anyone else.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-md border border-cream/40 px-6 py-3 font-semibold text-cream transition hover:bg-cream/10"
      >
        Back to The Canopy
      </Link>
    </main>
  );
}
