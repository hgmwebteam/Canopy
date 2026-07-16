import type { Metadata } from "next";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Funnel Dashboard — The Canopy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }) + " UTC";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-(--dl-text-4)">
      {children}
    </p>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-(--dl-card) p-5 ring-1 ring-(--dl-ring) ${className}`}>
      {children}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-(--dl-text-3)">{label}</span>
      <span className="text-3xl font-semibold tabular-nums text-(--dl-text)">{value}</span>
      {hint && <span className="text-xs text-(--dl-text-4)">{hint}</span>}
    </Card>
  );
}

const statusChip: Record<string, string> = {
  paid: "bg-(--dl-success-bg) text-(--dl-success)",
  started: "bg-(--dl-warning-bg) text-(--dl-warning)",
  refunded: "bg-(--dl-card-2) text-(--dl-text-4) ring-1 ring-(--dl-ring)",
};

export default async function DashboardPage() {
  const d = await getDashboardData();
  const maxDay = Math.max(1, ...d.days.map((x) => x.count));
  const maxSource = Math.max(1, ...d.sources.map((s) => s.count));

  return (
    <div className="doclog min-h-screen bg-(--dl-canvas) p-4 font-sans text-(--dl-text) sm:p-8" data-theme="light">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <SectionLabel>The Canopy · Internal</SectionLabel>
            <h1 className="font-serif text-3xl text-(--dl-text)">Funnel Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={`rounded-full px-3 py-1 ${d.stripeLive ? "bg-(--dl-success-bg) text-(--dl-success)" : "bg-(--dl-warning-bg) text-(--dl-warning)"}`}>
              {d.stripeLive ? "✓ Stripe live" : "⚠ Stripe demo mode"}
            </span>
            <span className={`rounded-full px-3 py-1 ${d.ghlLive ? "bg-(--dl-success-bg) text-(--dl-success)" : "bg-(--dl-warning-bg) text-(--dl-warning)"}`}>
              {d.ghlLive ? "✓ GHL syncing" : "⚠ GHL off"}
            </span>
          </div>
        </header>

        {/* Headline numbers */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Waitlist signups" value={String(d.totalLeads)} hint={`${d.last7d} in the last 7 days`} />
          <Stat label="Checkouts started" value={String(d.started + d.paid + d.refunded)} hint={d.leadToCheckoutPct !== null ? `${d.leadToCheckoutPct}% of waitlist` : undefined} />
          <Stat label="VIPs paid" value={String(d.paid)} hint={d.checkoutToPaidPct !== null ? `${d.checkoutToPaidPct}% of checkouts` : undefined} />
          <Stat label="Revenue collected" value={money(d.revenueCents)} hint={d.pendingRevenueCents > 0 ? `${money(d.pendingRevenueCents)} pending in open checkouts` : undefined} />
        </div>

        {/* Signups chart + sources */}
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <SectionLabel>Waitlist signups — last 14 days</SectionLabel>
            <div className="mt-4 flex h-32 items-end gap-[3px] border-b border-(--dl-ring)">
              {d.days.map((day) => (
                <div
                  key={day.key}
                  className="flex flex-1 flex-col items-center justify-end gap-1"
                  title={`${day.label}: ${day.count} signup${day.count === 1 ? "" : "s"}`}
                >
                  {day.count > 0 && (
                    <span className="text-[10px] tabular-nums text-(--dl-text-4)">{day.count}</span>
                  )}
                  <div
                    className="w-full rounded-t-[4px] bg-(--dl-brand)"
                    style={{ height: `${Math.max(day.count > 0 ? 6 : 2, (day.count / maxDay) * 96)}px`, opacity: day.count > 0 ? 1 : 0.15 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-(--dl-text-4)">
              <span>{d.days[0].label}</span>
              <span>{d.days[d.days.length - 1].label}</span>
            </div>
          </Card>

          <Card>
            <SectionLabel>Signups by source</SectionLabel>
            {d.sources.length === 0 ? (
              <p className="text-sm text-(--dl-text-4)">No signups yet.</p>
            ) : (
              <ul className="mt-2 flex flex-col gap-3">
                {d.sources.map((s) => (
                  <li key={s.source}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-(--dl-text-2)">{s.source}</span>
                      <span className="tabular-nums text-(--dl-text-3)">{s.count}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-(--dl-card-2)">
                      <div
                        className="h-2 rounded-full bg-(--dl-brand)"
                        style={{ width: `${(s.count / maxSource) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Recent activity */}
        <div className="grid gap-3 lg:grid-cols-2">
          <Card>
            <SectionLabel>Latest reservations</SectionLabel>
            {d.recentReservations.length === 0 ? (
              <p className="text-sm text-(--dl-text-4)">No reservations yet.</p>
            ) : (
              <ul className="divide-y divide-(--dl-ring)">
                {d.recentReservations.map((r, i) => (
                  <li key={`${r.email}-${i}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-(--dl-text)">{r.full_name || r.email}</p>
                      <p className="truncate text-xs text-(--dl-text-4)">{r.email} · {when(r.created_at)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="tabular-nums text-(--dl-text-3)">{money(r.amount_cents ?? 0)}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusChip[r.status] ?? statusChip.refunded}`}>
                        {r.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <SectionLabel>Latest signups</SectionLabel>
            {d.recentLeads.length === 0 ? (
              <p className="text-sm text-(--dl-text-4)">No signups yet.</p>
            ) : (
              <ul className="divide-y divide-(--dl-ring)">
                {d.recentLeads.map((lead, i) => (
                  <li key={`${lead.email}-${i}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="truncate text-(--dl-text-2)">{lead.email}</span>
                    <span className="shrink-0 text-xs text-(--dl-text-4)">
                      {lead.source ?? "—"} · {when(lead.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <footer className="pb-4 text-center text-xs text-(--dl-text-4)">
          Live from Supabase · refresh for latest · <a className="underline" href="/log">project log</a> · times in UTC
        </footer>
      </div>
    </div>
  );
}
