export const DASH_COOKIE = "canopy_dash";
export const DASH_USER = "canopy";

/**
 * Deterministic session token: HMAC-SHA256("canopy-dashboard-v1", DASHBOARD_PASSWORD).
 * Web Crypto only, so it runs identically in the node login route and the
 * edge middleware. Rotating the password invalidates all sessions.
 */
export async function dashToken(): Promise<string | null> {
  const secret = process.env.DASHBOARD_PASSWORD;
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode("canopy-dashboard-v1")
  );
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
