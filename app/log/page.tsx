import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Log — The Canopy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

/** Minimal markdown rendering for the changelog: headings, bullets, paragraphs, bold/code/links. */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-navy/10 px-1 py-0.5 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} className="text-copper underline">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export default function LogPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "docs", "PROJECT-LOG.md"),
    "utf-8"
  );
  const blocks = md.split("\n");

  return (
    <main className="flex flex-1 justify-center bg-cream px-6 py-16">
      <article className="w-full max-w-2xl">
        {blocks.map((line, i) => {
          if (line.startsWith("# ")) {
            return (
              <h1 key={i} className="font-serif text-3xl text-navy">
                {renderInline(line.slice(2))}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="mt-10 border-t border-navy/15 pt-8 font-serif text-2xl text-navy"
              >
                {renderInline(line.slice(3))}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={i} className="mt-6 font-serif text-lg font-bold text-navy">
                {renderInline(line.slice(4))}
              </h3>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="ml-5 mt-2 list-disc text-ink/85">
                {renderInline(line.slice(2))}
              </li>
            );
          }
          if (line.trim() === "") return null;
          return (
            <p key={i} className="mt-3 text-ink/85">
              {renderInline(line)}
            </p>
          );
        })}
      </article>
    </main>
  );
}
