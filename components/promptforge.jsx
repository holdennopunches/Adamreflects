import { useState, useRef } from "react";

// ── Theme ──
const T = {
  bg: "#1E2030",
  surface: "#262840",
  border: "#363958",
  borderFocus: "#E8A838",
  text: "#F0F1F7",
  textSub: "#B0B4C8",
  textMuted: "#7E83A0",
  accent: "#E8A838",
  accentSoft: "rgba(232,168,56,0.14)",
  accentText: "#F5CE6E",
  green: "#4ADE80",
  orange: "#FB923C",
  red: "#F87171",
  chipBg: "#2E3150",
  chipSelected: "rgba(232,168,56,0.2)",
  chipBorder: "#424668",
  chipSelectedBorder: "#E8A838",
  inputBg: "#FFFFFF",
  inputText: "#1a1a1a",
  inputBorder: "#D0D3E0",
  inputPlaceholder: "#999",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

// ── Power-Ups ──
const POWER_UPS = [
  { id: "clarify", label: "Ask me questions first", desc: "The AI asks clarifying questions before starting — gets you a much more tailored answer", prompt: "Before you begin, ask me any clarifying questions that would help you produce the best possible response. Only proceed after I've answered." },
  { id: "stepbystep", label: "Think step by step", desc: "The AI reasons through the problem methodically instead of jumping to conclusions", prompt: "Think through this step by step before giving your final answer." },
  { id: "selfcritique", label: "Critique & improve", desc: "The AI reviews its own first draft, finds weaknesses, then delivers an improved version", prompt: "After your first draft, critique it honestly — identify weaknesses, gaps, or anything that could be stronger. Then produce an improved final version." },
  { id: "alternatives", label: "Give me options", desc: "Instead of one answer, the AI provides 2–3 alternatives with trade-offs so you can pick the best fit", prompt: "Provide 2–3 distinct alternatives or approaches, explaining the trade-offs of each, so I can choose the best fit." },
  { id: "uncertainty", label: "Flag uncertainty", desc: "The AI calls out anything it's not 100% sure about, so you know what to double-check", prompt: "If you are uncertain about anything in your response, flag it clearly so I know what to verify." },
  { id: "actionable", label: "Make it actionable", desc: "The AI ends with concrete next steps you can take immediately — not just information", prompt: "End your response with specific, concrete action steps I can take immediately." },
];

// ── Constants ──
const TONES = ["Professional", "Friendly", "Honest / Direct", "Witty", "Empathetic", "Authoritative", "Creative", "Inspirational", "Academic", "Casual"];
const FORMATS = ["Paragraphs", "Bullet Points", "Step-by-Step Guide", "Table", "Email / Message", "Code", "JSON", "Other"];
const LENGTHS = [
  { label: "Short", desc: "Under 150 words" },
  { label: "Medium", desc: "150–400 words" },
  { label: "Detailed", desc: "400+ words" },
  { label: "Custom", desc: "Specify below" },
];
const AVOID_OPTIONS = [
  "No jargon or technical language",
  "No assumptions about prior knowledge",
  "No generic filler or fluff",
  "No bullet points (prose only)",
  "No clichés or overused phrases",
  "No emojis",
  "No sales-y or hype language",
  "Don't repeat the question back",
];
const APPROACHES = [
  { label: "Stick to the facts", desc: "Accurate, conservative, no speculation" },
  { label: "Balanced", desc: "Factual but flexible — the sensible default" },
  { label: "Explore unconventional angles", desc: "Go beyond the obvious, offer fresh takes" },
  { label: "Push boundaries", desc: "Surprise me with unexpected ideas" },
];
const MAIN_STEPS = ["goal", "audience", "tone", "format", "length", "avoid", "example", "approach", "context"];

// ── Role Inference ──
function inferRole(goal, audience, domain) {
  if (domain) return domain;
  if (!goal) return null;
  const g = goal.toLowerCase();
  const rules = [
    [/code|script|develop|program|debug|api|software|app|website|html|css|javascript|python|react/,  "senior software engineer and technical architect"],
    [/market|campaign|brand|content|social media|instagram|tiktok|facebook|ads|advertising/, "senior marketing strategist with deep expertise in digital channels"],
    [/teach|explain|learn|course|tutor|lesson|curriculum|education/, "expert educator and curriculum designer"],
    [/writ|story|blog|article|copy|newsletter|post|essay/, "professional writer and editor with a sharp eye for clarity and engagement"],
    [/business|strategy|plan|startup|revenue|growth|scale/, "senior business strategist and growth advisor"],
    [/design|ui|ux|wireframe|prototype|layout|interface/, "senior UX/UI designer"],
    [/health|fitness|nutrition|exercise|gym|training|workout|strength|cardio/, "certified health and fitness specialist"],
    [/email|outreach|sales|pitch|cold|prospect|lead/, "expert sales and communications strategist"],
    [/seo|search|ranking|keyword|google|organic/, "senior SEO and search visibility specialist"],
    [/data|analy|dashboard|metric|report|spreadsheet|csv/, "senior data analyst"],
    [/recipe|cook|food|meal|restaurant|menu|bake/, "professional chef and recipe developer"],
    [/legal|contract|law|compliance|terms|policy/, "experienced legal advisor"],
    [/financ|invest|budget|money|tax|accounting|profit/, "senior financial analyst and advisor"],
    [/hire|recruit|job|interview|cv|resume|candidate/, "senior HR and talent acquisition specialist"],
    [/present|slide|deck|pitch|keynote|powerpoint/, "expert presentation designer and storytelling strategist"],
    [/product|launch|roadmap|feature|mvp|backlog/, "senior product manager"],
    [/customer|support|ticket|complaint|service/, "customer experience and support specialist"],
    [/photo|video|film|edit|camera|shoot/, "professional photographer and visual content creator"],
    [/music|song|lyric|beat|produce|mix/, "professional music producer and composer"],
    [/travel|trip|itinerary|holiday|vacation|destination/, "expert travel planner and destination specialist"],
    [/parent|child|kid|baby|toddler|family/, "child development and parenting specialist"],
    [/property|real estate|house|mortgage|rent/, "real estate and property investment advisor"],
  ];
  for (const [pattern, role] of rules) {
    if (pattern.test(g)) return role;
  }
  // Fallback: extract key nouns from goal to build a contextual role
  const cleaned = goal.replace(/[^a-zA-Z\s]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(w => w.length > 4);
  if (words.length > 0) {
    const topic = words.slice(0, 3).join(" ").toLowerCase();
    return `senior expert specialising in ${topic}`;
  }
  return "senior expert and strategic advisor";
}

// ── Prompt Builder ──
function buildPrompt(data) {
  const role = data.customRole || inferRole(data.goal, data.audience, data.domain);
  let prompt = `You are a world-class ${role}.`;
  if (data.goal) prompt += `\n\nYour task: ${data.goal}`;
  if (data.audience) prompt += `\n\nThe audience for your response: ${data.audience}. Tailor your language, depth, and examples to suit this audience specifically.`;
  if (data.tones?.length > 0) {
    prompt += `\n\nTone and style: Write in a ${data.tones.join(" and ").toLowerCase()} tone.`;
    if (data.customTone) prompt += ` Also: ${data.customTone}.`;
  } else if (data.customTone) {
    prompt += `\n\nTone and style: ${data.customTone}.`;
  }
  if (data.format) {
    prompt += `\n\nFormat: Structure your response as ${data.format.toLowerCase()}.`;
    if (data.format === "Other" && data.customFormat) prompt += ` Specifically: ${data.customFormat}.`;
  }
  if (data.length) {
    const map = { Short: "Keep your response concise — under 150 words.", Medium: "Aim for a response of 150–400 words.", Detailed: "Provide a thorough, detailed response of 400+ words." };
    prompt += `\n\nLength: ${data.length === "Custom" && data.customLength ? data.customLength : map[data.length] || ""}`;
  }
  const avoidItems = [...(data.avoidChecked || [])];
  if (data.avoidCustom) avoidItems.push(data.avoidCustom);
  if (avoidItems.length > 0) prompt += `\n\nIMPORTANT — Do NOT do the following:\n${avoidItems.map(a => `- ${a}`).join("\n")}`;
  if (data.approach) {
    const map = {
      "Stick to the facts": "Prioritise accuracy and established knowledge. Avoid speculation or unverified claims.",
      "Balanced": "Be factual and reliable, but feel free to offer thoughtful suggestions where appropriate.",
      "Explore unconventional angles": "Go beyond the obvious. Offer fresh perspectives, lesser-known insights, and creative alternatives alongside solid fundamentals.",
      "Push boundaries": "Be bold and inventive. Challenge assumptions, propose unexpected ideas, and surprise with originality — while still being useful and grounded.",
    };
    prompt += `\n\nApproach: ${map[data.approach]}`;
  }
  if (data.example) prompt += `\n\nHere is an example of the kind of output I'm looking for. Use it as a reference for quality, style, and depth — do not copy it:\n\n---\n${data.example}\n---`;
  if (data.context) prompt += `\n\nAdditional context: ${data.context}`;
  const activePU = POWER_UPS.filter(p => data.powerUps?.includes(p.id));
  if (activePU.length > 0) prompt += `\n\nAdditional instructions:\n${activePU.map(p => `- ${p.prompt}`).join("\n")}`;
  if (data.decompose) prompt += `\n\nIMPORTANT: If this task involves multiple distinct sub-tasks, break your response into clearly labelled sections — one per sub-task — so each part gets the full attention it deserves rather than a shallow pass across everything.`;
  if (data.reasoning) prompt += `\n\nReasoning approach: ${data.reasoning}`;
  if (data.successCriteria) prompt += `\n\nSuccess criteria — a great response will: ${data.successCriteria}`;
  if (data.hardConstraints) prompt += `\n\nHard constraints (must follow): ${data.hardConstraints}`;
  if (data.outputRequirements) prompt += `\n\nSpecific output requirements: ${data.outputRequirements}`;
  if (data.iterationInstructions) prompt += `\n\nIteration instructions: ${data.iterationInstructions}`;
  if (data.extraInstructions) prompt += `\n\n${data.extraInstructions}`;
  return prompt;
}

// ── Score ──
function calcScore(data) {
  let score = 0;
  let suggestions = [];
  const add = (pts, cond, text, field, type) => { if (cond) score += pts; else suggestions.push({ text, points: pts, field, type }); };
  add(18, data.goal, "Add a clear goal — this is the foundation of your prompt", "goal", "field");
  add(12, data.audience, "Define your audience so the AI tailors its response", "audience", "field");
  add(10, data.tones?.length > 0 || data.customTone, "Set a tone or style for the response", "tone", "field");
  add(7, data.format, "Choose an output format (paragraphs, bullets, table, etc.)", "format", "field");
  add(5, data.length, "Specify how long the response should be", "length", "field");
  add(10, data.avoidChecked?.length > 0 || data.avoidCustom, "Add avoid rules — what NOT to do often matters most", "avoid", "field");
  add(16, data.example, "Paste an example of good output — this is the single biggest upgrade", "example", "field");
  add(7, data.approach, "Choose a response approach (factual vs creative)", "approach", "field");
  add(7, data.context, "Add background context for a more tailored response", "context", "field");
  const puCount = data.powerUps?.length || 0;
  score += Math.min(puCount * 2, 8);
  if (puCount < 3) suggestions.push({ text: `Enable power-ups — one-click prompt boosters (${puCount} of 6 active)`, points: Math.min((3 - puCount) * 2, 6), field: "powerups", type: "powerup" });
  return { score: Math.min(score, 100), suggestions };
}

function getScoreColor(s) { return s >= 75 ? T.green : s >= 45 ? T.orange : T.red; }
function getScoreLabel(s) { return s >= 85 ? "Excellent" : s >= 70 ? "Strong" : s >= 50 ? "Decent" : s >= 30 ? "Needs work" : "Bare minimum"; }

// ── Components ──
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.textMuted, marginBottom: 5, fontFamily: T.mono }}>
        <span>Step {current} of {total}</span><span>{pct}%</span>
      </div>
      <div style={{ height: 3, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${T.accent}, ${T.accentText})`, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return <button onClick={onClick} style={{
    padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${selected ? T.chipSelectedBorder : T.chipBorder}`,
    background: selected ? T.chipSelected : T.chipBg, color: selected ? T.accentText : T.textSub,
    fontWeight: selected ? 600 : 400, fontSize: 13.5, cursor: "pointer", transition: "all 0.15s", fontFamily: T.font,
  }}>{label}</button>;
}

