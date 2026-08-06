import ProCounter from "../components/ProCounter";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-eyebrow">Cork · jeweller · curious builder</div>
        <h1>
          I run a small shop. In the quiet hours, I <em>build things</em>{" "}
          with AI.
        </h1>
        <p className="hero-lead">
          I&apos;m Adam — a jeweller in Cork, a husband, and a father of
          three. I&apos;m no coder and nothing about me is technical. But I
          got curious about what&apos;s possible with AI, and I started
          building. Tools, games, little experiments. Most of it made
          between customers, behind the counter.
        </p>
        <p className="hero-lead secondary">
          This is where I share it all. Some of it works, some of it&apos;s
          half-finished, some I only ever made for myself. I&apos;m putting
          it out to keep myself accountable, to learn out loud, and in case
          any of it is useful to someone like me — someone doing their best
          with the time and tools they have.
        </p>
        <div className="hero-meta">
          <a href="https://instagram.com/adamreflects" target="_blank" rel="noreferrer">
            Follow along on Instagram →
          </a>
          <a href="https://x.com/adamreflects" target="_blank" rel="noreferrer">
            Find me on X →
          </a>
          <a href="mailto:bellejewellerycork@gmail.com">
            Say hello by email →
          </a>
        </div>
      </section>

      <section className="counter">
        <div className="counter-inner">
          <div>
            <div className="counter-label">The experiment so far</div>
            <h3>
              Everything here has been built since I got Claude Pro.
              That&apos;s how long I&apos;ve been at this.
            </h3>
          </div>
          <ProCounter />
        </div>
      </section>

      <section className="section" id="about">
        <div className="about">
          <div>
            <h2>Why I&apos;m doing this</h2>
            <p>
              I own a jewellers in Cork. Like a lot of small businesses, the
              days are full — but there are pockets of quiet, and I&apos;ve
              decided to spend them learning instead of scrolling.
            </p>
            <p>
              Everything here was built in that in-between time: mostly at
              the counter, in between serving customers, on my own hours.{" "}
              <strong>I&apos;m not trying to be an expert.</strong> I&apos;m
              an inquisitive person who enjoys making things that might turn
              out useful — and, honestly, things that might one day earn
              quietly in the background so I can spend more time with my
              family.
            </p>
            <p>
              I&apos;m sharing it for two reasons. To{" "}
              <strong>hold myself accountable</strong> — putting it in
              public makes me keep going. And to{" "}
              <strong>show people like me</strong> — not coders, not
              techies, just curious — what&apos;s actually possible now if
              you&apos;re willing to try.
            </p>
            <p>
              If something here helps you, take it and make it your own.
              If you&apos;ve a question, my inbox is open.
            </p>
          </div>
          <div className="about-side">
            <h4>The ledger</h4>
            <ul>
              <li><span>Things built</span><span>17</span></li>
              <li><span>Ready to use</span><span>11</span></li>
              <li><span>Still cooking</span><span>3</span></li>
              <li><span>Parked (learned plenty)</span><span>1</span></li>
              <li><span>Just for me</span><span>2</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>What the labels mean</h2>
        </div>
        <div className="legend">
          <span>
            <span className="dot" style={{ background: "var(--green)" }} />{" "}
            <strong>Ready</strong> — works, use it freely
          </span>
          <span>
            <span className="dot" style={{ background: "var(--amber)" }} />{" "}
            <strong>Work in progress</strong> — usable, still improving
          </span>
          <span>
            <span className="dot" style={{ background: "var(--brass-deep)" }} />{" "}
            <strong>This one&apos;s mine</strong> — shared to show, not to
            take
          </span>
          <span>
            <span className="dot" style={{ background: "var(--grey)" }} />{" "}
            <strong>Parked</strong> — did what I needed, learned plenty
          </span>
        </div>
        <p className="section-note">
          Pick a tab up top to browse by category, or click any build to
          read the full story — why I made it, what went wrong, how it
          actually works, and how you can make your own. Everything
          downloadable comes as a blank template. None of my real details
          ever travel with it.
        </p>
      </section>
    </div>
  );
}
