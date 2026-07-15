/** Reservation deposit in cents. Final amount TBD by client — override via env, no code change needed. */
export const RESERVATION_AMOUNT_CENTS = Number(
  process.env.RESERVATION_AMOUNT_CENTS ?? 10000
);

/** Canonical site URL. Netlify sets URL at build/runtime. */
export const SITE_URL = process.env.URL ?? "http://localhost:3000";

export const BRAND = {
  name: "The Canopy",
  tagline: "Luxury Treehouses for Quiet Connection",
  waitlistHook: "Only six treehouses. One waitlist.",
} as const;
