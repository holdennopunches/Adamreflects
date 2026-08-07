// lib/builds.js — single source of truth for all site content.
// Edit this file to add a new build, update a status, or change copy.
// Nothing else in the project needs to change when you add a build here.

const CATEGORIES = {
  ai:      {title:"AI Tools",      count:"03 built",              note:"Tools to help you get more out of AI — mostly built for Claude. Start here if you're new to all this. The first one is the one I'd want a friend to try before anything else."},
  health:  {title:"Health & Life", count:"02 built · more coming",note:"Tools for looking after yourself. Each is a blank template — you add your own numbers and it becomes yours. Nothing of mine is ever inside."},
  games:   {title:"Games",         count:"01 built",              note:"The fun stuff. My first real build, and the one that taught me the most — including when to call something done."},
  business:{title:"Business",      count:"05 · tools & case studies",note:"Tools, guides, and case studies built for my shop — each one transferable. If it worked for a jewellers in Cork, it'll work for your shop too."},
  lab:     {title:"Hobbies",       count:"built for the love of it",note:"Things I built for the fun of it, or just for myself. Some are finished, some never will be — they're here because the trying is the point."}
};

/* flowchart helper: pass array of short step strings */
function flow(title, steps){
  const arrow=`<div class="flow-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
  const nodes=steps.map((s,i)=>{
    const node=`<div class="flow-node"><div class="n-num">${String(i+1).padStart(2,'0')}</div><div class="n-text">${s}</div></div>`;
    return `<div class="flow-step">${node}${i<steps.length-1?arrow:''}</div>`;
  }).join("");
  return `<div class="flow-wrap"><div class="flow-title">${title}</div><div class="flow">${nodes}</div></div>`;
}

/* ================= TIMELINE DATA =================
   Each item: build (id to link into a detail page, or null for static),
   name, status (ready/wip/mine/paused/done), desc.
   status "done" reuses the ready green for one-off finished jobs.        */

const TIMELINE = [
  {
    month:"June 2026", sub:"Where it started",
    note:"Got Claude Pro on the 29th. Set up the foundations — the way I actually work with AI day to day.",
    items:[
      {build:"promptforge", name:"PromptForge + Constitution Builder", status:"ready",
        desc:"A prompt-scoring coach and an interview that writes your personal AI constitution. The first thing I'd hand a friend."},
      {build:"dailyos", name:"My Daily OS", status:"mine",
        desc:"A Claude Project with a morning brief — quote, one focus, an Eisenhower matrix, news and content ideas. Built for me, shared as a template."},
      {build:"fieldguide", name:"The Claude Field Guide", status:"ready",
        desc:"A plain-language reference to models, effort levels, plans, artifacts and projects. The guide I wish I'd had on day one."}
    ]
  },
  {
    month:"July 2026", sub:"The big build sprint",
    note:"A parallel push across all three businesses plus a stack of tools. The busiest month by a mile.",
    items:[
      {build:"bellepos", name:"Belle POS (v3 → v6)", status:"ready",
        desc:"Built my shop's till system from scratch — footfall tracking, CSV export, analytics, wages, password-locked settings. A real working case study."},
      {build:"salesworkbook", name:"Year-on-Year Sales Workbook", status:"ready",
        desc:"52 weekly tabs, a daily report with last-year comparisons, traffic-light formatting and hourly averages. Item Sales tab still to come."},
      {build:"seogeo", name:"Shopify SEO & GEO Sprint", status:"ready",
        desc:"Seven blog posts, rewritten About page, titles and descriptions fixed across 136 products, three FAQ pages with schema. A full search overhaul."},
      {build:"swouch", name:"Swouch — B2B voucher swap", status:"mine",
        desc:"Shop registration, full swap flow with QR codes, admin dashboard, four print-ready PDFs, domain live on Vercel. My own venture, growing now."},
      {build:"kickoff", name:"Kickoff Cards (v22 → v23)", status:"paused",
        desc:"Added a swipe-based penalty mechanic, foul logic and redesigned premium cards. My first real build — parked, but it taught me the most."},
      {build:"marathon", name:"Marathon Trainer", status:"ready",
        desc:"A full training-plan tool built for a friend targeting Dublin Marathon in October. A blank template you drop your own plan into."},
      {build:"longevity", name:"Longevity Dashboard", status:"ready",
        desc:"Turned my blood results into an annotated dashboard with a ranked action plan. A template — you bring your own bloods, none of mine travel with it."},
      {build:"localradar", name:"Local Radar", status:"wip",
        desc:"A Google Business Profile audit and review-monitoring concept for small shops. The most promising of the SaaS ideas I explored."},
      {build:"alexa", name:"Alexa Morning Briefing", status:"wip",
        desc:"Scoped and planned — then stalled for a fortnight waiting on an AWS approval I turned out not to need. Finished in August. Left here because the wrong turn is the useful part."},
      {build:null, name:"OBS Studio setup", status:"done",
        desc:"Set up screen-recording on the Lenovo for Instagram content. A small job, but the thing that made sharing all this possible."}
    ]
  },
  {
    month:"August 2026", sub:"Shipping and tidying",
    items:[
      {name:"Belle Clipper", status:"ready", build:"belleclipper",
        desc:"A local video editor for the shop's social posts — trims the dead air, burns in captions, adds the branding, all on my own PC for nothing. Two steps by design, and I explain why."},
      {name:"Touchline", status:"wip", build:"touchline",
        desc:"A Fantasy Premier League model that rates every player twice a day and shows its working. Built and deployed — but unproven until real results land, so it stays in Hobbies."},
      {name:"Alexa Morning Briefing", status:"ready", build:"alexa",
        desc:"Finished, and not the way I expected. Turned out I never needed the AWS account I'd spent a fortnight waiting on. Now reads the whole house's morning aloud, for nothing a month."},
      {name:"Personal Advisory Board", status:"ready", build:"advisoryboard",
        desc:"A round table of 19 advisors for any decision you bring. Eighteen named voices argue it out in their own words, vote yes / no / maybe, then Claude sums up the consensus and the one risk to watch. Free to download and drop into a Claude Project."}
    ]
  },
  {
    month:"Now & next", sub:"In motion",
    note:"What's live and what I'm actively working on. This is the honest, current picture.",
    items:[
      {build:"website", name:"Adam Reflects (this site)", status:"wip",
        desc:"The home for everything on this page. Marked work-in-progress on purpose — every new build gets added here, so it's never really finished."},
      {build:"localradar", name:"Local Radar — build phase", status:"wip",
        desc:"Moving from concept toward a working tool for small businesses. Still early, shared to keep me honest."},
      {build:"swouch", name:"Swouch — signing up shops", status:"mine",
        desc:"Visiting Cork shops in person to get them on board. Next technical steps: auth, payments and a framework move before any paid tier."},
      {name:"Touchline — waiting on real results", status:"wip", build:"touchline",
        desc:"The model is built and running twice a day. It hasn't been tested against a single real gameweek yet. No live link and no ready badge until it's earned one — revisit around gameweek 5 or 6."}
    ]
  }
];

const BUILDS = [
  /* ---------------- AI TOOLS ---------------- */
  {
    id:"promptforge", cat:"ai", status:"ready", kicker:"Start here",
    name:"PromptForge + Constitution Builder",
    card:"Two things in one. A guided coach that scores your prompts and shows you how to get closer to 100% — plus an interview that writes your own personal AI constitution, so Claude actually knows who you are.",
    summary:"The tool I'd hand a friend before anything else. PromptForge scores your prompt live and tells you exactly what to change to improve it. The Constitution Builder interviews you, then writes a personal constitution so Claude knows who you are and how you want it to work.",
    actions:[{label:"Open PromptForge",type:"primary",href:"/promptforge"},{label:"Download the PromptForge guide (PDF)",type:"ghost",href:"/downloads/PromptForge-Guide.pdf"},{label:"Download the Constitution prompt (PDF)",type:"ghost",href:"/downloads/Personal-Constitution-Prompt.pdf"},{label:"Or grab the plain text",type:"ghost",href:"/downloads/Personal-Constitution-Prompt.txt"}],
    facts:[{k:"Status",v:"Ready to use"},{k:"Built for",v:"Claude"},{k:"Best for",v:"Anyone new to AI"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"React",why:"For the interactive scorer — it updates the score live as you type without reloading the page.",cost:"Free",url:"https://react.dev"},
      {t:"Claude",why:"The brain behind it. The Constitution interview runs entirely inside Claude — no separate service needed.",cost:"Free tier works",url:"https://claude.ai"},
      {t:"Vercel",why:"Where it's hosted. Deploys straight from the code with one click and stays free at this scale.",cost:"Free",url:"https://vercel.com"}
    ],
    flow:["Write your prompt","Get a live 0–100 score","See exactly what's missing","Improve it, watch score climb","Use a prompt that actually works"],
    flow2:{title:"The Constitution Builder — how it works", steps:["Paste the interview prompt into Claude","Claude asks you questions, one at a time","Answer honestly — who you are, your goals, your dos & don'ts","Claude writes your constitution as a file","Save it & paste into Claude's Custom Instructions","Every future chat now knows you"]},
    blocks:[
      {label:"Why I built it",h:"Most people talk to AI like a search box",p:["When I started with Claude I got mediocre answers — because I was writing mediocre prompts. I wanted a tool that gave me the best possible outcome as a <strong>score</strong>, and if the score wasn't high, told me exactly how to get it higher. That's the whole idea: a clear number, and a clear path to improving it.","The back-and-forth is the magic. PromptForge tells you what will move you closer to 100% — a clearer task, better context, the right format, tighter constraints — so you're learning what \"good\" looks like every time you use it, not just guessing."]},
      {label:"The Constitution Builder",h:"Teach Claude who you are, once",p:["This is the part I think helps people most, so let me be clear about how it works.","<strong>Step one:</strong> you paste a detailed interview prompt into Claude. It asks you questions, one by one — who you are, what you do, how you live, your goals, how you like AI to talk to you, your dos and don'ts. The questions are deliberately deep (I based them on my own personal constitution) because shallow questions give shallow results.","<strong>Step two:</strong> once Claude has your answers, it writes a personal constitution for you and saves it as a simple <strong>.md file</strong> for your desktop — I walk you through exactly where to put it and why.","<strong>Step three — and this is the important bit:</strong> you take that constitution and paste it into Claude's <strong>Custom Instructions</strong> (Settings → Profile → Custom Instructions, or the system prompt of a Claude Project). From then on, every conversation starts with Claude already knowing you. No re-explaining yourself every time. It's the single biggest upgrade I've made to how I use AI."],honest:"Writing a good prompt is a skill. Telling the AI who you are, once, so it never forgets — that's a superpower. Most people don't know it's even possible."},
      {label:"What I learned",h:"Honest feedback beats a flattering number",p:["The point was never the score for its own sake. It was making the feedback honest enough to actually change how someone writes their next prompt. A number that only ever goes up teaches nothing. A number that tells you <em>why</em> it's not higher — that teaches."]}
    ]
  },
  {
    id:"fieldguide", cat:"ai", status:"ready", kicker:"Reference",
    name:"The Claude Field Guide",
    card:"A plain-English guide to using Claude well — which model to use when, how credits work, and which tool fits which job. The first start for any newcomer.",
    summary:"A plain-English guide to using Claude well — which model to pick for which job, how credits actually work, and when to reach for the desktop extension or Cowork instead. The guide I wish I'd had on day one.",
    actions:[{label:"Read the guide",type:"primary",href:"/claude-field-guide.html"},{label:"Download the guide (PDF)",type:"ghost",href:"/downloads/claude-field-guide.pdf"}],
    facts:[{k:"Status",v:"Ready · updated per model"},{k:"Format",v:"Guide + PDF"},{k:"Reading level",v:"Plain English"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"HTML / CSS",why:"A simple, self-contained web page. No framework needed — it's a guide, so it just needs to be readable and load fast anywhere.",cost:"Free",url:""},
      {t:"Claude",why:"Written with Claude, and the whole thing is about using Claude well — so it doubles as a worked example.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["New to Claude & unsure where to start","Read the guide","Learn which model suits which task","Understand credits & effort levels","Use the right tool for the job, every time"],
    blocks:[
      {label:"Why I built it",h:"I knew nothing about models or credits — now I use them all on purpose",p:["When I started I had no idea what model to use when, or what \"credits\" even were, or how much each model burned through them. So I built the guide to teach myself — and it turned out to be the perfect first start for any newcomer.","Now I use every model for a reason. <strong>Haiku</strong> for simple text jobs. <strong>Opus</strong>, in its different levels, for the hard or technical work. <strong>Sonnet</strong> for everything in between. I use the <strong>Claude desktop extension</strong> when I'm stuck on something or can't be bothered doing it by hand, and <strong>Cowork</strong> to organise the files on my computer. Knowing which tool fits which job is the whole game."]},
      {label:"What it does",h:"The manual, minus the jargon",p:["It walks through the models and when to use each, how credits and effort levels work, and which Claude tool fits which situation — in words a shopkeeper understands, with examples from my own businesses so it's grounded in real use."]},
      {label:"On keeping it current",h:"When it's done, it's done — until the next model",p:["The models update practically every week, so yes, the guide needs a refresh now and then. That's fine. I write it, it's done until the next big model lands, then I top it up. The <em>thinking</em> — how to choose the right tool — doesn't go out of date. Only the names do."]}
    ]
  },
  {
    id:"advisoryboard", cat:"ai", status:"ready", kicker:"Claude skill · decision-making",
    name:"Personal Advisory Board",
    card:"A Claude skill that sits a round table of 19 advisors — a scaler, a value investor, a habits expert and more — around any idea you bring. They debate it, disagree, then vote on whether it's any good and why.",
    summary:"A Claude skill I built that convenes a round table of 19 advisors — each a different kind of expert — around whatever idea or decision you bring. They discuss it in their own voices, argue with each other, then vote yes/no/maybe with reasons. You get a real debate, not a flat answer. Yours to download and use.",
    actions:[{label:"Download the prompt (free)",type:"primary",href:"/downloads/personal-advisory-board-AdamReflects.md"},{label:"See an example",type:"ghost"}],
    facts:[{k:"Status",v:"Ready to use"},{k:"Format",v:"Claude skill / prompt"},{k:"Advisors",v:"19 at the table"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"Claude Projects",why:"It lives as a skill inside a Claude Project, so every message you send is automatically taken to the board — no need to ask each time.",cost:"Free tier works",url:"https://claude.ai"},
      {t:"A markdown prompt",why:"The whole thing is one carefully-written .md file. That's the beauty of it — no code, no hosting. You paste it in and it works.",cost:"Free",url:""}
    ],
    flow:["Bring an idea or decision","The board is convened","5–8 advisors debate it in-voice","They react to and challenge each other","Each votes yes / no / maybe with a reason","You get a consensus & the main risk to watch"],
    blocks:[
      {label:"Why I built it",h:"I wanted more than one opinion — I wanted a room",p:["When you're making decisions on your own, you only ever hear your own head. I wanted to bring an idea to a <em>room</em> — a table of sharp, different minds who'd pull it apart properly. So I built a skill that does exactly that: I put an idea in, and a whole board of advisors discusses it and comes back on whether it's a good idea and why, often with suggestions I hadn't thought of."]},
      {label:"How it works",h:"19 seats, every one a different lens",p:["The board is 19 advisors — 18 personas plus Claude itself as the synthesiser and devil's advocate. Each one is a different kind of thinker: <strong>a scaling and offers expert</strong> (think Alex Hormozi), <strong>a patient value investor</strong> (think Warren Buffett), <strong>a habits and systems person</strong> (think James Clear), a first-principles visionary, a purpose-first leadership voice, and more across operations, capital, creativity and psychology.","They don't just take turns — they <strong>react to and disagree with each other</strong> by name, so it reads like a real meeting, not eight separate opinions. Then everyone votes yes, no or maybe, each with a one-line reason. You finish with a clear consensus, the main risk to watch, and a straight recommendation."]},
      {label:"Make it yours",h:"Download it, drop it into a Project",p:["It's a single markdown file, so there's nothing to host and no cost. You drop it into a Claude Project as the instructions, and from then on every idea you bring is automatically taken to the table. I'll show you exactly how to set it up.","Swap the advisors for voices <em>you</em> admire if you like — that's the whole point. Build the board you wish you had in the room."],honest:"The best decisions I've made lately came from imagining what a table of people smarter than me would say. This just makes that table real, on demand."}
    ]
  },

  /* ---------------- HEALTH & LIFE ---------------- */
  {
    id:"longevity", cat:"health", status:"ready", kicker:"Template · bring your own bloods",
    name:"Longevity Dashboard",
    card:"Upload your own blood results and get a clear, annotated dashboard — what each marker means, a ranked action plan, plus room for supplements and gym records so it holds you accountable.",
    summary:"Upload your own blood results and get a clear, annotated dashboard back — what each marker means, a ranked action plan, tests to ask your GP about, and space to track supplements and training. Empty when you download it; only your numbers fill it in.",
    actions:[{label:"See a demo (fake data)",type:"primary"},{label:"Download the template",type:"ghost"}],
    facts:[{k:"Status",v:"Ready to use"},{k:"Your data",v:"Stays yours"},{k:"Not",v:"Medical advice"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"HTML / CSS / JS",why:"A single self-contained file. That's deliberate — it means your blood results never leave your own device. Nothing is uploaded anywhere.",cost:"Free",url:""},
      {t:"Claude",why:"Used to research what each marker means and to shape the plain-English explanations behind the dashboard.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["Get your bloods done","Enter your results","See each marker explained plainly","Get a ranked action plan","Add supplements & gym records","Stay accountable over time"],
    blocks:[
      {label:"Why I built it",h:"I got my bloods back and couldn't read them",p:["I've a real interest in health and longevity — for me, and so I'm around and healthy for my kids. So I got a full blood panel done, then stared at a page of numbers I couldn't interpret. I built the tool I needed: something that turns that wall of numbers into a plain-English picture and a ranked list of what to actually do first.","The bloods were just the starting point. Then I added supplements and gym records, because it all fits together — and once it's all in one place, it holds me accountable for my actions. That's the real goal: not a pretty dashboard, but a healthier, longer life."]},
      {label:"What it does",h:"Your numbers in, a clear picture out",p:["You enter your own results and it annotates every marker, ranks an action plan by what matters most, points to foods and supplements worth looking at, and gives you a list of tests to raise with your GP. Add your supplements and training and it becomes a running record you're answerable to.","<strong>It ships empty.</strong> The demo you can look at uses completely made-up numbers, clearly labelled — just to show what the tool does. When you download it, none of my data comes with it. You add your own, and it becomes yours."]},
      {label:"Please read this",h:"This is not medical advice",p:["I need to be plain about this, and it's written in bold on the tool itself: <strong>this is not medical advice.</strong> It's something I built with the help of AI, based on research the AI does. For a proper diagnosis, see a proper doctor. Adam and Adam Reflects take no responsibility for any actions taken or issues caused by using it. It's a way to understand your own data — nothing more."],honest:"Building something about health means being twice as careful. Detail makes it more useful. A clear warning makes it safe to share."}
    ]
  },
  {
    id:"marathon", cat:"health", status:"ready", kicker:"Template · training plan",
    name:"Marathon Trainer",
    card:"An interactive training tool built for a friend chasing the Dublin Marathon. Plan your weeks, track your runs on your phone, and watch the build toward race day.",
    summary:"An interactive training tool I built for a friend chasing the Dublin Marathon. Plan your weeks, track your runs, and watch the build-up to race day — all living on your phone so your progress stays put.",
    actions:[{label:"Open the tool",type:"primary"},{label:"Download",type:"ghost"},{label:"Download the guide (PDF)",type:"ghost",href:"/downloads/claude-field-guide.pdf"}],
    facts:[{k:"Status",v:"Ready to use"},{k:"Built for",v:"A friend"},{k:"Target",v:"Dublin, Oct 2026"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"HTML / CSS / JS",why:"A single web page that works on a phone. Simple on purpose so it loads fast and there's nothing to install.",cost:"Free",url:""},
      {t:"Browser local storage",why:"The clever bit. Your runs are saved on your own phone, so progress stays put even when I push an update. No account, no server.",cost:"Free",url:""},
      {t:"Vercel",why:"Hosts the page so he can open it on his phone from a link and 'add to home screen' like an app.",cost:"Free",url:"https://vercel.com"}
    ],
    flow:["Set your race goal","Plan lays out your weeks","Save it to your phone","Track each run as you go","Progress stays put across updates","Arrive at race day ready"],
    blocks:[
      {label:"Why I built it",h:"A mate needed a plan, not a stack of PDFs",p:["A friend set himself the Dublin Marathon and was drowning in generic training PDFs. I thought I could make something better — interactive, personal, and actually pleasant to use. It started as a favour and became one of my favourite builds."]},
      {label:"What went right",h:"Getting it off one computer and onto his phone",p:["The real problem wasn't the training plan — it was that the first version only ran locally, on one piece of hardware, like a single computer. No use to a runner. So we put it online and he downloads it to his phone, where the data now lives. When I push an update, his progress stays exactly where it was. That one shift — from a thing tied to a desk to a thing in his pocket — is what made it genuinely useful."]},
      {label:"What I learned",h:"A tool nobody can carry isn't finished",p:["It taught me to think about <em>where</em> a thing will actually be used before calling it done. A brilliant tool trapped on one laptop helps no one. The same idea, on your phone with your data saved, changes everything."]}
    ]
  },

  /* ---------------- GAMES ---------------- */
  {
    id:"kickoff", cat:"games", status:"paused", kicker:"Browser game · football cards",
    name:"Kickoff Cards",
    card:"A football card game you play in the browser — collect cards and take swipe-based penalties on a drawn pitch with a keeper and live commentary. My first real build, and the one that taught me the most.",
    summary:"A football card game you play in the browser — collect cards and take swipe-based penalties against a drawn goal, keeper, and live commentary. My first real build. It didn't go where I first hoped, and that's exactly why it's here.",
    actions:[{label:"Play it",type:"primary"},{label:"How it's built",type:"ghost"}],
    facts:[{k:"Status",v:"Parked (playable)"},{k:"Version",v:"v22–23"},{k:"Plays",v:"In your browser"},{k:"Lesson",v:"When to stop"}],
    tech:[
      {t:"HTML Canvas",why:"Draws the pitch, goal, keeper and ball, and handles the swipe physics. It's what makes a penalty feel live rather than static.",cost:"Free",url:""},
      {t:"Firebase",why:"Was used to sync player-versus-player games in real time. Powerful, but it's also where things got heavy — see the honest note below.",cost:"Free tier",url:"https://firebase.google.com"},
      {t:"Claude",why:"Built the whole game with me across 20-plus versions. Also where I hit the limit — the file got so big it kept crashing.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["Collect your cards","Pick a card to play","Swipe to take the penalty","Speed & angle blend with card stats","Keeper reacts, commentary calls it","Win or lose, next round"],
    blocks:[
      {label:"Why I built it",h:"I wanted to see if I could make something fun",p:["Tools are useful, but I wanted to know if I could build something people <em>enjoy</em>. I'm a United supporter, so football cards were the obvious pick. This was my first real build, and it's where I stopped asking \"can AI help me make something practical\" and started asking \"can it help me make something fun\"."]},
      {label:"What finally worked",h:"The net, the keeper, and the commentary",p:["I'll be honest — I spent too long getting the penalties right. I felt it mattered, because it's a quick game people might dip into. The breakthrough was when we added the net and the goalkeeper, and commentary that matches whether you win or lose. That's when a swipe started to feel like a real kick with a real outcome, instead of a flat animation."]},
      {label:"Why it's parked — and why that's OK",h:"I did what I set out to do",p:["My longer-term plan was logins so people could play each other online. We couldn't get it right — the HTML file got so big it crashed Claude a few times, and I had to keep rolling back to earlier versions. So I've stopped there. I might refresh it next season with newer players, maybe more leagues. But I've found bigger fish to fry.","Here's the thing: this was my first real build and I learned a <strong>huge</strong> amount from it — which is exactly what I wanted. It isn't where I hoped to go, but it's honest, it's playable, and the learnings are mine to keep and share. Something might pay off literally one day. If not, the learning already has."],honest:"It's all about learning for me. Knowing when a thing is done — even if it's not where you dreamed — is one of the most useful things this build taught me."}
    ]
  },

  /* ---------------- BUSINESS ---------------- */
  {
    id:"bellepos", cat:"business", status:"ready", kicker:"Case study · retail POS",
    name:"Belle POS",
    card:"A point-of-sale and analytics system built for my own jewellers — sales, footfall, wages, and analytics — put online so it's not stuck on one till, and wired to my spreadsheets for offline storage.",
    summary:"A point-of-sale and analytics system I built for my own jewellers — sales, deposits, footfall, wages, and analytics with charts. Put online so it works across devices, and wired to export cleanly into my Excel for offline storage. In daily use at the shop.",
    actions:[{label:"Read the case study",type:"primary"},{label:"Visit the shop",type:"ghost",href:"https://bellejewellery.ie"},{label:"Download the Daily Takings & Stock Tracker (free)",type:"primary",href:"/downloads/Daily-Takings-Stock-Tracker.xlsx"}],
    facts:[{k:"Status",v:"In daily use"},{k:"Built for",v:"My own shop"},{k:"Version",v:"v3 → v6"},{k:"Type",v:"Case study"}],
    tech:[
      {t:"HTML / CSS / JS",why:"The whole till is a web app. That means it runs on any device with a browser — no special hardware to buy.",cost:"Free",url:""},
      {t:"Vercel",why:"Putting it online here is what got it off a single computer, so it's not tied to one till and can't be lost if that machine dies.",cost:"Free",url:"https://vercel.com"},
      {t:"CSV export → Excel",why:"A clean export so the day's takings copy straight into my offline workbook. Belt and braces — the shop's data lives in two places, not one.",cost:"Free",url:""}
    ],
    flow:["Ring up a sale or deposit","Tap to log footfall","End of day: wages calculated","Export a clean CSV","Copy into the Excel workbook","Analytics & charts update"],
    blocks:[
      {label:"Why I built it",h:"Off-the-shelf tills didn't fit my shop",p:["Every POS I looked at either cost a fortune or forced my shop to work its way. I wanted footfall tracking, wage costs, and analytics that matched the spreadsheets I already keep. So I built my own, one version at a time, tested live at my own counter — because it had to be a real, working till for Belle Jewellery, not a demo."]},
      {label:"The problems we got over",h:"Lots of little battles, one at a time",p:["This one was a string of real-world snags, and getting past each taught me something:"]},
      {label:"",h:"",list:["The printout was too big for the receipt paper we actually use — had to resize it to fit.","The font didn't read properly on the printout, so we changed it until it was clear.","The CSV export needed reworking so it would copy-and-paste straight into my Excel for offline storage.","The analytics graphs took a few iterations before they showed what I needed at a glance.","Sign-up was fiddly for me and staff, so we smoothed it.","It was stuck on one computer — so we put it online and integrated it with other systems, so it's not tied to a single till."]},
      {label:"How long it took",h:"About a week — around everything else",p:["Roughly a week, but that's because I was running other projects at the same time and kept running out of credits, which threw the timing off. I also just wanted to get it right, because it's a <em>live</em> POS for the shop. Now? I'm very happy with it. The case study is a plain walk-through of every tab and what it's for."],honest:"Building for your own real business is the best teacher. You use it every single day, so every flaw finds you fast — and you fix it fast."},
      {
        h: "What I can actually give you",
        p: [
          "People sometimes ask if they can just download the till itself. Short answer: no, and I'd rather say why than dodge it. The real version is wired directly into my own shop's live data — handing over the file would mean handing over the keys to it. That's not small print, that's a genuine 'don't do that' from me.",
          "What I can hand over is the part that isn't tied to my shop at all — a spreadsheet for tracking daily takings and stock levels. It's the job most small shops do on paper or not at all, with the maths done for you. Fill in the yellow cells and ignore the rest. No login, no subscription, nothing to break.",
          "It won't do what a proper till does. It also won't ever lock you out, charge you monthly, or go down on a Saturday afternoon."
        ]
      }
    ]
  },
  {
    id: "belleclipper",
    cat: "business",
    name: "Belle Clipper",
    kicker: "Video · two-step by design",
    status: "ready",
    card: "Film a video on your phone, drop it in a folder, double-click one file. Get back a trimmed, captioned, branded video ready to post — and a prompt that writes the caption for you.",
    summary: "A local video editor for social media, built because I was posting every other day and couldn't justify a subscription to do it. Runs entirely on my own PC for nothing. It trims the dead air, burns in captions, adds the branding, and hands me a prompt to write the description. Two steps, on purpose — I'll explain why below.",
    facts: [
      { k: "Built", v: "August 2026" },
      { k: "Runs on", v: "My own PC, offline" },
      { k: "Cost to run", v: "€0" },
      { k: "Time saved", v: "~20 mins per video" },
      { k: "Editing skill needed", v: "None" }
    ],
    flow: [
      "Film a vertical video on your phone",
      "Drop it into the inbox folder",
      "Double-click RUN ME.bat",
      "Silence trimmed off the front and back",
      "Speech transcribed locally, captions timed",
      "Branding and captions burned in, video rendered",
      "Finished MP4 + a caption prompt land in the output folder",
      "Paste the prompt into Claude, pick a caption, post"
    ],
    tech: [
      { t: "Python", cost: "Free", why: "Holds the whole pipeline together. One script, start to finish." },
      { t: "ffmpeg", cost: "Free", why: "Does the actual work — trimming, cropping to vertical, burning in the subtitles, rendering." },
      { t: "faster-whisper", cost: "Free", why: "Turns speech into timed text, running on my own machine. Nothing leaves the PC." },
      { t: "Claude", cost: "Free tier works", why: "Writes the caption from the transcript, in a separate step." }
    ],
    blocks: [
      {
        h: "Why I built it",
        p: [
          "I'd committed to posting every other day for the shop, and the editing was killing it. Filming took two minutes. Captioning and topping and tailing the video took twenty. That maths doesn't survive a busy week.",
          "The cloud tools that do this are good — Submagic, Opus Clip, CapCut all work. But they're subscriptions, and at my posting volume I'd be paying monthly forever for something that runs fine on a computer I already own. So I built the local version."
        ]
      },
      {
        h: "Why it's two steps and not one",
        p: [
          "The tool could write the caption itself. It's a few lines of code — the pipeline already has the transcript sitting there. All it needs is an API key.",
          "I decided not to. An API key means separate billing outside the Claude Pro plan I already pay for, another card on file, another thing to watch. For the sake of one copy-paste, it wasn't worth it. So the tool writes the transcript out as a ready-made prompt instead, and I paste that into Claude myself.",
          "I'm flagging this because it looks like an unfinished feature and it isn't. It's a choice. Not every gap in a tool needs closing — sometimes the last 10% costs more than it's worth, and a copy-paste is a perfectly good bridge."
        ]
      },
      {
        h: "The caption prompt",
        p: [
          "This is the part that's genuinely useful to anyone, so I've stripped my own details out of it and put it up as a free download.",
          "You fill in a short setup section once — your business, your audience, your tone, your call to action, and crucially the things you never want said. Then you feed it the transcript of any video and it gives you three captions with different angles, and tells you which one it thinks is best.",
          "The setup section is where the quality comes from. Fill it in lazily and you'll get lazy captions back."
        ]
      },
      {
        h: "What I can't hand over",
        p: [
          "The video editing side isn't downloadable, and I'd rather say that plainly than pretend otherwise.",
          "It's a script tied to my Windows machine — my folder paths, my installed fonts, my branding file, an ffmpeg install I did by hand. Handing you a zip of it would be handing you a broken thing and a long evening.",
          "So the flowchart above is the honest version: that's exactly what it does, in order. If you're the sort to have a go, that's a genuine blueprint. Python and ffmpeg are free and there's no clever trick hidden in mine."
        ]
      },
      {
        h: "What I learned",
        p: [
          "The editing was never the real bottleneck. Once it took thirty seconds instead of twenty minutes, the thing that stopped me posting was not knowing what to film that day.",
          "That's usually how it goes. You automate the obvious annoyance and the actual problem steps out from behind it."
        ]
      }
    ],
    actions: [
      { label: "Download the caption prompt", type: "primary", href: "/downloads/Social-Media-Description-Prompt.txt" }
    ]
  },
  {
    id: "touchline",
    cat: "lab",
    name: "Touchline",
    kicker: "Fantasy football · still cooking",
    status: "wip",
    card: "A Fantasy Premier League tool that predicts expected points for every player, twice a day, and shows its working. Built to argue with my own gut, not to replace it.",
    summary: "A prediction model and a one-page site for Fantasy Premier League. It rates every team's attack and defence, predicts who'll actually play, and turns that into an expected-points figure for every player — broken down so you can see where the number came from. No login, nothing saved anywhere but your own browser. Still marked in progress: the model needs real results to sharpen against, and the season's only starting.",
    facts: [
      { k: "Started", v: "August 2026" },
      { k: "Cost to run", v: "€0" },
      { k: "Updates", v: "Twice daily, automatically" },
      { k: "Login needed", v: "None" },
      { k: "Your data", v: "Stays in your browser" }
    ],
    flow: [
      "Model runs automatically, twice a day",
      "Rates every team's attack and defence",
      "Predicts who's actually starting, and for how long",
      "Turns that into expected points per player",
      "Breaks the number down — goals, assists, clean sheets, bonus, cards",
      "Freezes its predictions before each deadline",
      "Compares them to what really happened afterwards"
    ],
    tech: [
      { t: "GitHub Actions", cost: "Free", why: "Runs the model twice a day on a schedule without me touching anything." },
      { t: "Vercel", cost: "Free", why: "Hosts the site and redeploys itself every time the model updates." },
      { t: "The official FPL feed", cost: "Free", why: "Where the raw numbers come from — prices, ownership, minutes, set-piece duty." },
      { t: "Understat", cost: "Free", why: "Shots and key passes, published after full time." }
    ],
    blocks: [
      {
        h: "Why I built it",
        p: [
          "Every fantasy football tips site tells you the same six players. I wanted something that told me why, showed its working, and let me disagree with it.",
          "So the expected-points number is never just a number. It splits into four smaller models — will he play, how good is the fixture, what's his share of his team's goals, and everything else. If the model likes someone I don't, I can see exactly which bit of it is doing the talking and decide whether I believe that bit."
        ]
      },
      {
        h: "It marks its own homework",
        p: [
          "Before every deadline it freezes its predictions to a file, and afterwards it compares them against what actually happened, gameweek by gameweek.",
          "That had to go in before the season started — you can't add honesty retroactively. It would have been very easy to skip, and then to quietly remember only the calls it got right.",
          "It judges itself only on players it expected to play 45 minutes or more. Scoring it on the four hundred players it correctly predicted near-zero for would flatter it enormously and mean nothing."
        ]
      },
      {
        h: "What I deliberately didn't build",
        p: [
          "A price-change predictor. The real thresholds aren't published and the model only runs twice a day — too coarse to model it honestly. I built a transfer momentum column instead and labelled it as exactly what it is: which way the crowd is moving.",
          "Scraped lineup predictions from the sites that do it properly. That's their commercial product, free to read or not. Instead there's a team news tab where you type in what you've read yourself, and that overrides the model everywhere.",
          "A single blended confidence score for captaincy. Fixtures and home advantage are already inside the expected points — blending them in again would count them twice. Three honest columns beat one tidy number that's quietly lying."
        ]
      },
      {
        h: "Why it's still marked in progress",
        p: [
          "Because it hasn't been tested against reality yet. Everything currently leans on last season's data, which makes it shaky on new signings and anyone whose role has changed. It should sharpen up around gameweek five or six.",
          "Use it, by all means — it's free and there's nothing to sign up for. Just treat the numbers with the suspicion they've earned so far. When it's proven itself I'll say so here."
        ]
      },
      {
        h: "Nothing you enter goes anywhere",
        p: [
          "No accounts, no database of users, nothing to sign up for. Your team ID and any team news you type in are saved in your own browser and nowhere else. I can't see them, and neither can anyone else using it.",
          "Clear them any time from within the tool."
        ]
      }
    ],
    actions: [
      { label: "Open Touchline", type: "primary", href: "https://touchline-nu-eight.vercel.app/" }
    ]
  },
  {
    id:"salesworkbook", cat:"business", status:"ready", kicker:"Business tool · analysis",
    name:"Year-on-Year Sales Workbook",
    card:"An offline Excel workbook where all the detail lives — so I can deep-dive a single day's sales or zoom out and compare month against month, year on year. Blank template free to download.",
    summary:"An offline Excel workbook that's the home for all the detail. Want to deep-dive what sold on a random Tuesday? It's there. Want to zoom out and compare this month to the same month last year? Also there. The place I go when I need to actually understand the numbers — and now a blank template so you can build the same thing for your own shop.",
    actions:[{label:"Download the blank workbook (Excel)",type:"primary",href:"/downloads/Year-on-Year-Sales-Workbook-TEMPLATE.xlsx"}],
    facts:[{k:"Status",v:"In daily use"},{k:"Lives",v:"Offline in Excel"},{k:"Tracks",v:"Every half hour"},{k:"Tabs",v:"60"},{k:"Cost",v:"Free template"}],
    tech:[
      {t:"Microsoft Excel",why:"Sometimes the old tool is the right tool. Excel handles the weekly tabs, year-on-year comparisons and conditional formatting without needing anything fancy.",cost:"Paid (Office)",url:"https://www.microsoft.com/microsoft-365/excel"},
      {t:"Claude",why:"Used to design the formulas, the comparison logic and the traffic-light formatting — the parts that would've taken me days to work out alone.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["Sales data comes in from the POS","Lands in weekly & daily detail","Zoom in on any single day","Or zoom out to month-by-month","Compare year against year","Spot the patterns"],
    blocks:[
      {label:"Why I built it",h:"I wanted one place where all the detail lived",p:["A till tells you what happened today. It doesn't easily tell you whether this March beat last March, or what sold on a quiet day three weeks ago. I wanted a single workbook where all of that detail lives — so I can go as deep or as wide as I need."]},
      {label:"What it does",h:"Deep-dive or zoom out, your call",p:["If I want to interrogate a single random day — what sold, how the day went — I can. If I want to pull back and compare month by month, or this year against last year, I can do that too. It's the analytical backbone behind the shop: the POS captures, this workbook makes sense of it over time.","This isn't about tracking staff. It's about understanding the <em>business</em> — the rhythms, the good weeks and the slow ones, and whether things are genuinely improving year on year."]},
      {label:"What I learned",h:"A number on its own means nothing",p:["Today's takings only mean something next to last year's. Building this taught me to always give a number something to be compared against — otherwise it's just a figure with no story."]},
      {
        h: "What I can hand you",
        p: [
          "Mine has two years of my shop's takings in it, so it isn't going anywhere. What I've put up instead is the same workbook, emptied out — every tab, every formula, none of my numbers.",
          "It's 52 week tabs. Each one is your opening hours broken into half hours, seven days across. You fill in four things as the day goes: how many people came in, how many bought, what they spent, and how much of it was cash. There's a notes column too, which sounds trivial and isn't — 'freezing, nobody out' explains a bad Tuesday six months later when you've forgotten.",
          "Everything else works itself out. Conversion rate, average sale, estimated cost and profit, this week against last week, and every day against the same day a year ago. Then it rolls up: a daily report for the whole year on one page, a weekly summary, a monthly summary, and a P&L that runs from revenue down to profit after tax.",
          "The tab I'd point at is Hourly Averages. It fills in on its own as the weeks go by and eventually tells you which half hours of which days actually earn. Mine told me something about Saturday mornings I'd have argued against if you'd asked me cold.",
          "One honest warning. The first month is a chore and tells you nothing, because there's nothing to compare against yet. It starts being worth the effort somewhere around week six. If you're not going to stick at it past that, don't start."
        ]
      }
    ]
  },
  {
    id:"seogeo", cat:"business", status:"ready", kicker:"Guide · website optimization",
    name:"Shopify SEO & GEO Guide",
    card:"How I optimized my own Shopify store to be found — by Google and by AI. Blog posts, product pages, FAQs with schema — turned into an easy guide so you can set it up yourself.",
    summary:"The work I did to make my own Shopify store findable — not just by Google (SEO), but by AI answer engines too (GEO). I've turned what I did into an easy guide, including how to set Claude up to work alongside Shopify so you can do the same for your shop.",
    actions:[{label:"Download the SEO & GEO audit prompt (free)",type:"primary",href:"/downloads/Shopify-SEO-GEO-Audit-Prompt.txt"},{label:"Visit the shop",type:"ghost",href:"https://bellejewellery.ie"}],
    facts:[{k:"Status",v:"Done & documented"},{k:"For",v:"Shopify shops"},{k:"Covers",v:"SEO + GEO"},{k:"Cost",v:"Free guide"}],
    tech:[
      {t:"Shopify",why:"The shop platform itself. The work was tuning its built-in SEO fields, blog and product pages — no plugins needed.",cost:"Paid (the store)",url:"https://www.shopify.com"},
      {t:"Claude + Shopify connector",why:"The key move. Connecting Claude directly to Shopify lets it audit pages and draft descriptions inside the store — the guide shows you how to set this up.",cost:"Free tier works",url:"https://claude.ai"},
      {t:"Google Search Console",why:"Free from Google. Verifies the site and shows how it's actually performing in search, so you're not guessing.",cost:"Free",url:"https://search.google.com/search-console"}
    ],
    flow:["Audit what's missing","Fix product titles & descriptions","Write helpful blog posts","Add FAQs with schema","Connect Claude to Shopify","Get found by Google & AI"],
    blocks:[
      {label:"Why this matters",h:"Being findable isn't a build — it's survival for a small shop",p:["This isn't a tool or a game, but it might be the most important work on this whole site for a small business. If people — and now AI — can't find you, nothing else matters. So I spent a proper stretch optimizing my own Shopify store for both search engines (SEO) and the newer world of AI answer engines (GEO)."]},
      {label:"What I actually did",h:"The real work, in plain terms",p:["Across the store I wrote genuinely helpful blog posts, rewrote the About page, fixed the SEO titles and descriptions across every active product, and built FAQ pages with proper structured data (JSON-LD schema) so both Google and AI can understand what the shop is and what it sells. I finished by verifying the site with Google Search Console."]},
      {
        h: "What I can hand you",
        p: [
          "The work itself doesn't travel. My product descriptions are mine, my FAQ answers are about jewellery, and the specific fixes my store needed won't be the ones yours needs. Handing you my checklist would be handing you someone else's homework.",
          "What does travel is the audit. So I've turned it into a prompt you paste into Claude with the Shopify connector switched on. It reads your actual store — real product pages, real collection pages, your About page — and hands back a prioritised list of what to fix, ordered by what's worth your time rather than by what's easiest to write down.",
          "You fill in a short setup block once: what you sell, where you are, who buys from you, how much time you actually have, and the things you flatly won't do. That last one matters more than it sounds. Most SEO advice fails because it assumes you have an agency's hours.",
          "It's free, it's a text file, and there's nothing of my shop in it."
        ]
      }
    ]
  },
  {
    id:"swouch", cat:"lab", status:"mine", kicker:"Case study · my own venture",
    name:"Swouch",
    card:"A voucher-swapping platform for Irish independent shops — register, propose a swap, redeem with a QR code. SWap + vOUCHer. A business I'm building for real.",
    summary:"A voucher-swapping platform for Irish independent shops — register, propose a swap, redeem with a QR code. The name is SWap + vOUCHer. This is a business I'm building for real, so I'm sharing the story and the thinking, but not the code.",
    actions:[{label:"Read the story",type:"primary"},{label:"Visit Swouch",type:"ghost",href:"https://swouch.app"}],
    facts:[{k:"Status",v:"This one's mine"},{k:"For",v:"Irish indie shops"},{k:"Live at",v:"swouch.app"},{k:"Stage",v:"Testing · signing up shops"}],
    tech:[
      {t:"Vercel",why:"Hosts the live platform at swouch.app. One-click deploys and a free tier that comfortably covers the testing phase.",cost:"Free (for now)",url:"https://vercel.com"},
      {t:"Firebase",why:"Handles shop accounts, the swap data and the QR redemption flow. Room to grow into as more shops sign up.",cost:"Free tier",url:"https://firebase.google.com"},
      {t:"Claude",why:"My build partner for the whole thing — from the early back-and-forth on the idea and the name, right through to the buttons and print materials.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["Shop registers","Propose a voucher swap","Other shop accepts","Customer gets a QR code","Redeem in-store","Both shops win new custom"],
    blocks:[
      {label:"Why I built it",h:"Independent shops help each other more than they compete",p:["Running my own shop, I saw how much small independents could gain by sending each other custom instead of fighting over it. It started as a broader idea — a swapping platform so nobody had to spend their own money to get things — and through a lot of back-and-forth with Claude, it landed on something clean and simple: an easy way for business owners like me to swap product for product.","That conversational stage at the start mattered. Talking it through is how we got to the right idea — and the right name, <strong>Swouch</strong> (SWap + vOUCHer). Only once that was clear did we start building: the colours, the style, the buttons, the downloadable materials for shops."]},
      {label:"How I tested it",h:"Myself, with a fistful of email addresses",p:["I tested it myself using several different email addresses until we'd ironed out the kinks. We found everything from the simple — the header was too big on mobile — to the deeper, like emails not sending at all. Testing as if I were a real shop owner is how those surfaced."]},
      {label:"What's next",h:"Big plans, if it works",p:["Right now there's nothing I'd rip out — I love it all. In future I want to add things that help long-term success: a recommend-a-friend feature, email tools for businesses. Further out, there's a possible extension to B2C. For now we're firmly in the testing phase, and I'm out visiting shops in person to sign them up. But the plans are big if it lands."],honest:"This is the one I most want to work. So it's the one I'm hardest on — and the one I'm keeping for myself."}
    ]
  },

  /* ---------------- THE LAB ---------------- */
  {
    id: "alexa",
    cat: "lab",
    name: "Alexa Morning Briefing",
    kicker: "Experiment · voice",
    status: "ready",
    card: "A custom Alexa skill that reads the family's morning out loud — live weather, a holiday countdown, this week's local events, the football fixtures, a quote each for me and my wife, and something different for each of the three kids.",
    summary: "A private Alexa skill that reads our household's morning aloud. Date, live Cork weather, how many days to the holiday, what's on locally this week, the football, a quote for me, a quote for my wife, and something individually picked for each of our three children. Costs nothing to run and takes about two minutes a week to keep current. Because people hear faster than they read.",
    facts: [
      { k: "Status", v: "Built & in daily use" },
      { k: "Built on", v: "Alexa-hosted skills" },
      { k: "Cost to run", v: "€0" },
      { k: "Weekly upkeep", v: "~2 minutes" },
      { k: "My family's details", v: "Never shipped" }
    ],
    flow: [
      "Say 'Alexa, ask whats my morning brief for my brief'",
      "Today's date, then live weather for Cork",
      "How many days to go until the holiday",
      "What's on locally this week, and the football fixtures",
      "A quote for me, then one for my wife",
      "Something different for each of the three kids",
      "A joke, a family activity, a fun fact",
      "Whole house starts the day set up"
    ],
    tech: [
      { t: "Alexa Skills Kit", url: "https://developer.amazon.com/alexa", cost: "Free", why: "Amazon's framework for building custom skills. It's how you teach Alexa to answer something she doesn't already know." },
      { t: "Alexa-hosted skills", cost: "Free", why: "The code runs inside Amazon's own developer console. No AWS account, no card on file, nothing to pay. This is the bit I got wrong first time round." },
      { t: "Open-Meteo", url: "https://open-meteo.com", cost: "Free", why: "Live weather with no API key and no sign-up. Genuinely free, not free-tier-with-a-catch." },
      { t: "Claude", url: "https://claude.ai", cost: "Free tier works", why: "Wrote the code, and does the weekly two-minute refresh of local events and fixtures." }
    ],
    blocks: [
      {
        h: "Why I built it",
        p: [
          "Mornings in a house with three kids are chaos. Nobody reads anything. But everybody hears.",
          "I wanted a calm two minutes at the start of the day where the house gets told what's coming — the weather, what's on this week, and something small and personal for each person in it. Not a productivity system. Just an anchor."
        ]
      },
      {
        h: "What it actually reads out",
        p: [
          "In order: today's date. Live weather, phrased differently depending on the rain chance so it doesn't say the same sentence every wet morning in Cork. A countdown to the holiday, which resets itself for next year once the date passes. What's on locally this week. The football fixtures. A quote for me, pulled from business and mindset people I actually follow. A quote for my wife, from parenting and self-help writers she reads. Then something for each of the three kids — a fact, a challenge, a question — matched to what that particular child is into, and different each day. A joke. One thing for us to do together. A fun fact to finish.",
          "It rotates on the calendar date, so it works through a list before looping rather than repeating within the same day."
        ]
      },
      {
        h: "The mistake worth sharing",
        p: [
          "I spent a fortnight stuck waiting on an AWS account approval. I said so on this page at the time — that it was held up on the plumbing, not the idea.",
          "I didn't need AWS at all. Alexa-hosted skills run the code inside Amazon's own developer console: free, no separate account, no card. The wait was entirely self-inflicted, caused by following the first tutorial I found instead of checking whether there was a simpler door.",
          "Leaving that here rather than quietly deleting it, because it's the most useful thing on this page. If you're stuck on setup for something like this, the odds are decent you're solving a problem you don't have."
        ]
      },
      {
        h: "What I decided not to build",
        p: [
          "Calendar integration. I went a fair way down this road — Google Cloud project, OAuth, Alexa account linking. It works, but it's a lot of fragile plumbing for one line of the brief, and it's the sort of thing that breaks silently in six months. Parked.",
          "Automatic scraping for local events and fixtures. I chose a two-minute manual refresh instead: once a week I ask Claude for the current listings, paste the block in, redeploy. A scraper would save me those two minutes and then break one Tuesday without telling me. The manual version is worse on paper and better in practice.",
          "There's a pattern in both: the automated version is more impressive and less reliable. For something the whole house hears every morning, reliable wins."
        ]
      },
      {
        h: "What's honestly still rough",
        p: [
          "The content libraries are moderate, not huge — so it starts repeating on roughly a weekly cycle until I keep feeding it. A handful of the quotes are flagged in my own notes as likely-correct-but-unverified rather than confirmed, and I'd rather say that than pretend every one is nailed down.",
          "The shorter 'Alexa, open whats my morning brief' phrasing doesn't reliably fire. 'Alexa, ask whats my morning brief for my brief' does, every time, so that's the one we use.",
          "And the weekly events and fixtures go stale if I don't do the two minutes. That's on me, not the build."
        ]
      },
      {
        h: "Could you build this?",
        p: [
          "Yes, and cheaper than you'd think — the whole thing costs nothing to run.",
          "There's nothing of my family in what ships. The structure is the reusable part: a set of sections, each pulling from its own rotating list, keyed to the date. What goes in those lists is entirely yours."
        ]
      }
    ],
    actions: []
  },
  {
    id:"dailyos", cat:"lab", status:"mine", kicker:"Made for me · template to share",
    name:"My Daily OS",
    card:"My personal morning brief — local competitors, what's happening in jewellery, a little AI news, and words from founders I admire. Plus a downloadable template so you can build your own (business, personal, or both).",
    summary:"My personal morning brief: what my local competitors are up to, what's happening in the jewellery world, a little about AI, and thoughts from founders I look up to. Mine is personal — but I've built a downloadable template so you can create your own, for business, personal life, or both.",
    actions:[{label:"See how mine works",type:"primary"},{label:"Download the template",type:"ghost"}],
    facts:[{k:"Status",v:"Mine · template to share"},{k:"Built for",v:"Myself, daily"},{k:"You get",v:"3 template options"},{k:"Cost",v:"Free"}],
    tech:[
      {t:"Claude Projects",why:"The whole thing runs as a Project with saved instructions, so my brief is one message away each morning without re-explaining anything.",cost:"Free tier works",url:"https://claude.ai"},
      {t:"A markdown template",why:"What you download. Just a structured set of questions in a plain file — no code, nothing to host. Answer it, hand it to Claude, done.",cost:"Free",url:""}
    ],
    flow:["Pick business, personal, or both","Answer the guided questions","Claude shapes your daily brief","Set it to run each morning","Start every day informed"],
    blocks:[
      {label:"Why I built it",h:"One clear start to a busy day",p:["I've a lot on — a shop, other ventures, a family. Without a system I'd be busy but scattered. My Daily OS is my personal morning brief: it tells me what my local competitors are doing, what's happening in the jewellery world, a little about AI, and I hear from some of the founders I admire and look up to. It sets my head straight before the day starts."]},
      {label:"Make your own",h:"Business, personal, or both",p:["Mine is wired to my life, so a straight copy wouldn't serve you. Instead I've made a downloadable template built around <strong>guided questions you answer yourself</strong> — so your brief is personal to you. Because not everyone's in business, there are three versions:"]},
      {label:"",h:"",list:["<strong>Business OS</strong> — questions about your competitors, your industry, your goals, the people you learn from.","<strong>Personal OS</strong> — questions about your focus, your family, your health, what keeps you grounded.","<strong>Both</strong> — a combined version for people like me, whose work and life don't sit in separate boxes."]},
      {label:"How to set it up",h:"Made easy on purpose",p:["The download walks you through it in plain steps: answer the questions, hand them to Claude, and it shapes your own morning brief you can run each day. The questions are detailed and designed to draw a real answer out of you — the more honest you are, the better your brief. No technical knowledge needed."],honest:"The useful thing to share was never my brief — it's the method. Build yours around your life, not mine."}
    ]
  },
  {
    id:"localradar", cat:"business", status:"wip", kicker:"Concept · for small businesses",
    name:"Local Radar",
    card:"An idea in progress: an automation tool that looks after your whole Google Business Profile — writing posts from your website and handling new reviews — not just watching them.",
    summary:"An idea I'm still shaping: an automation tool that looks after your whole Google Business Profile. Not just watching reviews — writing your posts from your own website's content and photos, and handling new reviews as they land. Still in thinking mode.",
    actions:[{label:"Read the plan",type:"primary"}],
    facts:[{k:"Status",v:"Concept · thinking"},{k:"For",v:"Small businesses"},{k:"Grew from",v:"A posting tool I built"},{k:"Stage",v:"Planning"}],
    tech:[
      {t:"Google Business Profile API",why:"Planned — the way in to read reviews and publish posts to a shop's Google listing automatically.",cost:"Free",url:"https://developers.google.com/my-business"},
      {t:"Claude",why:"Already built the posting tool this grew from, and would draft the review replies. The intelligence behind the automation.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["Pull content & photos from your site","Draft Google Profile posts","Publish on a schedule","Watch for new reviews","Auto-respond or flag for you","Your profile, looked after"],
    blocks:[
      {label:"Why I'm building toward it",h:"Your Google profile is often the first thing a customer sees",p:["Most small shops don't tend their Google Business Profile — and it's frequently the first impression a customer gets. A bad review can sit there for weeks before a busy owner notices. I run a shop; I know how easy it is to miss."]},
      {label:"What it's growing from",h:"A real tool I already built",p:["This isn't starting from nothing. Claude and I already built a tool that writes my Google Profile posts by pulling content and photos straight from my website. Local Radar is the bigger idea around it: take that posting engine, add review monitoring — auto-respond or hand it to me to answer — and you've an automation tool that genuinely looks after your whole Google Business Profile, not just one corner of it."]},
      {label:"Where it's at",h:"Still on paper — and that's honest",p:["It's at the thinking stage. It's a good idea and useful for a lot of people, but for now I'm enjoying building other things. I'm putting it here to keep myself honest about starting it one day — and to show that not everything begins as finished code. Some of it begins as a note and a good intention."]}
    ]
  },

  /* ---------------- OTHER ---------------- */
  {
    id:"website", cat:"lab", status:"wip", kicker:"Built with Claude · this very site",
    name:"This Website",
    card:"The site you're reading right now. Built with Claude to be the home for everything else — a place to share the builds, tell the honest stories, and point people to it all from Instagram and X.",
    summary:"The site you're on right now. I built it with Claude to be the one place everything else lives — the shop window for every build, with the full story behind each one. It's always growing, which is why it sits under 'work in progress' and probably always will.",
    actions:[{label:"You're looking at it",type:"locked"}],
    facts:[{k:"Status",v:"Live & evolving"},{k:"Built with",v:"Claude"},{k:"Hosted on",v:"Vercel"},{k:"Cost",v:"Free + domain"}],
    tech:[
      {t:"Next.js",why:"The framework the real site is built on. It gives each build its own proper web address, so I can share a single build straight to Instagram or X.",cost:"Free",url:"https://nextjs.org"},
      {t:"Vercel",why:"Hosts the site and connects to the domain. Same tool I use for Swouch, so I already knew it — deploys in one click and it's free at this size.",cost:"Free",url:"https://vercel.com"},
      {t:"Claude",why:"Designed and built the whole thing with me, from the look and feel to every word of the stories. I'm no coder — this exists because of it.",cost:"Free tier works",url:"https://claude.ai"}
    ],
    flow:["I finish a build","I write its honest story here","It gets its own page & web address","I make a short video for Instagram / X","People land here to see & use it"],
    blocks:[
      {label:"Why it exists",h:"Everything needed one home",p:["I was building lots of things and they were scattered everywhere. I wanted one place they could all live — a home where anyone curious could see what I've made, read the real story behind it, and use whatever's useful to them. This site is that home."]},
      {label:"How it works",h:"The shop window for the whole lot",p:["Every build gets a card and its own page with the full story — why I built it, what went wrong, how it actually works, and the tools behind it. Alongside short videos on Instagram and X, this is how I share what I'm doing. The video catches your eye; the site is where you come to see more."]},
      {label:"Why it's never 'done'",h:"It grows every time I build something",p:["I've marked it work in progress and it'll likely stay that way forever — because every new thing I make gets added here. That's the point. It's less a finished website and more a living record of someone curious, learning in public, one build at a time."],honest:"This site is the most honest thing I've made. It's me, in public, saying: here's what I'm trying, warts and all. Come have a look."}
    ]
  }
];

export { CATEGORIES, TIMELINE, BUILDS };
