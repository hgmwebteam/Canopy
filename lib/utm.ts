/**
 * UTM attribution shared between client and server.
 *
 * Client: captureUtmFromUrl() stores UTM params from the URL in
 * localStorage — first-touch is written once and never overwritten,
 * last-touch updates on every visit that carries UTMs. getUtm() returns
 * both for inclusion in API payloads.
 *
 * Server: sanitizeUtm() validates the payload before it reaches
 * Supabase/GHL.
 */

export type UtmParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
};

export type UtmData = { first?: UtmParams; last?: UtmParams };

const FIRST_KEY = "canopy_utm_first";
const LAST_KEY = "canopy_utm_last";
const PARAM_KEYS = ["source", "medium", "campaign", "content"] as const;

function cleanValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim().slice(0, 255);
  return v || undefined;
}

function cleanParams(input: unknown): UtmParams | undefined {
  if (!input || typeof input !== "object") return undefined;
  const out: UtmParams = {};
  for (const key of PARAM_KEYS) {
    const v = cleanValue((input as Record<string, unknown>)[key]);
    if (v) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Server-side: validate an untrusted utm payload from the request body. */
export function sanitizeUtm(input: unknown): UtmData | undefined {
  if (!input || typeof input !== "object") return undefined;
  const first = cleanParams((input as Record<string, unknown>).first);
  const last = cleanParams((input as Record<string, unknown>).last);
  if (!first && !last) return undefined;
  return { ...(first && { first }), ...(last && { last }) };
}

/** Client-side: read utm_* from the current URL and persist first/last touch. */
export function captureUtmFromUrl(): void {
  if (typeof window === "undefined") return;
  const qs = new URLSearchParams(window.location.search);
  const params: UtmParams = {};
  for (const key of PARAM_KEYS) {
    const v = cleanValue(qs.get(`utm_${key}`));
    if (v) params[key] = v;
  }
  if (!Object.keys(params).length) return;
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify(params));
    if (!localStorage.getItem(FIRST_KEY)) {
      localStorage.setItem(FIRST_KEY, JSON.stringify(params));
    }
  } catch {
    // storage unavailable (private mode) — attribution is best-effort
  }
}

/** Client-side: stored attribution for API payloads (undefined when none). */
export function getUtm(): UtmData | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const first = cleanParams(JSON.parse(localStorage.getItem(FIRST_KEY) ?? "null"));
    const last = cleanParams(JSON.parse(localStorage.getItem(LAST_KEY) ?? "null"));
    if (!first && !last) return undefined;
    return { ...(first && { first }), ...(last && { last }) };
  } catch {
    return undefined;
  }
}
