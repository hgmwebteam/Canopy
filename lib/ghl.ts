const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

export type GhlContact = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  source?: string;
};

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
  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locationId, ...contact }),
    });
    if (!res.ok) {
      console.error(`[ghl] contact upsert failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error("[ghl] contact upsert error:", err);
  }
}
