/** VIP Spot price in cents ($50, per the live LaunchBoom offer). Override via env. */
export const RESERVATION_AMOUNT_CENTS = Number(
  process.env.RESERVATION_AMOUNT_CENTS ?? 5000
);

/** VIP offer economics (whole dollars) — source: canopy.moodymoonridge.com/reservation. */
export const PRICING = {
  msrpPerNight: 1150,
  vipPerNight: 575,
  discountLabel: "50% OFF",
} as const;

/** Canonical site URL. Netlify sets URL at build/runtime. */
export const SITE_URL = process.env.URL ?? "http://localhost:3000";

export const BRAND = {
  name: "The Canopy",
  tagline: "Luxury Treehouses for Quiet Connection",
  waitlistHook: "Only six treehouses. One waitlist.",
} as const;
