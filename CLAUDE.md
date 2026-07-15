# The Canopy — Moody Moon Ridge (prelaunch funnel)

LaunchBoom-style prelaunch funnel rebuilt as a custom Next.js site. Four steps:
`/` landing (waitlist) → `/reservation` (priority offer) → `/checkout` (Stripe deposit) → `/reserved` (confirmation). Plus `/log`, a noindexed docs-style dashboard (HGM/Untitled UI look) rendered from `docs/project-log.ts` — **every working session: append an entry to `entries` there (and update `milestones`/`waitingOn` if changed), then commit and push**.

**NEVER deploy without the user's explicit confirmation.** Finish work, run it locally (`npm run dev`), hand over the localhost link for review, and deploy only when they approve.

## Stack & infrastructure

- Next.js 15 App Router + TypeScript + Tailwind v4 (tokens in `app/globals.css` via `@theme`).
- **Supabase** project ref `wcnfprpvmnroixxetljd` (ca-central-1) — lives in a **separate Supabase account**, NOT the one connected to the claude.ai MCP connector. Manage schema via `npx supabase db push --db-url` using the session pooler `aws-0-ca-central-1.pooler.supabase.com:5432` (direct db host is IPv6-only; this network can't reach it). Migrations live in `supabase/migrations/`. Tables: `leads`, `reservations`. RLS: public key is insert-only; status updates need `SUPABASE_SERVICE_ROLE_KEY`. (An unused project `bbwegbqebcjhzjwsibqw` exists in the MCP-connected account — safe to delete.)
- **Netlify (production)**: site `canopy-moodymoonridge`, id `46b67971-05dc-4470-ba35-0e601c1ca422`, on the **client's team** "The Canopy" (`sue-jt2qwvg`, sue@moodymoonridge.com) → https://canopy-moodymoonridge.netlify.app. The local CLI login (anhtuan@) has NO access to that team — deploy with the client token from `.env.local`: `set -a; source .env.local; set +a; netlify deploy --build --prod`. No git remote yet.
- **Netlify (staging/unused)**: `canopy-mmr-staging`, id `8366beac-6aa7-4860-9a3e-32cb2c0fa719`, on agency team `admin-ildxn2k` (the original deploy home; safe to delete).
- **Stripe**: Payment Element; demo mode until keys set. **GHL**: `lib/ghl.ts` (LeadConnector API v2), no-op until token set.
- **Figma** source: file `jOrtjJkC6NHzHH7OLqG8dV`, landing design node `16418:982` (1440px desktop only — derive mobile). Brand: navy `#274F66`, copper `#A35F33`, Merriweather + Inter. Steps 2–4 have no Figma designs; derive from landing design system.
- Live LaunchBoom original: https://canopy.moodymoonridge.com (Cloudflare-blocked, don't bother scraping).

## Conventions

- All DB writes go through API routes (`app/api/*`) — never from client components.
- GHL sync must never break the funnel: `upsertGhlContact` never throws.
- Funnel tags: `canopy-waitlist` → `canopy-reservation-started` → `canopy-reserved`.
- Deposit amount comes from `RESERVATION_AMOUNT_CENTS` env (client hasn't finalized it).
- Env: `.env.local` locally, Netlify env vars in prod — keep in sync with `.env.example`.

## Commands

- `npm run dev` · `npm run build` · `npm run lint`
- Deploy: `netlify deploy --build --prod` (Netlify CLI is authed on this machine)
