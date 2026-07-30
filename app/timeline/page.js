"use client";
import { useState } from "react";
import Link from "next/link";
import { TIMELINE } from "../../lib/builds";
import { TimelineChip } from "../../components/Shared";

function CaretIcon() {
  return (
    <svg
      className="tl-caret"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MonthBlock({ month, isOpen, onToggle }) {
  const statuses = [...new Set(month.items.map((i) => i.status))];
  return (
    <div className={`tl-month${isOpen ? " open" : ""}`}>
      <button className="tl-month-btn" onClick={onToggle}>
        <span className="tl-m-left">
          <span className="tl-m-name">{month.month}</span>
          <span className="tl-m-sub">
            {month.sub} · {month.items.length} builds
          </span>
        </span>
        <span className="tl-m-tags">
          {statuses.map((s) => (
            <TimelineChip key={s} status={s} />
          ))}
          <CaretIcon />
        </span>
      </button>
      <div className="tl-panel">
        <div className="tl-items">
          {month.items.map((it, i) =>
            it.build ? (
              <Link href={`/build/${it.build}`} className="tl-item" key={i}>
                <div className="tl-item-top">
                  <h4>{it.name}</h4>
                  <TimelineChip status={it.status} />
                </div>
                <p>{it.desc}</p>
                <span className="tl-cta">Read the story →</span>
              </Link>
            ) : (
              <div className="tl-item static" key={i}>
                <div className="tl-item-top">
                  <h4>{it.name}</h4>
                  <TimelineChip status={it.status} />
                </div>
                <p>{it.desc}</p>
                <span className="tl-cta" style={{ color: "var(--grey)" }}>
                  One-off job
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      <section className="tl-intro">
        <div className="hero-eyebrow">Proof of work · month by month</div>
        <h1>
          Everything I&apos;ve built, <em>in order</em>.
        </h1>
        <p>
          Click a month to open it. Every card is a real thing made in a
          small shop&apos;s quiet hours — some finished, some still cooking,
          some parked. Tap any card with a story to read the full account.
        </p>
        <div className="tl-legend">
          <span>
            <span className="dot" style={{ background: "var(--green)" }} />{" "}
            Ready / done
          </span>
          <span>
            <span className="dot" style={{ background: "var(--amber)" }} />{" "}
            In progress
          </span>
          <span>
            <span
              className="dot"
              style={{ background: "var(--brass-deep)" }}
            />{" "}
            Mine to grow
          </span>
          <span>
            <span className="dot" style={{ background: "var(--grey)" }} />{" "}
            Parked
          </span>
        </div>
      </section>

      <section className="tl-wrap">
        {TIMELINE.map((m, i) => (
          <MonthBlock
            key={i}
            month={m}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </section>
    </div>
  );
}
