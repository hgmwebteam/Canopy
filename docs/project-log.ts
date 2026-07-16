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

export type LinkGroup = {
  title: string;
  links: { label: string; href: string; note?: string }[];
};

export const linkGroups: LinkGroup[] = [
  {
    title: "Live site",
    links: [
      { label: "Landing page", href: "https://canopy-moodymoonridge.netlify.app" },
      { label: "Reservation (VIP offer)", href: "https://canopy-moodymoonridge.netlify.app/reservation" },
      { label: "Checkout", href: "https://canopy-moodymoonridge.netlify.app/checkout" },
      { label: "Confirmation", href: "https://canopy-moodymoonridge.netlify.app/reserved" },
      { label: "Funnel dashboard", href: "https://canopy-moodymoonridge.netlify.app/dashboard", note: "team sign-in required" },
    ],
  },
  {
    title: "Code & docs",
    links: [
      { label: "GitHub repo", href: "https://github.com/hgmwebteam/Canopy" },
      { label: "Email Setup on GHL (team guide)", href: "https://claude.ai/code/artifact/88dad901-9679-427d-9eea-abc75ed82d61", note: "workflows + 6 HTML email templates" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Netlify (production)", href: "https://app.netlify.com/projects/canopy-moodymoonridge", note: "client team “The Canopy”" },
      { label: "Supabase (data)", href: "https://supabase.com/dashboard/project/wcnfprpvmnroixxetljd", note: "leads · reservations · page views" },
      { label: "GoHighLevel sub-account", href: "https://app.gohighlevel.com/v2/location/LYaWfRDkiGY0wLhmgR3V", note: "CRM sync + email workflows" },
    ],
  },
  {
    title: "Design & social",
    links: [
      { label: "Figma design", href: "https://www.figma.com/design/jOrtjJkC6NHzHH7OLqG8dV/Canopy---Moody-Moon?node-id=16418-982" },
      { label: "Original LaunchBoom funnel", href: "https://canopy.moodymoonridge.com", note: "real domain — DNS cutover pending" },
      { label: "Facebook group", href: "https://www.facebook.com/groups/25643725155245385/" },
      { label: "Instagram", href: "https://www.instagram.com/canopymoodymoonridge/" },
    ],
  },
];

export const milestones: Milestone[] = [
  { label: "M1 · Foundation (scaffold, Supabase, Netlify, funnel skeleton)", status: "done" },
  { label: "M2 · Landing page build from Figma (~14 sections, responsive)", status: "done" },
  { label: "M3 · Funnel pages + Stripe Payment Element", status: "done" },
  { label: "M4 · GHL sync + Stripe webhook live", status: "active" },
  { label: "M5 · QA, code review, launch prep (DNS cutover)", status: "pending" },
];

export const waitingOn: string[] = [
  "Stripe payment connection — add publishable key + secret key, then verify live checkout end-to-end (webhook + test card + real $50 charge)",
  "GHL workflows — build the tag-triggered automations (welcome flow on canopy-waitlist, abandoned-checkout recovery, VIP confirmation)",
  "Final deposit amount (placeholder $100 via RESERVATION_AMOUNT_CENTS)",
  "Go/no-go for pointing canopy.moodymoonridge.com DNS at Netlify",
];

export const entries: LogEntry[] = [
  {
    version: "v0.5.0",
    date: "2026-07-16",
    title: "Internal funnel dashboard",
    items: [
      "New password-protected /dashboard (Basic Auth, customer data stays private): live waitlist count, checkouts started, VIPs paid, revenue collected + pending, conversion rates, 14-day signup chart, signups by source, and latest activity feeds — straight from Supabase on every refresh.",
      "Status badges show at a glance whether Stripe is live or in demo mode and whether GHL sync is active.",
      "LaunchBoom-style “Last 7 days performance” row: Visits, Leads, Checkouts started, Purchases (each with conversion rate vs visits) and Lead → Purchase rate — powered by new first-party visit tracking (cookieless beacon → Supabase page_views).",
      "Date-range filter (7 / 14 / 30 days / all time) drives the performance row, signup chart, and source breakdown; all-time totals stay pinned.",
      "Proper sign-in page at /login (styled form, cookie session, sign-out button) replaces the browser Basic-Auth popup.",
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-07-16",
    title: "Video, slideshow, and mobile UX overhaul",
    items: [
      "Hero is now a full-bleed, 90vh ambient video (client footage, compressed 15MB → 3MB); “The Experience” rows play their own videos (27MB → 7.4MB, 16MB → 4.5MB) with photo posters for instant paint.",
      "“The Canopy is for you if…” reasons are now proper cards — image, serif heading (no more italic), and body grouped in one rounded container, uniform image heights on mobile.",
      "Pricing gallery: square 1:1 five-image slideshow on mobile (arrows, dots, swipe, gentle auto-advance); Airbnb-style collage (hero + 2×2 grid) on desktop.",
      "Mid-page waitlist band flipped to a light sand tone so it stands apart from the dark sections around it.",
      "New mobile sticky “Join the Waitlist” button with a popup form — automatically hides whenever a waitlist form or the footer is on screen.",
      "Mobile polish: map stats now 2×2 compact tiles, photo gallery is a two-column masonry with a full-screen lightbox (swipe/arrows/captions), founder quote resized with comfortable line height.",
      "Founder video: picture-in-picture card pops up when “Meet the Founder” scrolls into view (10s muted preview) — click to watch the full video with sound.",
      "Performance: below-fold videos now lazy-load only when approaching the viewport (~12MB lighter initial load); hero uses an optimized instant poster under the video.",
      "Fixes: care-section icons no longer clip on iPad; Private Treehouse banner corrected from the design's leftover “$1” to the real $50 VIP offer, redesigned as an offer card with a CTA button.",
    ],
  },
  {
    version: "v0.3.2",
    date: "2026-07-16",
    title: "GoHighLevel connected — CRM sync is live",
    items: [
      "Location ID for the “Canopy at Moody Moon Ridge” sub-account (Newport, TN) wired into local + Netlify env alongside the Private Integration token.",
      "Verified end-to-end: waitlist signup through the site created a GHL contact with tag canopy-waitlist and source canopy-hero; test contacts and rows cleaned up.",
      "From the next deploy, every signup, checkout start, and paid deposit auto-syncs to GHL (canopy-waitlist → canopy-reservation-started → canopy-reserved).",
      "Email program delivered for team review: “Email Setup on GHL” guide (with Mailchimp comparison), 3 workflow build specs, and 6 branded HTML email templates (docs/emails/).",
    ],
  },
  {
    version: "v0.3.1",
    date: "2026-07-16",
    title: "Reservation page: exact VIP offer from LaunchBoom",
    items: [
      "Reservation page rebuilt with the exact live offer copy: $50 VIP upgrade locks in 50% OFF the $1,150/night MSRP → $575/night + first in line for dates.",
      "Added imagery: dusk treehouse hero with a 50% OFF badge and an MSRP-vs-VIP price-lock strip.",
      "Checkout and confirmation aligned to VIP framing (order summary shows the crossed-out MSRP rate; buttons read “Become a VIP”).",
      "VIP price now $50 via RESERVATION_AMOUNT_CENTS (env + Netlify updated); nightly pricing centralized in lib/config.ts.",
      "Checkout: added the development/prototype disclaimer (designs, cost, and Kickstarter price subject to change).",
      "Checkout: payment fields now render inline on the page (real Stripe Payment Element when keys are set; placeholder card fields in demo mode).",
      "Confirmation page: added Facebook group + Instagram icon links (“Watch the ridge come to life” community band) and the client's success Lottie animation in the hero.",
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-07-16",
    title: "Funnel pages built — reservation, checkout, confirmation (Milestone 3)",
    items: [
      "Reservation offer page: founding-guest pitch with benefits cards, scarcity band, and refund FAQ — copy and styling derived from the landing design system (Merriweather/Inter, navy/copper/cream).",
      "Checkout: details form + order summary card, with the full Stripe Payment Element flow coded and brand-themed (copper, 4px radii, Inter) — runs in demo mode until Stripe keys are added, then lights up automatically.",
      "Confirmation page: celebration hero, three-step “what happens next” (mirroring the landing path-steps style), refund reassurance; handles Stripe redirect states and demo arrivals gracefully.",
      "Reservation API now records the Stripe PaymentIntent on each reservation so the webhook can mark deposits paid.",
      "Shared FunnelHeader across funnel steps; email + lead id flow through every step; full demo-mode funnel verified end-to-end locally.",
    ],
  },
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
