"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";

const INPUT_CLASS =
  "h-11 w-full rounded-[4px] border border-navy/20 bg-white px-4 text-[15px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper";

const BUTTON_CLASS =
  "flex h-11 w-full items-center justify-center rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:opacity-60";

/** Stripe.js is injected only once a clientSecret exists — demo mode never loads it. */
let stripePromise: Promise<StripeJs | null> | null = null;
function getStripeJs(): Promise<StripeJs | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    stripePromise = key ? loadStripe(key) : Promise.resolve(null);
  }
  return stripePromise;
}

const APPEARANCE = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#A35F33",
    colorText: "#24333c",
    colorBackground: "#ffffff",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "4px",
  },
};

function PaymentStep({ amountLabel }: { amountLabel: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    setMessage("");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/reserved` },
    });
    // Only reached when confirmation fails before redirect.
    setMessage(error.message ?? "Payment could not be completed — please try again.");
    setPaying(false);
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col gap-5">
      <PaymentElement />
      <button type="submit" disabled={!stripe || paying} className={BUTTON_CLASS}>
        {paying ? "Processing…" : `Pay ${amountLabel} · Become a VIP`}
      </button>
      {message && <p className="font-sans text-sm text-red-600">{message}</p>}
    </form>
  );
}

export default function CheckoutFlow({ amountLabel }: { amountLabel: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripeJs = useMemo(() => (clientSecret ? getStripeJs() : null), [clientSecret]);

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
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStatus("idle");
        return;
      }
      throw new Error("Unexpected response — please try again");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (clientSecret && stripeJs) {
    return (
      <Elements stripe={stripeJs} options={{ clientSecret, appearance: APPEARANCE }}>
        <PaymentStep amountLabel={amountLabel} />
      </Elements>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-sans text-sm font-medium text-navy">Full name</span>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
          className={INPUT_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-sans text-sm font-medium text-navy">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className={INPUT_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-sans text-sm font-medium text-navy">
          Phone <span className="font-normal text-[#393939]/60">(optional)</span>
        </span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 555-5555"
          autoComplete="tel"
          className={INPUT_CLASS}
        />
      </label>
      <button type="submit" disabled={status === "submitting"} className={`${BUTTON_CLASS} mt-2`}>
        {status === "submitting" ? "Reserving…" : `Become a VIP — ${amountLabel}`}
      </button>
      {status === "error" && <p className="font-sans text-sm text-red-600">{message}</p>}
      <p className="text-center font-sans text-sm leading-6 text-[#393939]/70">
        Secure checkout · Powered by Stripe · 100% refundable
      </p>
    </form>
  );
}
