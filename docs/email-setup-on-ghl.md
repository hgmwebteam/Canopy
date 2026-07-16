# Email Setup on GHL — Canopy Funnel

**For the HGM team** · Sub-account: **Canopy at Moody Moon Ridge** (Location `LYaWfRDkiGY0wLhmgR3V`) · Prepared 2026-07-16

## 1. How contacts arrive (already live)

The new Canopy site (canopy-moodymoonridge.netlify.app) pushes every visitor action into this GHL sub-account automatically — no Zapier, no forms to embed. Contacts are upserted by email (never duplicated) and tagged:

| Site action | GHL tag added | Contact data |
|---|---|---|
| Waitlist form (any of 3 placements) | `canopy-waitlist` | email + source (`canopy-hero`, `canopy-band-top`, `canopy-band-mid`, `canopy-band-bottom`) |
| Checkout form submitted | `canopy-reservation-started` | + full name, phone |
| $50 VIP payment succeeds (Stripe) | `canopy-reserved` | — |

Tags are the automation triggers. Everything below hangs off them.

## 2. The three workflows to build

GHL workflows must be built in the UI (Automation → Workflows → Create Workflow → Start from Scratch). Full step tables live in `docs/ghl-workflows.md`; summary:

1. **Canopy — Waitlist Welcome Flow** — trigger: tag `canopy-waitlist` added. Email 1 (Promotion) immediately → wait 2 days → if not VIP, Email 2 (Reminder) → wait 3 days → if not VIP, Email 3 (Last Chance). Re-entry OFF; exit when `canopy-reserved` is added.
2. **Canopy — Abandoned Checkout** — trigger: tag `canopy-reservation-started` added. Wait 45 min → if not VIP, Recovery email → wait 1 day → if not VIP, Final email + optional SMS. Exit on `canopy-reserved`.
3. **Canopy — VIP Confirmation** — trigger: tag `canopy-reserved` added. Send Confirmation email, remove contact from workflows 1–2, optionally create an Opportunity in a "Canopy VIP" pipeline (Waitlist → Checkout Started → VIP Paid → Booked).

## 3. The six HTML emails

Ready-made branded HTML lives in `docs/emails/` (navy/copper/cream, table-based, inline styles, 600px, mobile-safe):

| File | Used in | Subject line |
|---|---|---|
| `01-welcome-promotion.html` | Welcome step 1 | You're on the list — here's 50% OFF |
| `02-welcome-reminder.html` | Welcome step 2 | Only six treehouses — your VIP spot is still open |
| `03-welcome-last-chance.html` | Welcome step 3 | Last call for 50% OFF at The Canopy |
| `04-abandoned-recovery.html` | Abandoned step 1 | Your VIP spot is almost yours |
| `05-abandoned-final.html` | Abandoned step 2 | Still holding your 50% OFF |
| `06-vip-confirmation.html` | Confirmation | VIP confirmed — welcome to the Canopy Circle |

**To load one into GHL:** Marketing → Emails → Templates → **New** → **Code Editor (Custom HTML)** → paste the file contents → save as a template → select it in the workflow's Send Email step. Emails use `{{contact.first_name}}` only where the funnel guarantees a name (checkout onward). Each includes a preheader and an unsubscribe link placeholder (`{{unsubscribe_link}}` — swap for the sub-account's preferred unsubscribe method if different).

## 4. GHL vs. Mailchimp for this funnel

| | **GHL (this sub-account)** | **Mailchimp (current)** |
|---|---|---|
| Contact ingestion | Already wired — site pushes contacts + tags in real time | Needs a sync layer (Zapier/n8n/custom) from the site or GHL |
| Behavioral triggers | Native: tag added → workflow, with exit conditions on purchase | Journeys can do it, but purchase-exit needs the sync to write back |
| SMS follow-up | Built in (abandoned-checkout SMS) | Not included (separate tool) |
| CRM / pipeline view | Contacts + Opportunities in the same place the client already uses | Audience only, no pipeline |
| Email editor | Weaker visual editor; custom HTML works fine (provided) | Stronger editor + template ecosystem |
| Deliverability | Good when the sub-account's dedicated domain/DKIM is set up (verify LC Email settings before launch) | Mature, generally excellent |
| Cost | Already paid (agency plan) | Separate subscription |

**Recommendation:** run the three funnel automations in **GHL** — the contact + tag data already lands there in real time, exits on purchase are native, and SMS is included. Keep Mailchimp (if desired) for broadcast newsletters to the wider list; we can export/sync audiences later. Splitting the *funnel* across both tools would force a two-way sync that adds failure modes without adding capability.

## 5. Pre-launch checklist

- [ ] Dedicated sending domain + DKIM verified in the sub-account (Settings → Email Services)
- [ ] Build the 3 workflows; load the 6 HTML templates
- [ ] Test with a real email: join waitlist on the live site → confirm enrollment, then complete checkout → confirm exit from flows 1–2 and receipt of confirmation
- [ ] Confirm unsubscribe renders and works in each template
- [ ] Turn on the abandoned-checkout SMS only after A2P/phone compliance is confirmed
