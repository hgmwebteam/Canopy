"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Which form placement captured the lead, e.g. "hero", "band-top", "footer". */
  source: string;
  /** "row": input + button side by side. "stacked": full-width input above full-width button (Figma waitlist bands). */
  variant?: "row" | "stacked";
  buttonLabel?: string;
  className?: string;
};

export default function WaitlistForm({
  source,
  variant = "row",
  buttonLabel = "Join the Waitlist",
  className = "",
}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      const params = new URLSearchParams({ email });
      if (data.leadId) params.set("lead", data.leadId);
      router.push(`/reservation?${params.toString()}`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const input = (
    <input
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={variant === "stacked" ? "Email Address" : "Enter your email"}
      aria-label="Email address"
      className={
        variant === "stacked"
          ? "h-11 w-full rounded-[4px] bg-white px-4 text-[15px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
          : "flex-1 rounded-md border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
      }
    />
  );

  const button = (
    <button
      type="submit"
      disabled={status === "submitting"}
      className={
        variant === "stacked"
          ? "h-11 w-full rounded-[4px] bg-copper text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:opacity-60"
          : "rounded-md bg-copper px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      }
    >
      {status === "submitting" ? "Joining…" : buttonLabel}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      {variant === "stacked" ? (
        <div className="flex flex-col gap-3.5">
          {input}
          {button}
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          {input}
          {button}
        </div>
      )}
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
