"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Step 3 — Checkout page.
 * Foundation skeleton: reservation details form. While Stripe keys are not
 * configured the API runs in demo mode (records the reservation as `started`
 * and continues to /reserved). Milestone 3 mounts the Stripe Payment Element
 * when the API returns a clientSecret.
 */
function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          phone,
          leadId: searchParams.get("lead") ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.demo) {
        router.push("/reserved?demo=1");
        return;
      }
      // Milestone 3: mount Stripe Payment Element with data.clientSecret here.
      setStatus("error");
      setMessage("Payment step not wired yet — Stripe integration lands in Milestone 3.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-md flex-col gap-4">
      <input
        type="text"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
        aria-label="Full name"
        className="rounded-md border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="Email address"
        className="rounded-md border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        aria-label="Phone number"
        className="rounded-md border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-copper px-6 py-4 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Reserving…" : "Complete My Reservation"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-cream px-6 py-24 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-copper">
        Secure your spot
      </p>
      <h1 className="max-w-2xl font-serif text-3xl text-navy sm:text-4xl">
        Complete your reservation
      </h1>
      <Suspense>
        <CheckoutForm />
      </Suspense>
    </main>
  );
}