function Checkbox({ label, checked, onChange }) {
  return <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 14, color: T.text, lineHeight: 1.5, padding: "5px 0" }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ width: 18, height: 18, marginTop: 2, accentColor: T.accent, cursor: "pointer", flexShrink: 0 }} />{label}
  </label>;
}

function Toggle({ label, desc, active, onToggle }) {
  return <button onClick={onToggle} style={{
    display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
    padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${active ? T.chipSelectedBorder : T.border}`,
    background: active ? T.accentSoft : T.surface, cursor: "pointer", transition: "all 0.15s",
  }}>
    <div style={{ width: 36, height: 20, borderRadius: 10, position: "relative", background: active ? T.accent : T.chipBorder, transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 2, left: active ? 18 : 2, transition: "left 0.2s" }} />
    </div>
    <div>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: active ? T.accentText : T.text }}>{label}</div>
      {desc && <div style={{ fontSize: 12, color: T.textSub, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
    </div>
  </button>;
}

function RadioCard({ label, desc, selected, onClick }) {
  return <button onClick={onClick} style={{
    textAlign: "left", padding: "12px 16px", borderRadius: 10, width: "100%",
    border: `1.5px solid ${selected ? T.chipSelectedBorder : T.border}`,
    background: selected ? T.accentSoft : T.surface, cursor: "pointer", transition: "all 0.15s",
  }}>
    <div style={{ fontWeight: 600, fontSize: 13.5, color: selected ? T.accentText : T.text, marginBottom: desc ? 2 : 0 }}>{label}</div>
    {desc && <div style={{ fontSize: 12.5, color: T.textSub }}>{desc}</div>}
  </button>;
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{
    width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${T.inputBorder}`,
    fontSize: 14, fontFamily: T.font, resize: "vertical", lineHeight: 1.6,
    color: T.inputText, background: T.inputBg, boxSizing: "border-box", outline: "none", transition: "border-color 0.15s",
  }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.inputBorder} />;
}

