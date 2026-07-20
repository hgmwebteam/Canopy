"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import { getUtm } from "@/lib/utm";

const INPUT_CLASS =
  "h-11 w-full rounded-[4px] border border-navy/20 bg-white px-4 text-[15px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper";

const BUTTON_CLASS =
  "flex h-11 w-full items-center justify-center rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:opacity-60";

const LABEL_CLASS = "font-sans text-sm font-medium text-navy";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

/** Stripe.js loads once, only when a publishable key exists. */
let stripePromise: Promise<StripeJs | null> | null = null;
function getStripeJs(): Promise<StripeJs | null> {
  if (!stripePromise) {
    stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : Promise.resolve(null);
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

type Props = { amountLabel: string; amountCents: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Fire-and-forget GHL capture: once a name + valid email are typed
 * (phone included when present), sync the contact with the
 * canopy-reservation-started tag — even if they never touch the card
 * fields. Debounced past the last keystroke; re-sends only when the
 * values change (the server upsert makes repeats harmless).
 */
function useCheckoutCapture(fullName: string, email: string, phone: string) {
  const lastSent = useRef("");
  useEffect(() => {
    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    if (!name || !EMAIL_RE.test(mail)) return;
    const payload = JSON.stringify({ fullName: name, email: mail, phone: phone.trim(), utm: getUtm() });
    if (payload === lastSent.current) return;
    const timer = setTimeout(() => {
      lastSent.current = payload;
      fetch("/api/checkout-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, [fullName, email, phone]);
}

function ContactFields({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
}: {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
}) {
  return (
    <>
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Full name</span>
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
        <span className={LABEL_CLASS}>Email</span>
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
        <span className={LABEL_CLASS}>
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
    </>
  );
}

function TrustRow() {
  return (
    <p className="text-center font-sans text-sm leading-6 text-[#393939]/70">
      Secure checkout · Powered by Stripe · 100% refundable
    </p>
  );
}

/** Single-step checkout: contact fields + live Payment Element, one submit. */
function LiveCheckoutForm({ amountLabel }: { amountLabel: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  useCheckoutCapture(fullName, email, phone);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setMessage("");
    try {
      // Validate the payment fields first (deferred-intent flow).
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          phone,
          leadId: searchParams.get("lead") ?? undefined,
          utm: getUtm(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.demo) {
        router.push("/reserved?demo=1");
        return;
      }
      if (!data.clientSecret) throw new Error("Unexpected response — please try again");

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: { return_url: `${window.location.origin}/reserved` },
      });
      // Only reached when confirmation fails before redirect.
      throw new Error(error.message ?? "Payment could not be completed — please try again.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ContactFields
        {...{ fullName, setFullName, email, setEmail, phone, setPhone }}
      />
      <div className="mt-2 flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Payment</span>
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || submitting}
        className={`${BUTTON_CLASS} mt-2`}
      >
        {submitting ? "Processing…" : `Pay ${amountLabel} · Become a VIP`}
      </button>
      {message && <p className="font-sans text-sm text-red-600">{message}</p>}
      <TrustRow />
    </form>
  );
}

/** Demo checkout: same layout with disabled placeholder card fields. */
function DemoCheckoutForm({ amountLabel }: { amountLabel: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  useCheckoutCapture(fullName, email, phone);

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
          utm: getUtm(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      router.push("/reserved?demo=1");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ContactFields
        {...{ fullName, setFullName, email, setEmail, phone, setPhone }}
      />
      <div className="mt-2 flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Payment</span>
        <fieldset disabled className="flex flex-col gap-3 opacity-60">
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            aria-label="Card number (coming soon)"
            className={INPUT_CLASS}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM / YY"
              aria-label="Expiration date (coming soon)"
              className={INPUT_CLASS}
            />
            <input
              type="text"
              placeholder="CVC"
              aria-label="Security code (coming soon)"
              className={INPUT_CLASS}
            />
          </div>
        </fieldset>
        <p className="font-sans text-sm leading-6 text-copper">
          Secure card payment is being finalized — reserve now and we&apos;ll
          email you to complete your {amountLabel} VIP deposit.
        </p>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`${BUTTON_CLASS} mt-2`}
      >
        {status === "submitting" ? "Reserving…" : `Become a VIP — ${amountLabel}`}
      </button>
      {status === "error" && <p className="font-sans text-sm text-red-600">{message}</p>}
      <TrustRow />
    </form>
  );
}

export default function CheckoutFlow({ amountLabel, amountCents }: Props) {
  if (!PUBLISHABLE_KEY) {
    return <DemoCheckoutForm amountLabel={amountLabel} />;
  }
  return (
    <Elements
      stripe={getStripeJs()}
      options={{
        mode: "payment",
        amount: amountCents,
        currency: "usd",
        appearance: APPEARANCE,
      }}
    >
      <LiveCheckoutForm amountLabel={amountLabel} />
    </Elements>
  );
}
