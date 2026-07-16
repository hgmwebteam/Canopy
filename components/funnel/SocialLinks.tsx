import { SOCIAL } from "@/lib/config";

/**
 * Facebook group + Instagram icon buttons (brand glyphs, fill: currentColor).
 * tone="dark" renders cream-on-navy (dark bands); tone="light" navy-on-cream.
 */
export default function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const circle =
    tone === "dark"
      ? "border-cream/30 text-cream hover:border-copper hover:bg-copper hover:text-white"
      : "border-navy/25 text-navy hover:border-copper hover:bg-copper hover:text-white";

  const links = [
    {
      href: SOCIAL.facebookGroup,
      label: "Join our Facebook group",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
          <path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.6-1.6h1.4V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3Z" />
        </svg>
      ),
    },
    {
      href: SOCIAL.instagram,
      label: "Follow us on Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
          <path d="M12 4.4c2.5 0 2.8 0 3.8.05 1 .05 1.5.2 1.9.35.5.18.8.4 1.2.77.36.37.6.72.77 1.2.14.36.3.9.34 1.88.05 1 .06 1.3.06 3.8s0 2.8-.06 3.8c-.05 1-.2 1.5-.34 1.9-.18.47-.4.82-.78 1.2-.37.36-.72.6-1.2.76-.36.14-.9.3-1.88.35-1 .04-1.3.05-3.8.05s-2.8 0-3.8-.05c-1-.05-1.5-.2-1.9-.35a3.2 3.2 0 0 1-1.2-.77 3.2 3.2 0 0 1-.76-1.2c-.14-.36-.3-.9-.35-1.88-.04-1-.05-1.3-.05-3.8s0-2.8.05-3.8c.05-1 .2-1.5.35-1.9.17-.47.4-.82.77-1.2.37-.36.72-.6 1.2-.76.36-.14.9-.3 1.88-.35 1-.04 1.3-.05 3.8-.05M12 2.7c-2.5 0-2.85.01-3.85.06-1 .04-1.68.2-2.28.43-.62.24-1.14.56-1.66 1.08A4.6 4.6 0 0 0 3.13 5.9c-.23.6-.4 1.28-.44 2.28C2.64 9.18 2.63 9.5 2.63 12s.01 2.82.06 3.82c.05 1 .2 1.68.44 2.28.24.62.56 1.14 1.08 1.66.52.52 1.04.84 1.66 1.08.6.23 1.28.39 2.28.44 1 .04 1.32.06 3.85.06s2.85-.02 3.85-.06c1-.05 1.68-.2 2.28-.44a4.6 4.6 0 0 0 1.66-1.08c.52-.52.84-1.04 1.08-1.66.23-.6.39-1.28.44-2.28.04-1 .06-1.32.06-3.82s-.02-2.82-.06-3.82c-.05-1-.2-1.68-.44-2.28a4.6 4.6 0 0 0-1.08-1.66 4.6 4.6 0 0 0-1.66-1.08c-.6-.23-1.28-.39-2.28-.44-1-.05-1.32-.06-3.85-.06Z" />
          <path d="M12 7.24a4.76 4.76 0 1 0 0 9.52 4.76 4.76 0 0 0 0-9.52Zm0 7.85a3.1 3.1 0 1 1 0-6.18 3.1 3.1 0 0 1 0 6.18ZM18.06 7.05a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`flex size-11 items-center justify-center rounded-full border transition ${circle}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