function Btn({ children, onClick, primary, disabled, small, style: s }) {
  return <button onClick={onClick} disabled={disabled} style={{
    padding: small ? "7px 16px" : "11px 22px", borderRadius: 8,
    border: primary ? "none" : `1.5px solid ${T.border}`,
    background: primary ? (disabled ? T.chipBorder : `linear-gradient(135deg, ${T.accent}, #D4922E)`) : "transparent",
    color: primary ? (disabled ? T.textMuted : "#1a1a1a") : T.textSub,
    fontWeight: 600, fontSize: small ? 12.5 : 13.5, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: T.font, transition: "all 0.15s ease", ...s,
  }}>{children}</button>;
}

function StepHeader({ title, subtitle }) {
  return <div style={{ marginBottom: 18 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: 0, fontFamily: T.font }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.6, margin: "6px 0 0" }}>{subtitle}</p>}
  </div>;
}

function NavButtons({ onBack, onNext, nextLabel, nextDisabled, extra }) {
  return <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
    <div>{onBack && <Btn onClick={onBack}>← Back</Btn>}</div>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>{extra}{onNext && <Btn onClick={onNext} primary disabled={nextDisabled}>{nextLabel || "Next →"}</Btn>}</div>
  </div>;
}

function InlineSection({ title, summary, children, expanded, onToggle }) {
  return <div style={{ borderBottom: `1px solid ${T.border}` }}>
    <button onClick={onToggle} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", background: "transparent", border: "none", cursor: "pointer" }}>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{title}</div>
        {!expanded && summary && <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>{summary}</div>}
      </div>
      <span style={{ color: T.textMuted, fontSize: 18 }}>{expanded ? "−" : "+"}</span>
    </button>
    {expanded && <div style={{ paddingBottom: 16 }}>{children}</div>}
  </div>;
}

