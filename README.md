# Adam Reflects

The home for everything Adam's built with AI — tools, games, business case
studies, and honest experiments. Built with Next.js.

## What's inside

- `lib/builds.js` — **the one file to edit.** Every build's content, the
  timeline, and category descriptions live here as plain data. Add a new
  build, change a status, fix a typo — all in this one place.
- `app/globals.css` — all styling (the brass & paper design system).
- `app/page.js` — homepage.
- `app/[category]/page.js` — category pages (AI Tools, Health & Life, etc.)
  generated automatically from `CATEGORIES` in builds.js.
- `app/build/[slug]/page.js` — one page per build, generated automatically
  from `BUILDS` in builds.js.
- `app/timeline/page.js` — the month-by-month proof-of-work timeline.
- `app/start-here/page.js` — the new-to-Claude guide.
- `components/Shared.js` — reusable pieces (header, footer, cards, status
  pills, flowcharts, tech panels).
- `public/downloads/` — the actual downloadable files (PDFs, templates).
  Anything in here is available at `yoursite.com/downloads/filename`.
- `public/ar-logo.png` — the site mark.

## Adding a new build

Open `lib/builds.js`, find the `BUILDS` array, copy an existing build
object, and edit it. It'll automatically get its own page at
`/build/your-new-id` and appear in its category and (if you add it) the
timeline. No other file needs to change.

## Adding a new download

1. Put the file in `public/downloads/`.
2. In `lib/builds.js`, find the build's `actions` array and add:
   ```js
   { label: "Download the thing", type: "ghost", href: "/downloads/your-file.pdf" }
   ```
3. Deploy. Done.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploying

1. Push this project to a GitHub repo.
2. Go to vercel.com, sign in with GitHub.
3. Import the repo, click Deploy.
4. Vercel gives you a live link (e.g. `adamreflects.vercel.app`) in a
   couple of minutes.
5. Later: buy `adamreflects.ie` and point it at the Vercel deployment
   (Vercel's dashboard walks you through the DNS step).

## Why it's built this way

Every build's content is data, not hand-written HTML — so adding the
15th build is exactly as easy as the 1st. Nothing here can grow into one
giant unmanageable file: the site's code is small (a few hundred KB in
total), and every download is its own small file sitting in `public/`,
completely separate from the site's code. Growing the site over time
won't make it slow or unwieldy to work on.
