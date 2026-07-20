import type { UtmData, UtmParams } from "@/lib/utm";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

export type GhlContact = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  utm?: UtmData;
};

/**
 * The sub-account's existing UTM custom fields (Settings → Custom Fields),
 * by field ID — the upsert API silently drops key-based entries.
 * utm_content maps onto GHL's "UTM Ad" fields — its slot for the
 * ad/creative-level identifier.
 */
const UTM_FIELD_IDS: Array<[keyof UtmParams, last: string, first: string]> = [
  ["source", "rc0xeEIiwBTTnLZ2RFIQ", "Hf8TNR80J8PmsTciRaq2"], // contact.utm_source[_first_attribution]
  ["medium", "7aj9jKhtMSi0JKDWUltb", "8OpsIK74QRl25bZ5rQWJ"], // contact.utm_medium[_first_attribution]
  ["campaign", "7efs5aFWQLG15ye30q71", "F6UO4JRjRJm8tw6z5kjf"], // contact.utm_campaign[_first_attribution]
  ["content", "OymXVsbT6mtUgGUnNZ7v", "66ZsutuKZqv9keevEkF1"], // contact.utm_ad[_first_attribution]
];

function utmCustomFields(utm?: UtmData): Array<{ id: string; field_value: string }> {
  if (!utm) return [];
  const fields: Array<{ id: string; field_value: string }> = [];
  for (const [param, lastId, firstId] of UTM_FIELD_IDS) {
    const last = utm.last?.[param];
    if (last) fields.push({ id: lastId, field_value: last });
    const first = utm.first?.[param];
    if (first) fields.push({ id: firstId, field_value: first });
  }
  return fields;
}

/**
 * Upsert a contact into GoHighLevel (LeadConnector API v2).
 * No-ops with a warning until GHL_API_KEY + GHL_LOCATION_ID are configured,
 * so the funnel keeps working before the GHL sub-account is wired up.
 * Never throws — CRM sync must not break the funnel.
 */
export async function upsertGhlContact(contact: GhlContact): Promise<void> {
  const token = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.warn("[ghl] GHL_API_KEY / GHL_LOCATION_ID not set — skipping contact sync");
    return;
  }
  const { utm, ...rest } = contact;
  const customFields = utmCustomFields(utm);
  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        ...rest,
        ...(customFields.length && { customFields }),
      }),
    });
    if (!res.ok) {
      console.error(`[ghl] contact upsert failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error("[ghl] contact upsert error:", err);
  }
}
