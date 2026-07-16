"use client";

import { useEffect, useState } from "react";
import {
  entries,
  linkGroups,
  milestones,
  project,
  waitingOn,
  type LogEntry,
  type Milestone,
} from "@/docs/project-log";

/* ---------- tiny building blocks (Untitled UI style) ---------- */

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 800;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3)))); // easeOut
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-(--dl-text-4)">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`dl-fade rounded-2xl bg-(--dl-card) p-5 ring-1 ring-(--dl-ring) ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const tints = {
  brand: "bg-(--dl-brand-bg) text-(--dl-brand)",
  success: "bg-(--dl-success-bg) text-(--dl-success)",
  warning: "bg-(--dl-warning-bg) text-(--dl-warning)",
} as const;

function StatTile({
  label,
  value,
  suffix,
  tint,
  icon,
  delay,
}: {
  label: string;
  value: number;
  suffix?: string;
  tint: keyof typeof tints;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <Card delay={delay} className="flex flex-col gap-3">
      <span className="flex items-center gap-2.5">
        <span className={`flex size-8 items-center justify-center rounded-lg ${tints[tint]}`}>
          {icon}
        </span>
        <span className="text-sm font-medium text-(--dl-text-3)">{label}</span>
      </span>
      <span className="text-3xl font-semibold text-(--dl-text)">
        <CountUp value={value} />
        {suffix}
      </span>
    </Card>
  );
}

/* ---------- inline icons (stroke style, like Untitled UI) ---------- */

const ic = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v18" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
};

/* ---------- sections ---------- */

const milestoneStyles: Record<Milestone["status"], { pill: string; label: string }> = {
  done: { pill: tints.success, label: "Done" },
  active: { pill: tints.brand, label: "In progress" },
  pending: { pill: "bg-(--dl-card-2) text-(--dl-text-4) ring-1 ring-(--dl-ring)", label: "Up next" },
};

function MilestoneRow({ m }: { m: Milestone }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="flex items-center gap-2.5 text-sm text-(--dl-text-2)">
        <span
          className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
            m.status === "done" ? tints.success : "bg-(--dl-card-2) ring-1 ring-(--dl-ring)"
          }`}
        >
          {m.status === "done" ? ic.check : null}
        </span>
        {m.label}
      </span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${milestoneStyles[m.status].pill}`}
      >
        {milestoneStyles[m.status].label}
      </span>
    </li>
  );
}

function EntryBlock({ entry, last }: { entry: LogEntry; last: boolean }) {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full bg-(--dl-brand-bg)">
        <span className="size-1.5 rounded-full bg-(--dl-brand)" />
      </span>
      {!last && (
        <span className="absolute bottom-0 left-2 top-6 w-px -translate-x-1/2 bg-(--dl-ring)" />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-(--dl-brand-bg) px-2.5 py-0.5 text-[11px] font-semibold text-(--dl-brand)">
          {entry.version}
        </span>
        <span className="text-xs font-medium text-(--dl-text-4)">{entry.date}</span>
      </div>
      <h3 className="mt-1.5 text-sm font-semibold text-(--dl-text)">{entry.title}</h3>
      <ul className="mb-8 mt-2 flex flex-col gap-1.5">
        {entry.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-(--dl-text-3)">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-(--dl-text-4)" />
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ---------- page ---------- */

export default function LogView() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("dl-theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dl-theme", next);
  };

  const done = milestones.filter((m) => m.status === "done").length;

  return (
    <div className="doclog min-h-screen bg-(--dl-canvas) font-sans text-(--dl-text)" data-theme={theme}>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* header */}
        <header className="dl-fade mb-8 flex items-start justify-between gap-4">
          <div>
            <SectionLabel>Hidden Gem Media · Project Log</SectionLabel>
            <h1 className="text-2xl font-semibold tracking-tight text-(--dl-text)">
              {project.name} <span className="font-normal text-(--dl-text-4)">— {project.client}</span>
            </h1>
            <a
              href={project.liveUrl}
              className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-(--dl-brand) hover:underline"
            >
              {project.liveUrl.replace("https://", "")} {ic.external}
            </a>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-(--dl-card) text-(--dl-text-3) ring-1 ring-(--dl-ring) transition hover:text-(--dl-text)"
          >
            {theme === "dark" ? ic.sun : ic.moon}
          </button>
        </header>

        {/* stat tiles */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Funnel steps live" value={4} tint="brand" icon={ic.layers} delay={0} />
          <StatTile label="Updates logged" value={entries.length} tint="brand" icon={ic.pulse} delay={50} />
          <StatTile label="Milestones done" value={done} suffix={`/${milestones.length}`} tint="success" icon={ic.flag} delay={100} />
          <StatTile label="Waiting on" value={waitingOn.length} tint="warning" icon={ic.clock} delay={150} />
        </div>

        {/* overview */}
        <Card delay={200} className="mb-6">
          <SectionLabel>Overview</SectionLabel>
          <p className="text-sm leading-relaxed text-(--dl-text-3)">{project.overview}</p>
        </Card>

        {/* project links */}
        <Card delay={225} className="mb-6">
          <SectionLabel>Project links</SectionLabel>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-(--dl-text-4)">
                  {group.title}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {group.links.map((link) => (
                    <li key={link.href} className="text-sm leading-6">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-(--dl-brand) hover:underline"
                      >
                        {link.label}
                      </a>
                      {link.note && (
                        <span className="text-(--dl-text-4)"> — {link.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* milestones + waiting on */}
        <div className="mb-6 grid gap-3 md:grid-cols-2">
          <Card delay={250}>
            <SectionLabel>Milestones</SectionLabel>
            <ul className="divide-y divide-(--dl-ring)">
              {milestones.map((m) => (
                <MilestoneRow key={m.label} m={m} />
              ))}
            </ul>
          </Card>
          <Card delay={300}>
            <SectionLabel>Waiting on client / team</SectionLabel>
            <ul className="flex flex-col gap-2.5">
              {waitingOn.map((w) => (
                <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-(--dl-text-3)">
                  <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${tints.warning}`}>
                    {ic.clock}
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* update timeline */}
        <Card delay={350}>
          <SectionLabel>Updates</SectionLabel>
          <ul className="mt-4">
            {entries.map((entry, i) => (
              <EntryBlock key={entry.version} entry={entry} last={i === entries.length - 1} />
            ))}
          </ul>
        </Card>

        <p className="dl-fade mt-8 text-center text-xs text-(--dl-text-4)" style={{ animationDelay: "400ms" }}>
          Internal project log · not indexed · updated every working session
        </p>
      </div>
    </div>
  );
}
