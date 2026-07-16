import { getSupabaseServer } from "@/lib/supabase";
import { RESERVATION_AMOUNT_CENTS } from "@/lib/config";

export type DashboardData = {
  totalLeads: number;
  started: number;
  paid: number;
  refunded: number;
  revenueCents: number;
  pendingRevenueCents: number;
  leadToCheckoutPct: number | null;
  checkoutToPaidPct: number | null;
  last7d: number;
  perf7: {
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

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = getSupabaseServer();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const [leadsRes, reservationsRes, leadCountRes, visits7Res] = await Promise.all([
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
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .eq("path", "/")
      .gte("created_at", sevenDaysAgo),
  ]);

  const leads = leadsRes.data ?? [];
  const reservations = reservationsRes.data ?? [];
  const totalLeads = leadCountRes.count ?? leads.length;

  const paidRows = reservations.filter((r) => r.status === "paid");
  const started = reservations.filter((r) => r.status === "started").length;
  const refunded = reservations.filter((r) => r.status === "refunded").length;
  const paid = paidRows.length;
  const revenueCents = paidRows.reduce(
    (sum, r) => sum + (r.amount_cents ?? RESERVATION_AMOUNT_CENTS),
    0
  );
  const pendingRevenueCents = started * RESERVATION_AMOUNT_CENTS;

  // Last 14 days of signups (UTC buckets).
  const days: DashboardData["days"] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    const key = d.toISOString().slice(0, 10);
    days.push({
      key,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      count: 0,
    });
  }
  const dayIndex = new Map(days.map((d, i) => [d.key, i]));
  for (const lead of leads) {
    const key = lead.created_at.slice(0, 10);
    const idx = dayIndex.get(key);
    if (idx !== undefined) days[idx].count++;
  }
  const last7d = days.slice(-7).reduce((sum, d) => sum + d.count, 0);

  const sourceCounts = new Map<string, number>();
  for (const lead of leads) {
    const s = lead.source ?? "unknown";
    sourceCounts.set(s, (sourceCounts.get(s) ?? 0) + 1);
  }
  const sources = [...sourceCounts.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  const totalCheckout = started + paid + refunded;

  // Last-7-days performance (LaunchBoom-style card row).
  const visits7 = visits7Res.count ?? 0;
  const leads7 = leads.filter((l) => l.created_at >= sevenDaysAgo).length;
  const res7 = reservations.filter((r) => r.created_at >= sevenDaysAgo);
  const checkouts7 = res7.length;
  const paid7 = res7.filter((r) => r.status === "paid").length;
  const pct = (num: number, den: number) =>
    den > 0 ? Math.round((num / den) * 10000) / 100 : null;
  const perf7 = {
    visits: visits7,
    leads: leads7,
    leadCR: pct(leads7, visits7),
    checkouts: checkouts7,
    checkoutCR: pct(checkouts7, visits7),
    paid: paid7,
    paidCR: pct(paid7, visits7),
    leadToPurchase: pct(paid7, leads7),
  };

  return {
    perf7,
    totalLeads,
    started,
    paid,
    refunded,
    revenueCents,
    pendingRevenueCents,
    leadToCheckoutPct: totalLeads > 0 ? Math.round((totalCheckout / totalLeads) * 100) : null,
    checkoutToPaidPct: totalCheckout > 0 ? Math.round((paid / totalCheckout) * 100) : null,
    last7d,
    days,
    sources,
    recentLeads: leads.slice(0, 8),
    recentReservations: reservations.slice(0, 8),
    stripeLive: Boolean(process.env.STRIPE_SECRET_KEY),
    ghlLive: Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
  };
}