function ScoreGauge({ score }) {
  const color = getScoreColor(score);
  const circ = 2 * Math.PI * 44;
  return <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <svg width="68" height="68" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke={T.border} strokeWidth="6" />
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s" }} />
      <text x="50" y="48" textAnchor="middle" fontSize="22" fontWeight="700" fill={color} fontFamily={T.font}>{score}</text>
      <text x="50" y="64" textAnchor="middle" fontSize="9" fill={T.textMuted} fontFamily={T.font}>/100</text>
    </svg>
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color }}>{getScoreLabel(score)}</div>
      <div style={{ fontSize: 11.5, color: T.textSub }}>Prompt quality</div>
    </div>
  </div>;
}

// ── Main ──
export default function PromptForge() {
  const [step, setStep] = useState("welcome");
  const [superMode, setSuperMode] = useState(false);
  const [data, setData] = useState({
    goal: "", audience: "", tones: [], customTone: "", format: "", customFormat: "",
    length: "", customLength: "", avoidChecked: [], avoidCustom: "", example: "",
    approach: "", context: "", powerUps: [], decompose: false, extraInstructions: "",
    domain: "", customRole: "", reasoning: "", successCriteria: "",
    hardConstraints: "", outputRequirements: "", iterationInstructions: "",
  });
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [testResult, setTestResult] = useState("");
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const update = (f, v) => setData(d => ({ ...d, [f]: v }));
  const togglePU = id => setData(d => ({ ...d, powerUps: d.powerUps.includes(id) ? d.powerUps.filter(x => x !== id) : [...d.powerUps, id] }));

  const stepNum = () => { const i = MAIN_STEPS.indexOf(step); return i >= 0 ? i + 1 : step === "superuser" ? MAIN_STEPS.length + 1 : MAIN_STEPS.length; };
  const totalSteps = superMode ? MAIN_STEPS.length + 1 : MAIN_STEPS.length;

  const goNext = () => {
    const i = MAIN_STEPS.indexOf(step);
    if (i >= 0 && i < MAIN_STEPS.length - 1) setStep(MAIN_STEPS[i + 1]);
    else if (step === MAIN_STEPS[MAIN_STEPS.length - 1]) setStep("generate");
    else if (step === "superuser") setStep("generate");
  };
  const goBack = () => {
    if (step === "result") { setStep("generate"); return; }
    if (step === "generate") { setStep(superMode ? "superuser" : MAIN_STEPS[MAIN_STEPS.length - 1]); return; }
    if (step === "superuser") { setStep(MAIN_STEPS[MAIN_STEPS.length - 1]); return; }
    const i = MAIN_STEPS.indexOf(step);
    if (i > 0) setStep(MAIN_STEPS[i - 1]);
    else if (i === 0) setStep("welcome");
  };

  const handleGenerate = () => { setGeneratedPrompt(buildPrompt(data)); setTestResult(""); setStep("result"); setExpandedSection(null); };

  const handleTest = async () => {
    setTesting(true); setTestResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: generatedPrompt }] }),
      });
      const d = await res.json();
      setTestResult((d.content || []).filter(b => b.type === "text").map(b => b.text).join("\n") || "No response.");
    } catch (e) { setTestResult("Error: " + e.message); }
    setTesting(false);
  };

  const handleCopy = () => { navigator.clipboard.writeText(generatedPrompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const getSummary = (f) => {
    switch (f) {
      case "goal": return data.goal ? (data.goal.length > 55 ? data.goal.slice(0, 55) + "…" : data.goal) : "Not set";
      case "audience": return data.audience ? (data.audience.length > 55 ? data.audience.slice(0, 55) + "…" : data.audience) : "Not set";
      case "tone": return data.tones.length ? data.tones.join(", ") + (data.customTone ? ` + "${data.customTone}"` : "") : data.customTone || "Not set";
      case "format": return data.format ? (data.format === "Other" && data.customFormat ? data.customFormat : data.format) : "Not set";
      case "length": return data.length === "Custom" ? (data.customLength || "Custom") : (data.length || "Not set");
      case "avoid": { const c = (data.avoidChecked?.length || 0) + (data.avoidCustom ? 1 : 0); return c > 0 ? `${c} rule${c > 1 ? "s" : ""} active` : "None — this often matters most"; }
      case "example": return data.example ? "Example provided ✓" : "None — biggest single upgrade you can make";
      case "approach": return data.approach || "Not set";
      case "context": return data.context ? "Context provided ✓" : "Not set";
      case "powerups": { const c = data.powerUps?.length || 0; return c > 0 ? `${c} of 6 active` : "None active — one-click prompt boosters"; }
      default: return "";
    }
  };

  const cs = { maxWidth: 640, margin: "0 auto", padding: "32px 24px", fontFamily: T.font, color: T.text, minHeight: "100vh", boxSizing: "border-box", background: T.bg };

  // ── WELCOME ──
  if (step === "welcome") return (
    <div style={cs}>
      <div style={{ textAlign: "center", paddingTop: 48 }}>
        <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, marginBottom: 4, color: T.accent }}>⚒ PromptForge</div>
        <p style={{ fontSize: 15, color: T.textSub, lineHeight: 1.7, maxWidth: 440, margin: "18px auto 0" }}>
          Build clear, powerful prompts step by step. Answer a few questions about what you need — PromptForge assembles a ready-to-use prompt that gets better results from any AI.
        </p>
        <p style={{ fontSize: 13, color: T.textMuted, marginTop: 14, fontStyle: "italic" }}>Skip any question you're unsure about — we'll handle it intelligently.</p>
        <div style={{ marginTop: 36 }}><Btn primary onClick={() => setStep("goal")} style={{ fontSize: 15, padding: "14px 36px" }}>Start Building →</Btn></div>
      </div>
    </div>
  );

  // ── RESULT ──
  if (step === "result") {
    const { score, suggestions } = calcScore(data);
    const fieldSuggestions = suggestions.filter(s => s.type === "field");
    const puSuggestion = suggestions.find(s => s.type === "powerup");
    return (
      <div style={cs}>
        {/* Back button */}
        <div style={{ marginBottom: 16 }}><Btn onClick={goBack} small>← Back to review</Btn></div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Your Prompt</div>
          <ScoreGauge score={score} />
        </div>

        {/* Score improvement section - always visible when not 100 */}
        {suggestions.length > 0 && (
          <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>How to improve your score</div>
            <div style={{ fontSize: 12.5, color: T.textSub, marginBottom: 14 }}>Each suggestion below boosts your prompt. Tap to jump to that section and add it.</div>

            {/* Field suggestions */}
            {fieldSuggestions.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: puSuggestion ? 14 : 0 }}>
                {fieldSuggestions.map((s, i) => (
                  <button key={i} onClick={() => setExpandedSection(s.field)} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "9px 12px", borderRadius: 8, border: `1px solid ${T.border}`,
                    background: T.bg, cursor: "pointer", textAlign: "left", width: "100%",
                  }}>
                    <span style={{ fontSize: 13, color: T.textSub }}>{s.text}</span>
                    <span style={{ fontSize: 11, color: T.accent, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>+{s.points} pts →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Power-up suggestions - show actual toggles */}
            {puSuggestion && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.accentText, marginBottom: 4 }}>⚡ Power-Ups</div>
                <div style={{ fontSize: 12, color: T.textSub, marginBottom: 10 }}>One-click prompt boosters. Each adds a proven technique — toggle any on to improve your score.</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {POWER_UPS.map(p => (
                    <Toggle key={p.id} label={p.label} desc={p.desc} active={data.powerUps.includes(p.id)} onToggle={() => togglePU(p.id)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prompt display */}
        <div style={{
          background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 10,
          padding: "16px 18px", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap",
          fontFamily: T.mono, color: T.textSub, maxHeight: 350, overflowY: "auto", marginBottom: 14,
        }}>{generatedPrompt}</div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn primary onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy Prompt"}</Btn>
          <Btn onClick={handleTest} disabled={testing}>{testing ? "Testing…" : "⚡ Test This Prompt"}</Btn>
        </div>

        {testing && <div style={{ padding: 14, background: T.accentSoft, borderRadius: 8, fontSize: 13, color: T.accent, marginBottom: 16 }}>Running your prompt through Claude…</div>}

        {testResult && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: T.textSub }}>Test Output</div>
            <div style={{ background: T.inputBg, border: `1.5px solid ${T.inputBorder}`, borderRadius: 10, padding: "16px 18px", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 400, overflowY: "auto", color: T.inputText }}>{testResult}</div>
          </div>
        )}

        {/* Inline editors */}
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: T.text }}>Edit & Refine</div>
          <div style={{ fontSize: 13, color: T.textSub, marginBottom: 14 }}>Tap any section to edit in place, then hit Regenerate.</div>

          <InlineSection title="Goal" summary={getSummary("goal")} expanded={expandedSection === "goal"} onToggle={() => setExpandedSection(expandedSection === "goal" ? null : "goal")}>
            <TextArea value={data.goal} onChange={v => update("goal", v)} placeholder="What do you want the AI to do?" rows={3} />
            <div style={{ marginTop: 10 }}><Toggle label="Break into focused sub-prompts" desc="Splits complex goals into separate sections" active={data.decompose} onToggle={() => update("decompose", !data.decompose)} /></div>
          </InlineSection>

          <InlineSection title="Audience" summary={getSummary("audience")} expanded={expandedSection === "audience"} onToggle={() => setExpandedSection(expandedSection === "audience" ? null : "audience")}>
            <TextArea value={data.audience} onChange={v => update("audience", v)} placeholder="Who is the output for?" rows={2} />
          </InlineSection>

          <InlineSection title="Tone & Style" summary={getSummary("tone")} expanded={expandedSection === "tone"} onToggle={() => setExpandedSection(expandedSection === "tone" ? null : "tone")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {TONES.map(t => <Chip key={t} label={t} selected={data.tones.includes(t)} onClick={() => update("tones", data.tones.includes(t) ? data.tones.filter(x => x !== t) : [...data.tones, t])} />)}
            </div>
            <TextArea value={data.customTone} onChange={v => update("customTone", v)} placeholder="Custom tone…" rows={1} />
          </InlineSection>

          <InlineSection title="Format" summary={getSummary("format")} expanded={expandedSection === "format"} onToggle={() => setExpandedSection(expandedSection === "format" ? null : "format")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {FORMATS.map(f => <Chip key={f} label={f} selected={data.format === f} onClick={() => update("format", f)} />)}
            </div>
            {data.format === "Other" && <TextArea value={data.customFormat} onChange={v => update("customFormat", v)} placeholder="Describe format…" rows={2} />}
          </InlineSection>

          <InlineSection title="Length" summary={getSummary("length")} expanded={expandedSection === "length"} onToggle={() => setExpandedSection(expandedSection === "length" ? null : "length")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {LENGTHS.map(l => <RadioCard key={l.label} label={l.label} desc={l.desc} selected={data.length === l.label} onClick={() => update("length", l.label)} />)}
            </div>
            {data.length === "Custom" && <TextArea value={data.customLength} onChange={v => update("customLength", v)} placeholder="Custom length…" rows={1} />}
          </InlineSection>

          <InlineSection title="Avoid Rules" summary={getSummary("avoid")} expanded={expandedSection === "avoid"} onToggle={() => setExpandedSection(expandedSection === "avoid" ? null : "avoid")}>
            {AVOID_OPTIONS.map(opt => <Checkbox key={opt} label={opt} checked={data.avoidChecked.includes(opt)} onChange={() => update("avoidChecked", data.avoidChecked.includes(opt) ? data.avoidChecked.filter(x => x !== opt) : [...data.avoidChecked, opt])} />)}
            <TextArea value={data.avoidCustom} onChange={v => update("avoidCustom", v)} placeholder="Custom avoid rules…" rows={2} />
          </InlineSection>

          <InlineSection title="Example" summary={getSummary("example")} expanded={expandedSection === "example"} onToggle={() => setExpandedSection(expandedSection === "example" ? null : "example")}>
            <TextArea value={data.example} onChange={v => update("example", v)} placeholder="Paste an example of the kind of output you want…" rows={5} />
          </InlineSection>

          <InlineSection title="Approach" summary={getSummary("approach")} expanded={expandedSection === "approach"} onToggle={() => setExpandedSection(expandedSection === "approach" ? null : "approach")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {APPROACHES.map(a => <RadioCard key={a.label} label={a.label} desc={a.desc} selected={data.approach === a.label} onClick={() => update("approach", a.label)} />)}
            </div>
          </InlineSection>

          <InlineSection title="Context" summary={getSummary("context")} expanded={expandedSection === "context"} onToggle={() => setExpandedSection(expandedSection === "context" ? null : "context")}>
            <TextArea value={data.context} onChange={v => update("context", v)} placeholder="Background info, constraints, brand voice…" rows={4} />
          </InlineSection>

          <InlineSection title="Power-Ups" summary={getSummary("powerups")} expanded={expandedSection === "powerups"} onToggle={() => setExpandedSection(expandedSection === "powerups" ? null : "powerups")}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {POWER_UPS.map(p => <Toggle key={p.id} label={p.label} desc={p.desc} active={data.powerUps.includes(p.id)} onToggle={() => togglePU(p.id)} />)}
            </div>
          </InlineSection>

          {/* Extra instructions */}
          <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Extra instructions</div>
            <div style={{ fontSize: 12, color: T.textSub, marginBottom: 8 }}>Add anything else directly to the prompt.</div>
            <TextArea value={data.extraInstructions} onChange={v => update("extraInstructions", v)} placeholder='e.g. "Ask me questions before you start" or "Make sure the output is in full colour" or "Include images where relevant"' rows={3} />
          </div>

          {/* Super user */}
          {!superMode ? (
            <button onClick={() => { setSuperMode(true); setExpandedSection("superuser"); }} style={{
              width: "100%", padding: "12px", borderRadius: 8, border: `1.5px solid ${T.accent}`,
              background: "transparent", cursor: "pointer", color: T.accent, fontWeight: 600,
              fontSize: 13, fontFamily: T.font, marginTop: 12,
            }}>+ Unlock Super User Mode</button>
          ) : (
            <InlineSection title="Super User — Advanced" summary="Fine-tune for maximum precision" expanded={expandedSection === "superuser"} onToggle={() => setExpandedSection(expandedSection === "superuser" ? null : "superuser")}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Domain / Field</label>
                  <TextArea value={data.domain} onChange={v => update("domain", v)} placeholder='e.g. "E-commerce conversion optimisation", "Longevity medicine", "B2B SaaS marketing", "Primary school education"' rows={1} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Custom Role</label>
                  <TextArea value={data.customRole} onChange={v => update("customRole", v)} placeholder='e.g. "a Shopify conversion specialist with 15 years in DTC brands", "a paediatric nutritionist who works with fussy eaters"' rows={2} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Reasoning Style</label>
                  <TextArea value={data.reasoning} onChange={v => update("reasoning", v)} placeholder='e.g. "Chain-of-thought — show your working", "Argue both sides then give your verdict", "Use first principles thinking"' rows={2} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Success Criteria</label>
                  <TextArea value={data.successCriteria} onChange={v => update("successCriteria", v)} placeholder='e.g. "Actionable steps with specific numbers", "Every recommendation backed by a real example", "Clear enough for a total beginner"' rows={2} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Hard Constraints</label>
                  <TextArea value={data.hardConstraints} onChange={v => update("hardConstraints", v)} placeholder='e.g. "UK English only", "Under 500 words", "No competitor names", "Budget max €5,000"' rows={2} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Output Requirements</label>
                  <TextArea value={data.outputRequirements} onChange={v => update("outputRequirements", v)} placeholder='e.g. "Start with an executive summary", "End with 3 action items", "Include a comparison table"' rows={2} />
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Iteration Instructions</label>
                  <TextArea value={data.iterationInstructions} onChange={v => update("iterationInstructions", v)} placeholder='e.g. "Draft, then review as a harsh editor and produce a tighter version", "List 3 things you could improve after answering"' rows={2} />
                </div>
              </div>
            </InlineSection>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn primary onClick={handleGenerate}>Regenerate Prompt ⚡</Btn>
          <Btn onClick={() => {
            setData({ goal: "", audience: "", tones: [], customTone: "", format: "", customFormat: "", length: "", customLength: "", avoidChecked: [], avoidCustom: "", example: "", approach: "", context: "", powerUps: [], decompose: false, extraInstructions: "", domain: "", customRole: "", reasoning: "", successCriteria: "", hardConstraints: "", outputRequirements: "", iterationInstructions: "" });
            setSuperMode(false); setGeneratedPrompt(""); setTestResult(""); setStep("welcome");
          }} small style={{ color: T.textMuted }}>Start fresh</Btn>
        </div>
      </div>
    );
  }

  // ── GENERATE REVIEW ──
  if (step === "generate") {
    const items = [
      { label: "Goal", val: getSummary("goal") }, { label: "Audience", val: getSummary("audience") },
      { label: "Tone", val: getSummary("tone") }, { label: "Format", val: getSummary("format") },
      { label: "Length", val: getSummary("length") }, { label: "Avoid", val: getSummary("avoid") },
      { label: "Example", val: getSummary("example") }, { label: "Approach", val: getSummary("approach") },
      { label: "Context", val: getSummary("context") }, { label: "Power-Ups", val: getSummary("powerups") },
    ];
    const { score } = calcScore(data);
    return (
      <div style={cs}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 14 }}>
          <StepHeader title="Ready to generate" subtitle="Review your selections below." />
          <ScoreGauge score={score} />
        </div>
        <div style={{ background: T.surface, borderRadius: 10, padding: "14px 18px", marginBottom: 20, border: `1px solid ${T.border}` }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < items.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: 13, color: item.val.includes("Not set") || item.val.includes("None") ? T.textMuted : T.text, textAlign: "right", maxWidth: "60%" }}>{item.val}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn onClick={goBack}>← Back</Btn>
          <Btn primary onClick={handleGenerate}>Generate Prompt ⚡</Btn>
          {!superMode && <Btn onClick={() => { setSuperMode(true); setStep("superuser"); }} style={{ borderColor: T.accent, color: T.accent }}>Super User Mode</Btn>}
        </div>
      </div>
    );
  }

  // ── WIZARD ──
  return (
    <div style={cs}>
      {step !== "superuser" && <ProgressBar current={stepNum()} total={totalSteps} />}

      {step === "goal" && <>
        <StepHeader title="What are you trying to achieve?" subtitle="Describe what you want the AI to do or produce. The more specific you are, the better the result." />
        <TextArea value={data.goal} onChange={v => update("goal", v)} placeholder='e.g. "Create a 12-week training program for a beginner" or "Write a cold outreach email for my SaaS product"' rows={4} />
        <div style={{ marginTop: 14 }}>
          <Toggle label="Break into focused sub-prompts" desc="If your goal has multiple parts, this splits them into separate sections for better results" active={data.decompose} onToggle={() => update("decompose", !data.decompose)} />
        </div>
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "audience" && <>
        <StepHeader title="Who is this for?" subtitle="Who will read or use the AI's response? This shapes the language, depth, and examples used." />
        <TextArea value={data.audience} onChange={v => update("audience", v)} placeholder='e.g. "A busy 45-year-old entrepreneur" or "University students studying marketing"' rows={3} />
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "tone" && <>
        <StepHeader title="Tone & style of the answer" subtitle="How should the AI's response sound? Pick one or more, or write your own." />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {TONES.map(t => <Chip key={t} label={t} selected={data.tones.includes(t)} onClick={() => update("tones", data.tones.includes(t) ? data.tones.filter(x => x !== t) : [...data.tones, t])} />)}
        </div>
        <TextArea value={data.customTone} onChange={v => update("customTone", v)} placeholder="Or describe a custom tone, e.g. 'Like a helpful older brother who knows his stuff'" rows={2} />
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "format" && <>
        <StepHeader title="Output format" subtitle="How should the AI structure its response?" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {FORMATS.map(f => <Chip key={f} label={f} selected={data.format === f} onClick={() => update("format", f)} />)}
        </div>
        {data.format === "Other" && <TextArea value={data.customFormat} onChange={v => update("customFormat", v)} placeholder="Describe the format…" rows={2} />}
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "length" && <>
        <StepHeader title="How long should the answer be?" subtitle="This controls the AI's response length — not the prompt itself." />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {LENGTHS.map(l => <RadioCard key={l.label} label={l.label} desc={l.desc} selected={data.length === l.label} onClick={() => update("length", l.label)} />)}
        </div>
        {data.length === "Custom" && <TextArea value={data.customLength} onChange={v => update("customLength", v)} placeholder="e.g. 'Exactly 280 characters' or 'Around 800 words'" rows={1} />}
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "avoid" && <>
        <StepHeader title="What should the AI avoid?" subtitle="Tick any that apply and add your own. What you exclude often matters more than what you include." />
        <div style={{ marginBottom: 14 }}>
          {AVOID_OPTIONS.map(opt => <Checkbox key={opt} label={opt} checked={data.avoidChecked.includes(opt)} onChange={() => update("avoidChecked", data.avoidChecked.includes(opt) ? data.avoidChecked.filter(x => x !== opt) : [...data.avoidChecked, opt])} />)}
        </div>
        <TextArea value={data.avoidCustom} onChange={v => update("avoidCustom", v)} placeholder="Anything else? e.g. 'Don't mention competitors' or 'No American spelling'" rows={2} />
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "example" && <>
        <StepHeader title="Show what good looks like" subtitle="Paste an example of the kind of output you want. This is the single most powerful thing you can do — it gives the AI a quality benchmark to aim for." />
        <TextArea value={data.example} onChange={v => update("example", v)} placeholder="Paste a sample response, paragraph, email, or anything that shows the style, depth, or quality you're after…" rows={6} />
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "approach" && <>
        <StepHeader title="How should the AI approach this?" subtitle="This shapes whether the response plays it safe or gets inventive." />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {APPROACHES.map(a => <RadioCard key={a.label} label={a.label} desc={a.desc} selected={data.approach === a.label} onClick={() => update("approach", a.label)} />)}
        </div>
        <NavButtons onBack={goBack} onNext={goNext} />
      </>}

      {step === "context" && <>
        <StepHeader title="Any extra context?" subtitle="Background info, brand guidelines, constraints — anything the AI needs to know to do a great job." />
        <TextArea value={data.context} onChange={v => update("context", v)} placeholder="e.g. 'We're a small Irish jewellery brand, our tone is warm but never corporate' or 'The reader already knows basic Python'" rows={4} />
        <div style={{ marginTop: 18, marginBottom: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>⚡ Power-Ups</div>
          <div style={{ fontSize: 13, color: T.textSub, marginBottom: 12, lineHeight: 1.5 }}>One-click prompt boosters. Each one adds a proven technique to your prompt — toggle on whichever ones make sense for your task.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {POWER_UPS.map(p => <Toggle key={p.id} label={p.label} desc={p.desc} active={data.powerUps.includes(p.id)} onToggle={() => togglePU(p.id)} />)}
          </div>
        </div>
        <NavButtons onBack={goBack} onNext={() => superMode ? setStep("superuser") : setStep("generate")} nextLabel={superMode ? "Advanced →" : "Review & Generate →"}
          extra={!superMode && <Btn onClick={() => { setSuperMode(true); setStep("superuser"); }} small style={{ borderColor: T.accent, color: T.accent }}>Super User Mode</Btn>} />
      </>}

      {step === "superuser" && <>
        <div style={{ display: "inline-block", padding: "3px 10px", background: T.accentSoft, color: T.accent, borderRadius: 10, fontSize: 11, fontWeight: 700, marginBottom: 14, letterSpacing: 0.5 }}>SUPER USER MODE</div>
        <StepHeader title="Advanced controls" subtitle="Fine-tune the prompt for maximum precision. All optional — each field has detailed examples." />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Domain / Field</label>
            <TextArea value={data.domain} onChange={v => update("domain", v)} placeholder='e.g. "E-commerce conversion optimisation", "Longevity medicine", "B2B SaaS marketing"' rows={1} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Custom Role</label>
            <TextArea value={data.customRole} onChange={v => update("customRole", v)} placeholder='e.g. "a Shopify conversion specialist with 15 years in DTC brands", "a Y Combinator startup advisor"' rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Reasoning Style</label>
            <TextArea value={data.reasoning} onChange={v => update("reasoning", v)} placeholder='e.g. "Chain-of-thought — show your working", "Argue both sides then give your verdict"' rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Success Criteria</label>
            <TextArea value={data.successCriteria} onChange={v => update("successCriteria", v)} placeholder='e.g. "Actionable steps with specific numbers", "Clear enough for a total beginner"' rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Hard Constraints</label>
            <TextArea value={data.hardConstraints} onChange={v => update("hardConstraints", v)} placeholder='e.g. "UK English only", "Under 500 words", "Budget max €5,000"' rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Output Requirements</label>
            <TextArea value={data.outputRequirements} onChange={v => update("outputRequirements", v)} placeholder='e.g. "Start with executive summary", "End with 3 action items", "Include comparison table"' rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: T.textSub, display: "block", marginBottom: 4 }}>Iteration Instructions</label>
            <TextArea value={data.iterationInstructions} onChange={v => update("iterationInstructions", v)} placeholder='e.g. "Draft, review as a harsh editor, produce tighter version", "List 3 improvements after answering"' rows={2} />
          </div>
        </div>
        <NavButtons onBack={goBack} onNext={() => setStep("generate")} nextLabel="Review & Generate →" />
      </>}
    </div>
  );
}
