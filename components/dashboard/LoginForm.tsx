"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-(--dl-ring) bg-white px-4 text-[15px] text-(--dl-text) placeholder:text-(--dl-text-4) focus:outline-none focus:ring-2 focus:ring-(--dl-brand) dark:bg-transparent";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sign-in failed");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Sign-in failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-(--dl-text-2)">Username</span>
        <input
          type="text"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          className={INPUT_CLASS}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-(--dl-text-2)">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className={INPUT_CLASS}
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 h-11 w-full rounded-lg bg-(--dl-brand) text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in…" : "Sign in"}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-600">{message}</p>
      )}
    </form>
  );
}
