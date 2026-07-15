/**
 * Single source of truth for the /log page (HGM-docs-style project log).
 * Append a new entry to `entries` (newest first) every working session.
 */

export type LogEntry = {
  version: string;
  date: string; // YYYY-MM-DD
  title: string;
  items: string[];
};

export type Milestone = {
  label: string;
  status: "done" | "active" | "pending";
};

export const project = {
  name: "The Canopy",
  client: "Moody Moon Ridge",
  liveUrl: "https://canopy-moodymoonridge.netlify.app",
  overview:
    "LaunchBoom-style prelaunch funnel rebuilt as a custom Next.js site: landing page with waitlist capture → reservation offer → Stripe deposit checkout → confirmation. Leads and reservations stored in Supabase, contacts synced to GoHighLevel at every step, hosted on the client's Netlify account. Design source is the Figma landing page; steps 2–4 derive from its design system.",
};

export const milestones: Milestone[] = [
  { label: "M1 · Foundation (scaffold, Supabase, Netlify, funnel skeleton)", status: "done" },
  { label: "M2 · Landing page build from Figma (~14 sections, responsive)", status: "done" },
  { label: "M3 · Funnel pages + Stripe Payment Element", status: "active" },
  { label: "M4 · GHL sync + Stripe webhook live", status: "pending" },
  { label: "M5 · QA, code review, launch prep (DNS cutover)", status: "pending" },
];

export const waitingOn: string[] = [
  "Stripe API keys (test + live) — checkout runs in demo mode until then",
  "GHL Private Integration token + Location ID — CRM sync is a no-op until then",
  "Final deposit amount (placeholder $100 via RESERVATION_AMOUNT_CENTS)",
  "Go/no-go for pointing canopy.moodymoonridge.com DNS at Netlify",
];

export const entries: LogEntry[] = [
  {
    version: "v0.2.0",
    date: "2026-07-15",
    title: "Full landing page built from Figma (Milestone 2)",
    items: [
      "All 18 sections implemented from the Figma design: hero, logo intro, quick-info bar, three waitlist bands, “This isn't Rustic. It's intentional”, “The Canopy is for you if…” grid, pricing gallery + Private Treehouse info, care section, stats, illustrated map, photo grid, founder testimonial, “Your path to the ridge”, and footer.",
      "Built by 8 parallel agents (one per section group), each pulling design context and assets straight from Figma; every section then adversarially verified against Figma screenshots with fixes applied (text fidelity, colors, alt text, spacing).",
      "Responsive derived for mobile (the Figma design is desktop-only); production build passes.",
      "Reviewed and deployed to production.",
    ],
  },
  {
    version: "v0.1.3",
    date: "2026-07-15",
    title: "Project log rebuilt as a docs-style dashboard",
    items: [
      "Redesigned /log to match the HGM internal docs system (Untitled UI style): light/dark theme, stat tiles, milestone tracker, waiting-on list, and a dated update timeline.",
      "Log entries now live in a structured data file (docs/project-log.ts) instead of markdown.",
      "Workflow change: every update is now committed to git, pushed to GitHub, and deployed to Netlify immediately.",
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-07-15",
    title: "Code on GitHub",
    items: [
      "Project pushed to GitHub: hgmwebteam/Canopy — first push of the full foundation history.",
    ],
  },
  {
    version: "v0.1.1",
    date: "2026-07-15",
    title: "Hosting moved to the client's Netlify account",
    items: [
      "Site now lives on the client's own Netlify team (“The Canopy”, sue@moodymoonridge.com) at canopy-moodymoonridge.netlify.app, deployed via access token.",
      "The original agency-team copy was renamed to canopy-mmr-staging and can serve as staging (or be deleted).",
      "All environment variables (Supabase, deposit amount) copied to the new site.",
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-07-15",
    title: "Foundation — funnel skeleton live end-to-end",
    items: [
      "Scaffolded Next.js 15 (App Router, TypeScript) with Tailwind CSS v4.",
      "Extracted brand tokens from Figma: navy #274F66, copper #A35F33, Merriweather (headings) + Inter (body).",
      "All four funnel routes live as working skeletons: / (landing + waitlist form), /reservation (priority offer), /checkout (demo mode until Stripe keys land), /reserved (confirmation).",
      "Connected the client's Supabase project (ca-central-1) with leads and reservations tables; RLS locked to insert-only for public traffic.",
      "API routes: POST /api/leads (waitlist → Supabase + GHL tag canopy-waitlist), POST /api/reservations (reservation + Stripe PaymentIntent when configured), POST /api/stripe-webhook (marks reservations paid + GHL tag canopy-reserved).",
      "GHL contact sync built (LeadConnector API v2) — activates once GHL_API_KEY + GHL_LOCATION_ID are set.",
      "Deployed and verified the full funnel end-to-end: all routes 200, waitlist + reservation writes confirmed in Supabase, test rows cleaned up.",
    ],
  },
];
