"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TRACKED = new Set(["/", "/reservation", "/checkout", "/reserved"]);

/**
 * First-party visit beacon: counts each funnel page once per browser session.
 * No cookies, no fingerprinting — just a path + optional referrer row.
 */
export default function TrackPageview() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TRACKED.has(pathname)) return;
    const key = `cv-tracked-${pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // storage unavailable (private mode) — still count the view
    }
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
