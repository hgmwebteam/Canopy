"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtmFromUrl } from "@/lib/utm";

/** Persists utm_* params from any landing URL (first + last touch). */
export default function UtmCapture() {
  const pathname = usePathname();
  useEffect(() => {
    captureUtmFromUrl();
  }, [pathname]);
  return null;
}
