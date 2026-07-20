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
 * UTMs go to GHL as NATIVE attribution, not direct custom-field writes.
 * The location's published "Contact Created or Changed -> Update UTMs"
 * workflow copies native attribution into the UTM custom fields and wipes
 * any value written there directly (API-created contacts have empty
 * session attribution). attributionSource at contact creation becomes the
 * contact's first attribution, which that workflow persists into the
 * "UTM ... (First Attribution)" fields; GHL ignores it on later upserts.
 */
function utmAttribution(utm?: UtmData): Record<string, string> | undefined {
  const touch: UtmParams | undefined = utm?.first ?? utm?.last;
  if (!touch) return undefined;
  const attribution: Record<string, string> = {
    sessionSource: "Website funnel",
    medium: "form",
  };
  if (touch.source) attribution.utmSource = touch.source;
  if (touch.medium) attribution.utmMedium = touch.medium;
  if (touch.campaign) attribution.campaign = touch.campaign;
  if (touch.content) attribution.utmContent = touch.content;
  return attribution;
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
  const attributionSource = utmAttribution(utm);
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
        ...(attributionSource && { attributionSource }),
      }),
    });
    if (!res.ok) {
      console.error(`[ghl] contact upsert failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error("[ghl] contact upsert error:", err);
  }
}
