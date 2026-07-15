"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Which form placement captured the lead, e.g. "hero", "mid-page", "footer". */
  source: string;
  className?: string;
};

export default function WaitlistForm({ source, className = "" }: Props) {
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

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="flex-1 rounded-md border border-navy/20 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-copper"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-copper px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Join the Waitlist"}
        </button>
      </div>
      {status === "error" && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}
