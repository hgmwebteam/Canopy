import { getSupabaseServer } from "@/lib/supabase";
import { RESERVATION_AMOUNT_CENTS } from "@/lib/config";

export type RangeKey = "7d" | "14d" | "30d" | "all";

export const RANGES: { key: RangeKey; days: number | null; label: string }[] = [
  { key: "7d", days: 7, label: "Last 7 days" },
  { key: "14d", days: 14, label: "Last 14 days" },
  { key: "30d", days: 30, label: "Last 30 days" },
  { key: "all", days: null, label: "All time" },
];

export type DashboardData = {
  range: RangeKey;
  rangeLabel: string;
  // All-time totals (never filtered)
  totalLeads: number;
  started: number;
  paid: number;
  refunded: number;
  revenueCents: number;
  pendingRevenueCents: number;
  leadToCheckoutPct: number | null;
  checkoutToPaidPct: number | null;
  // Range-scoped performance
  perf: {
    visits: number;
    leads: number;
    leadCR: number | null;
    checkouts: number;
    checkoutCR: number | null;
    paid: number;
    paidCR: number | null;
    leadToPurchase: number | null;
  };
  days: { key: string; label: string; count: number }[];
  chartLabel: string;
  sources: { source: string; count: number }[];
  recentLeads: { email: string; source: string | null; created_at: string }[];
  recentReservations: {
    email: string;
    full_name: string | null;
    status: string;
    amount_cents: number | null;
    created_at: string;
  }[];
  stripeLive: boolean;
  ghlLive: boolean;
};

const pct = (num: number, den: number) =>
  den > 0 ? Math.round((num / den) * 10000) / 100 : null;

export async function getDashboardData(range: RangeKey): Promise<DashboardData> {
  const supabase = getSupabaseServer();
  const rangeDef = RANGES.find((r) => r.key === range) ?? RANGES[0];
  const cutoffIso = rangeDef.days
    ? new Date(Date.now() - rangeDef.days * 24 * 3600 * 1000).toISOString()
    : null;

  let visitsQuery = supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .eq("path", "/");
  if (cutoffIso) visitsQuery = visitsQuery.gte("created_at", cutoffIso);

  const [leadsRes, reservationsRes, leadCountRes, visitsRes] = await Promise.all([
    supabase
      .from("leads")
      .select("email, source, created_at")
      .order("created_at", { ascending: false })
      .limit(1000),
    supabase
      .from("reservations")
      .select("email, full_name, status, amount_cents, created_at")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    visitsQuery,
  ]);

  const leads = leadsRes.data ?? [];
  const reservations = reservationsRes.data ?? [];
  const totalLeads = leadCountRes.count ?? leads.length;

  // --- All-time tiles ---
  const paidRows = reservations.filter((r) => r.status === "paid");
  const started = reservations.filter((r) => r.status === "started").length;
  const refunded = reservations.filter((r) => r.status === "refunded").length;
  const paid = paidRows.length;
  const revenueCents = paidRows.reduce(
    (sum, r) => sum + (r.amount_cents ?? RESERVATION_AMOUNT_CENTS),
    0
  );
  const totalCheckout = started + paid + refunded;

  // --- Range-scoped slices ---
  const inRange = <T extends { created_at: string }>(rows: T[]) =>
    cutoffIso ? rows.filter((r) => r.created_at >= cutoffIso) : rows;
  const rLeads = inRange(leads);
  const rReservations = inRange(reservations);
  const rPaid = rReservations.filter((r) => r.status === "paid").length;
  const visits = visitsRes.count ?? 0;

  const perf = {
    visits,
    leads: rLeads.length,
    leadCR: pct(rLeads.length, visits),
    checkouts: rReservations.length,
    checkoutCR: pct(rReservations.length, visits),
    paid: rPaid,
    paidCR: pct(rPaid, visits),
    leadToPurchase: pct(rPaid, rLeads.length),
  };

  // --- Daily signup bars (chart caps at 30 bars) ---
  const chartBars = Math.min(rangeDef.days ?? 30, 30);
  const days: DashboardData["days"] = [];
  const now = new Date();
  for (let i = chartBars - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    days.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      count: 0,
    });
  }
  const dayIndex = new Map(days.map((d, i) => [d.key, i]));
  for (const lead of leads) {
    const idx = dayIndex.get(lead.created_at.slice(0, 10));
    if (idx !== undefined) days[idx].count++;
  }

  // --- Sources within range ---
  const sourceCounts = new Map<string, number>();
  for (const lead of rLeads) {
    const s = lead.source ?? "unknown";
    sourceCounts.set(s, (sourceCounts.get(s) ?? 0) + 1);
  }
  const sources = [...sourceCounts.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  return {
    range: rangeDef.key,
    rangeLabel: rangeDef.label,
    totalLeads,
    started,
    paid,
    refunded,
    revenueCents,
    pendingRevenueCents: started * RESERVATION_AMOUNT_CENTS,
    leadToCheckoutPct: totalLeads > 0 ? Math.round((totalCheckout / totalLeads) * 100) : null,
    checkoutToPaidPct: totalCheckout > 0 ? Math.round((paid / totalCheckout) * 100) : null,
    perf,
    days,
    chartLabel:
      rangeDef.key === "all" ? "last 30 days" : rangeDef.label.toLowerCase(),
    sources,
    recentLeads: leads.slice(0, 8),
    recentReservations: reservations.slice(0, 8),
    stripeLive: Boolean(process.env.STRIPE_SECRET_KEY),
    ghlLive: Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
  };
}
