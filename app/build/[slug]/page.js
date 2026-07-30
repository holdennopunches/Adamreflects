import Link from "next/link";
import { notFound } from "next/navigation";
import { BUILDS, CATEGORIES } from "../../../lib/builds";
import {
  StatusPill,
  Flow,
  TechPanel,
  ActionButtons,
} from "../../../components/Shared";

export function generateStaticParams() {
  return BUILDS.map((b) => ({ slug: b.id }));
}

export function generateMetadata({ params }) {
  const b = BUILDS.find((x) => x.id === params.slug);
  if (!b) return {};
  return { title: `${b.name} — Adam Reflects` };
}

function Block({ block }) {
  if (block.list) {
    return (
      <div className="block" style={{ marginTop: -20 }}>
        <ul>
          {block.list.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="block">
      {block.label && <div className="block-label">{block.label}</div>}
      {block.h && <h3>{block.h}</h3>}
      {(block.p || []).map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      {block.honest && (
        <div className="honest">
          <p>&ldquo;{block.honest}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

export default function BuildDetailPage({ params }) {
  const b = BUILDS.find((x) => x.id === params.slug);
  if (!b) notFound();

  const idx = BUILDS.findIndex((x) => x.id === b.id);
  const prev = BUILDS[(idx - 1 + BUILDS.length) % BUILDS.length];
  const next = BUILDS[(idx + 1) % BUILDS.length];

  return (
    <div className="detail">
      <Link href={`/${b.cat}`} className="back">
        ← Back to {CATEGORIES[b.cat].title}
      </Link>

      <div className="detail-head">
        <div className="detail-kicker">
          <span>{b.kicker}</span>
          <StatusPill status={b.status} />
        </div>
        <h1>{b.name}</h1>
        <p className="detail-summary">{b.summary}</p>
        <ActionButtons actions={b.actions} />
      </div>

      <div className="detail-body">
        <div className="facts">
          {b.facts.map((f, i) => (
            <div className="fact" key={i}>
              <div className="k">{f.k}</div>
              <div className="v">{f.v}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 26 }} />

        {b.flow && <Flow title="How it works, start to finish" steps={b.flow} />}
        {b.flow2 && (
          <>
            <div style={{ height: 16 }} />
            <Flow title={b.flow2.title} steps={b.flow2.steps} />
          </>
        )}
        <div style={{ height: 26 }} />

        {b.tech && (
          <>
            <TechPanel tech={b.tech} />
            <div style={{ height: 26 }} />
          </>
        )}

        {b.blocks.map((block, i) => (
          <Block block={block} key={i} />
        ))}

        <div className="nextnav">
          <Link href={`/build/${prev.id}`}>
            <div className="nn-label">← Previous build</div>
            <div className="nn-name">{prev.name}</div>
          </Link>
          <Link href={`/build/${next.id}`} style={{ textAlign: "right" }}>
            <div className="nn-label">Next build →</div>
            <div className="nn-name">{next.name}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
