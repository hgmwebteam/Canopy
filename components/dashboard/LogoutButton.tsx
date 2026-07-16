"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="rounded-full px-3 py-1 text-xs font-semibold text-(--dl-text-4) ring-1 ring-(--dl-ring) transition hover:text-(--dl-text-2)"
    >
      Sign out
    </button>
  );
}
