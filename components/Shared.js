// components/Shared.js
// Reusable pieces used across the site: header, footer, status pills,
// build cards, the flowchart widget, and the "how it's built" tech panel.
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "../lib/builds";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/start-here", label: "Start Here" },
  { href: "/timeline", label: "Timeline" },
  { href: "/ai", label: "AI Tools" },
  { href: "/health", label: "Health & Life" },
  { href: "/games", label: "Games" },
  { href: "/business", label: "Business" },
  { href: "/lab", label: "Hobbies" },
];

export function Topbar() {
  const pathname = usePathname();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          <span className="mark" />
          Adam Reflects
        </Link>
        <nav className="tabs">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="brand">
          <span className="mark" />
          Adam Reflects
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
          <p>
            Built between customers, in a jewellers in Cork. ·{" "}
            <a
              href="mailto:bellejewellerycork@gmail.com"
              style={{ color: "var(--brass-deep)", fontWeight: 600 }}
            >
              bellejewellerycork@gmail.com
            </a>
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="https://instagram.com/adamreflects"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: "#8A642C", textDecoration: "none", display: "inline-flex" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://x.com/adamreflects"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              style={{ color: "#8A642C", textDecoration: "none", display: "inline-flex" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.72 6.23 5.44-6.23Zm-1.16 17.52h1.83L7.02 4.12H5.05l12.03 15.65Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const STATUS_MAP = {
  ready: ["ready", "Ready"],
  wip: ["wip", "Work in progress"],
  mine: ["mine", "This one's mine"],
  paused: ["paused", "Parked"],
  done: ["ready", "Done"],
};

export function StatusPill({ status }) {
  const [cls, label] = STATUS_MAP[status] || STATUS_MAP.ready;
  return (
    <span className={`status ${cls}`}>
      <span className="dot" />
      {label}
    </span>
  );
}

export function TimelineChip({ status }) {
  const [cls, label] = STATUS_MAP[status] || STATUS_MAP.ready;
  return (
    <span className={`tl-chip ${cls}`}>
      <span className="dot" />
      {label}
    </span>
  );
}

export function BuildCard({ build }) {
  return (
    <Link href={`/build/${build.id}`} className="card">
      <div className="card-top">
        <div>
          <div className="kicker">{build.kicker}</div>
          <h3>{build.name}</h3>
        </div>
        <StatusPill status={build.status} />
      </div>
      <p>{build.card}</p>
      <div className="card-foot">
        <span className="card-cta">Read the story →</span>
      </div>
    </Link>
  );
}

export function CategoryGrid({ cat, builds }) {
  const c = CATEGORIES[cat];
  const items = builds.filter((b) => b.cat === cat);
  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="section-head">
        <h2>{c.title}</h2>
        <span className="count">{c.count}</span>
      </div>
      <p className="section-note">{c.note}</p>
      <div className="grid">
        {items.map((b) => (
          <BuildCard key={b.id} build={b} />
        ))}
      </div>
    </section>
  );
}

export function Flow({ title, steps }) {
  return (
    <div className="flow-wrap">
      <div className="flow-title">{title}</div>
      <div className="flow">
        {steps.map((s, i) => (
          <div className="flow-step" key={i}>
            <div className="flow-node">
              <div className="n-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="n-text">{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="flow-arrow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12h15M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechPanel({ tech }) {
  if (!tech) return null;
  return (
    <div className="techbox">
      <div className="tech-label">How it's built · the tools behind it</div>
      {tech.map((t, i) => (
        <div className="tech-row" key={i}>
          <div className="tech-name">
            {t.url ? (
              <a href={t.url} target="_blank" rel="noreferrer">
                {t.t} <span className="tech-ext">↗</span>
              </a>
            ) : (
              t.t
            )}
            <span className="tech-cost">{t.cost}</span>
          </div>
          <div className="tech-why">{t.why}</div>
        </div>
      ))}
    </div>
  );
}

export function ActionButtons({ actions }) {
  return (
    <div className="detail-actions">
      {actions.map((a, i) => {
        if (a.type === "locked") {
          return (
            <span className="btn locked" key={i}>
              {a.label}
            </span>
          );
        }
        if (a.href) {
          return (
            <a
              className={`btn ${a.type}`}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              {a.label} →
            </a>
          );
        }
        return (
          <span className="btn locked" key={i}>
            {a.label} (coming soon)
          </span>
        );
      })}
    </div>
  );
}
