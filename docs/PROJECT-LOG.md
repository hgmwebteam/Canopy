# The Canopy — Project Log

All notable updates to the Canopy funnel project, newest first. Rendered at [/log](/log).

## 2026-07-15 — v0.1.1 · Moved hosting to the client's Netlify account

- Site now lives on the client's own Netlify team ("The Canopy", sue@moodymoonridge.com) at https://canopy-moodymoonridge.netlify.app — deployed via access token.
- The original agency-team copy was renamed to `canopy-mmr-staging` and can serve as a staging environment (or be deleted).
- All environment variables (Supabase, deposit amount) copied to the new site.

## 2026-07-15 — v0.1.0 · Foundation

- Scaffolded Next.js 15 (App Router, TypeScript) with Tailwind CSS v4.
- Extracted brand tokens from Figma: navy `#274F66`, copper `#A35F33`, Merriweather (headings) + Inter (body).
- Created all 4 funnel routes as working skeletons: `/` (landing + waitlist form), `/reservation` (priority offer), `/checkout` (reservation form, demo mode until Stripe keys land), `/reserved` (confirmation) — plus this `/log` page.
- Connected the client's Supabase project (`wcnfprpvmnroixxetljd`, ca-central-1) with `leads` and `reservations` tables, RLS locked to insert-only for public traffic; migration in `supabase/migrations/0001_canopy_funnel.sql`.
- API routes live: `POST /api/leads` (waitlist → Supabase + GHL tag `canopy-waitlist`), `POST /api/reservations` (reservation → Supabase + GHL tag `canopy-reservation-started`, Stripe PaymentIntent when configured), `POST /api/stripe-webhook` (marks reservations paid + GHL tag `canopy-reserved`).
- GHL contact sync built (LeadConnector API v2) — activates once `GHL_API_KEY` + `GHL_LOCATION_ID` are set.
- Created Netlify site `canopy-moodymoonridge` on the agency team; deployed foundation to https://canopy-moodymoonridge.netlify.app and verified the full funnel end-to-end (all routes 200, waitlist + reservation writes confirmed in Supabase, test rows cleaned up).

### Next up (Milestone 2)

- Full landing page build from Figma (~14 sections, node `16418:982`), responsive, with real imagery.

### Waiting on client/team

- Stripe API keys (test + live) · GHL Private Integration token + Location ID · final deposit amount.
