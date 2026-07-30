import Link from "next/link";

export const metadata = { title: "Start Here — Adam Reflects" };

export default function StartHerePage() {
  return (
    <div>
      <section className="sh-hero">
        <div className="hero-eyebrow">New to Claude? · start here</div>
        <h1>
          The <em>first moves</em> that actually matter.
        </h1>
        <p>
          I wasted time fiddling with settings when I started. Here&apos;s
          what I&apos;d tell a friend on day one — two short guides, five
          minutes each, and you&apos;re further along than most people ever
          get.
        </p>
      </section>

      <section className="sh-wrap">
        <div className="sh-guide">
          <div className="sh-guide-head">
            <div className="g-kicker">Guide 01</div>
            <h2>First 3 things to do on Claude</h2>
            <p>
              Before you build anything, set these up once. They save you
              from repeating yourself in every future chat.
            </p>
          </div>

          <div className="sh-step">
            <div className="sh-num">1</div>
            <div className="sh-body">
              <h3>Write &amp; paste in a Personal Constitution</h3>
              <p>
                Give Claude a short set of instructions about who you are
                and what you value. <strong>It learns you upfront</strong> —
                no back-and-forth explaining yourself later. It saves time
                from your very first chat.
              </p>
              <p>
                <Link href="/build/promptforge" className="inline-link">
                  See how I built mine with the Constitution Builder →
                </Link>
              </p>
            </div>
          </div>

          <div className="sh-step">
            <div className="sh-num">2</div>
            <div className="sh-body">
              <h3>Turn on &quot;Generate memory from chat history&quot;</h3>
              <p>
                <strong>Zero cost, passive learning.</strong> Claude
                automatically pulls relevant context from your past chats
                without you asking. You flip it on once and it just works
                in the background.
              </p>
              <div className="sh-screenshot">
                📎 Screenshot: Settings → toggle &quot;Generate memory from
                chat history&quot;
              </div>
            </div>
          </div>

          <div className="sh-step">
            <div className="sh-num">3</div>
            <div className="sh-body">
              <h3>Stop fiddling with settings — actually build something</h3>
              <p>
                Don&apos;t bother with &quot;Search &amp; reference
                chats&quot; yet (no history to search). Don&apos;t import
                from other AIs unless you&apos;ve got substantial ChatGPT
                work you actively reference.{" "}
                <strong>Settings matter less than momentum.</strong>
              </p>
              <p>
                You can import your other AI history later. For now, pick a
                real project and start. Exploring beats configuring.
              </p>
            </div>
          </div>
        </div>

        <div className="sh-guide">
          <div className="sh-guide-head">
            <div className="g-kicker">Guide 02</div>
            <h2>Top 4 things on how to prompt correctly</h2>
            <p>
              Prompting is everything. AI can only work with what you give
              it — <strong>crappy input, crappy output; quality input,
              quality output.</strong> A vague ask gets a vague answer, and
              it&apos;s not the AI&apos;s fault. Here are the top 4 ways to
              improve your prompting. And if you get stuck, you can use my{" "}
              <Link href="/build/promptforge" className="inline-link">
                PromptForge creator
              </Link>{" "}
              to score your prompt and show you exactly what to fix.
            </p>
          </div>

          <div className="sh-step">
            <div className="sh-num">1</div>
            <div className="sh-body">
              <h3>Write a specific goal</h3>
              <p>
                &quot;Create a 500-word blog post about sterling silver care
                for DIY jewellery makers&quot; — not &quot;write about
                silver.&quot; <strong>Specificity is everything.</strong>{" "}
                The more precise the goal, the closer the first answer
                lands. This is the foundation the rest sits on.
              </p>
            </div>
          </div>

          <div className="sh-step">
            <div className="sh-num">2</div>
            <div className="sh-body">
              <h3>Paste an example of what you want</h3>
              <p>
                One sample paragraph, email or output you like teaches the
                AI more than ten rules ever could.{" "}
                <strong>
                  It gives the AI the context and information it needs to
                  get the job done right
                </strong>{" "}
                — the tone, the shape, the level of detail — instead of
                guessing. Find something close and paste it in.
              </p>
            </div>
          </div>

          <div className="sh-step">
            <div className="sh-num">3</div>
            <div className="sh-body">
              <h3>Add avoid rules</h3>
              <p>
                &quot;No jargon.&quot; &quot;No generic filler.&quot;
                &quot;Don&apos;t repeat the question back.&quot; Two or
                three constraints —{" "}
                <strong>
                  what you don&apos;t want is often more powerful than what
                  you do.
                </strong>{" "}
                It steers the AI away from the usual filler before it
                starts.
              </p>
            </div>
          </div>

          <div className="sh-step">
            <div className="sh-num">4</div>
            <div className="sh-body">
              <span className="sh-plus">
                Power-up: Ask me questions first
              </span>
              <h3>Toggle &quot;Ask me questions first&quot;</h3>
              <p>
                If you only do one extra thing, do this one. The AI asks
                clarifying questions before it starts, tailors the answer
                to your real need, and{" "}
                <strong>the result is often twice as good.</strong> It
                takes one toggle.
              </p>
            </div>
          </div>

          <p className="sh-payoff">
            Get these four right and you&apos;ll produce dramatically
            better results than most people ever get from AI — in a few
            minutes, not hours.
          </p>
          <p style={{ marginTop: 14 }}>
            <Link href="/build/promptforge" className="inline-link">
              Try it all live in PromptForge →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
