# GHL Workflow Build Specs — Canopy Funnel

Sub-account: **Canopy at Moody Moon Ridge** (Location `LYaWfRDkiGY0wLhmgR3V`).
The site pushes contacts with these tags (in funnel order):
`canopy-waitlist` → `canopy-reservation-started` → `canopy-reserved`.
Contact `source` records the capture point (`canopy-hero`, `canopy-band-top`, `canopy-band-mid`, `canopy-band-bottom`, `canopy-checkout`, `canopy-stripe`).

Workflows cannot be created via API — build these in **Automation → Workflows → Create Workflow → Start from Scratch**.

---

## 1. Waitlist Welcome Flow

**Trigger:** Contact Tag → Tag Added → `canopy-waitlist`
**Filter (workflow settings):** Allow re-entry: OFF.
**Exit condition:** tag `canopy-reserved` added → remove from workflow.

| Step | Action |
|---|---|
| 1 | Send Email 1 (Promotion) — immediately |
| 2 | Wait 2 days |
| 3 | If contact has tag `canopy-reserved` → End. Else send Email 2 (Reminder) |
| 4 | Wait 3 days |
| 5 | If contact has tag `canopy-reserved` → End. Else send Email 3 (Last Chance) |

**Email 1 · Promotion** — Subject: `You're on the list — here's 50% OFF`
> You're officially on The Canopy waitlist. Before we open the calendar to everyone, we're offering a small number of VIP spots: $50 today locks in 50% OFF our $1,150/night rate — you'll pay $575/night — and puts you first in line to choose your dates.
> [Become a VIP — $50] → https://canopy-moodymoonridge.netlify.app/reservation

**Email 2 · Reminder** — Subject: `Only six treehouses — your VIP spot is still open`
> A quiet reminder: The Canopy has six treehouses, and VIP spots are strictly limited. Your $50 VIP upgrade is fully refundable and locks in $575/night (50% OFF MSRP), plus first choice of dates.
> [Claim my 50% OFF] → https://canopy-moodymoonridge.netlify.app/reservation

**Email 3 · Last Chance** — Subject: `Last call for 50% OFF at The Canopy`
> VIP spots are nearly gone. After this, waitlist members book at standard rates, after VIPs choose their dates. $50 — fully refundable — locks in 50% OFF for your stay.
> [Become a VIP before spots fill] → https://canopy-moodymoonridge.netlify.app/reservation

---

## 2. Abandoned Checkout Recovery

**Trigger:** Contact Tag → Tag Added → `canopy-reservation-started`
**Exit condition:** tag `canopy-reserved` added → remove from workflow.

| Step | Action |
|---|---|
| 1 | Wait 45 minutes |
| 2 | If tag `canopy-reserved` → End. Else send Recovery Email |
| 3 | Wait 1 day |
| 4 | If tag `canopy-reserved` → End. Else send SMS (if phone) + final email |

**Recovery Email** — Subject: `Your VIP spot is almost yours`
> You were one step from locking in 50% OFF The Canopy. Your details are saved — finishing takes under a minute, and your $50 VIP spot is fully refundable.
> [Finish my reservation] → https://canopy-moodymoonridge.netlify.app/checkout

**SMS (optional):**
> The Canopy: your 50% OFF VIP spot is still being held. Finish in under a minute: https://canopy-moodymoonridge.netlify.app/checkout Reply STOP to opt out.

---

## 3. VIP Confirmation

**Trigger:** Contact Tag → Tag Added → `canopy-reserved`
**Also:** Remove contact from Workflows 1 & 2 (Remove From Workflow action), and optionally create/move an Opportunity to "VIP — Paid" in the Canopy VIP pipeline.

**Confirmation Email** — Subject: `VIP confirmed — welcome to the Canopy Circle`
> Your VIP status is confirmed: 50% OFF locked in ($575/night), first in line for dates. Nothing more is needed today — we'll email your private booking invitation before the public calendar opens.
> Join the community: Facebook group → https://www.facebook.com/groups/25643725155245385/ · Instagram → https://www.instagram.com/canopymoodymoonridge/

---

## Suggested pipeline (optional)

**Pipeline "Canopy VIP":** Waitlist → Checkout Started → VIP Paid → Booked.
Can be created via API/connector; opportunities can be auto-created by Workflows 1–3 (Create/Update Opportunity action) so revenue stages are visible per contact.
