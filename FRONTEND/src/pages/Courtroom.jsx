import React, { useState, useRef, useEffect } from "react";
import { Scale, Swords, Shield, TrendingUp, TrendingDown, Gavel, Send, FileSearch, ScrollText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api, apiRoot } from "../context/AuthContext";

// ---------------------------------------------------------------------------
// THE COURTROOM — an AI decision-debate engine
// Skeptic (prosecution) vs Optimist (defense), judged by a Verdict agent.
// ---------------------------------------------------------------------------

const CATEGORIES = [
    { id: "startup", label: "Startup Idea" },
    { id: "career", label: "Career Move" },
    { id: "purchase", label: "Big Purchase" },
];

// Demo transcript used if the backend isn't reachable, so the UI is always
// presentable on its own.
const DEMO_RESULT = {
    idea: "An AI app that tutors students for competitive exams",
    rounds: {
        round1: {
            skeptic:
                "• The edtech space is brutally crowded — Byju's, Unacademy, and a hundred YouTube channels already fight for the same student.\n• Competitive-exam prep needs deep subject trust; a new AI brand has none.\n• Monetization is hard when free AI tutors (ChatGPT, Gemini) already exist.",
            optimist:
                "• Personalization is the real gap — most players still push one-size-fits-all content.\n• A focused niche (one exam, one region) can win before going broad.\n• AI lets you offer 24/7 doubt-solving at a fraction of tuition cost.",
        },
        round2: {
            skeptic:
                "• Personalization sounds nice, but building a real adaptive engine takes data most new apps don't have yet.\n• Regional/niche focus caps your total addressable market fast.",
            optimist:
                "• You can bootstrap adaptivity with a small question bank plus LLM reasoning — you don't need years of data to start being useful.\n• A smaller TAM done well beats a huge TAM done generically; niches convert into word-of-mouth.",
        },
        dataInsights:
            "• India's online test-prep market is estimated near $3–4B and still growing double digits.\n• Byju's and Unacademy have both faced well-documented financial and trust setbacks recently, opening room for a leaner challenger.\n• Students in tier-2/3 cities are the fastest-growing user segment, and are underserved by premium-priced incumbents.",
    },
    verdict: {
        decision: "Conditional",
        confidence: 72,
        skeptic_score: 45,
        optimist_score: 62,
        top_risks: [
            "Crowded market with well-funded incumbents",
            "Trust and credibility take time to build",
            "Free AI alternatives lower willingness to pay",
        ],
        top_opportunities: [
            "Underserved tier-2/3 city segment",
            "Real personalization is still rare",
            "Incumbent stumbles create an opening",
        ],
        summary:
            "Worth pursuing if narrowed to one exam and one underserved region first — the broad play loses to incumbents, but a sharp niche has room to breathe.",
    },
};

function scoreToTilt(skeptic, optimist) {
    // Positive tilt = leans optimist (right), negative = leans skeptic (left)
    const diff = optimist - skeptic; // -100..100
    const clamped = Math.max(-100, Math.min(100, diff));
    return (clamped / 100) * 14; // degrees, max ~14deg
}

const BEAM_WIDTH = 220; // px, the horizontal line that tilts

function Beam({ skeptic, optimist, active }) {
    const tilt = active ? scoreToTilt(skeptic, optimist) : 0;
    const panDrop = 22; // how far a pan sinks at full tilt, in px

    return (
        <div className="flex flex-col items-center select-none" aria-hidden="true">
            <div className="relative" style={{ width: BEAM_WIDTH + 60, height: 110 }}>
                {/* vertical post — centered via left:50% + negative margin, never touched by rotate */}
                <div
                    className="absolute top-11 rounded-full"
                    style={{
                        left: "50%",
                        marginLeft: -3,
                        width: 6,
                        height: 60,
                        background: "linear-gradient(180deg,#d4af37,#8a6d1a)",
                    }}
                />
                {/* fulcrum cap */}
                <div
                    className="absolute top-9 rounded-full z-20"
                    style={{ left: "50%", marginLeft: -7, width: 14, height: 14, background: "#f0d878", boxShadow: "0 0 10px #d4af3799" }}
                />
                {/* beam — only transform applied is rotate, origin stays true center */}
                <div
                    className="absolute top-11 transition-transform duration-[1400ms] ease-out"
                    style={{
                        left: "50%",
                        marginLeft: -BEAM_WIDTH / 2,
                        width: BEAM_WIDTH,
                        transformOrigin: "center center",
                        transform: `rotate(${tilt}deg)`,
                    }}
                >
                    <div
                        className="h-1 rounded-full w-full"
                        style={{ background: "linear-gradient(90deg,#7f1d1d,#d4af37,#14532d)" }}
                    />
                    {/* left pan (skeptic) */}
                    <div
                        className="absolute top-1 flex items-center justify-center w-9 h-9 rounded-full border transition-transform duration-[1400ms]"
                        style={{
                            left: 0,
                            marginLeft: -18,
                            borderColor: "#7f1d1d",
                            background: "radial-gradient(circle at 30% 30%, #3a1010, #1a0505)",
                            transform: `translateY(${tilt > 0 ? -tilt * (panDrop / 14) : Math.abs(tilt) * (panDrop / 14)}px)`,
                        }}
                    >
                        <Swords size={15} color="#ef4444" />
                    </div>
                    {/* right pan (optimist) */}
                    <div
                        className="absolute top-1 flex items-center justify-center w-9 h-9 rounded-full border transition-transform duration-[1400ms]"
                        style={{
                            right: 0,
                            marginRight: -18,
                            borderColor: "#14532d",
                            background: "radial-gradient(circle at 30% 30%, #103a1a, #051a0a)",
                            transform: `translateY(${tilt > 0 ? tilt * (panDrop / 14) : -Math.abs(tilt) * (panDrop / 14)}px)`,
                        }}
                    >
                        <Shield size={15} color="#4ade80" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InkTyping({ color }) {
    return (
        <div className="flex items-center gap-1.5 py-2">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                        background: color,
                        animation: `inkDot 1.1s ${i * 0.15}s infinite ease-in-out`,
                    }}
                />
            ))}
        </div>
    );
}

// Turns simple **bold** markdown into real <strong> tags instead of showing
// literal asterisks — LLM output often includes this.
function renderFormatted(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} style={{ color: "#f0eee8" }}>{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

function ArgumentCard({ side, text, roundLabel, visible }) {
    const isSkeptic = side === "skeptic";
    const accent = isSkeptic ? "#ef4444" : "#4ade80";
    const dim = isSkeptic ? "#7f1d1d" : "#14532d";
    const Icon = isSkeptic ? Swords : Shield;
    const name = isSkeptic ? "The Skeptic" : "The Optimist";

    return (
        <div
            className={`relative rounded-xl border p-5 backdrop-blur-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            style={{
                borderColor: dim,
                background: `linear-gradient(160deg, ${dim}22, #0b0b0d 65%)`,
                boxShadow: visible ? `0 0 24px -8px ${accent}55` : "none",
            }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${accent}22`, border: `1px solid ${accent}66` }}
                >
                    <Icon size={13} color={accent} />
                </div>
                <span className="text-xs tracking-wide uppercase font-semibold" style={{ color: accent, fontFamily: "Inter, sans-serif" }}>
                    {name}
                </span>
                <span className="text-[10px] ml-auto uppercase tracking-widest" style={{ color: "#6b6b73" }}>
                    {roundLabel}
                </span>
            </div>
            {text ? (
                <p className="text-[13.5px] leading-relaxed whitespace-pre-line" style={{ color: "#d9d7d0", fontFamily: "Inter, sans-serif" }}>
                    {renderFormatted(text)}
                </p>
            ) : (
                <InkTyping color={accent} />
            )}
        </div>
    );
}

function EvidenceCard({ text, visible }) {
    return (
        <div
            className={`rounded-xl border p-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ borderColor: "#8a6d1a", background: "linear-gradient(160deg,#2a2308,#0b0b0d 70%)" }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#d4af3722", border: "1px solid #d4af3766" }}>
                    <FileSearch size={13} color="#d4af37" />
                </div>
                <span className="text-xs tracking-wide uppercase font-semibold" style={{ color: "#d4af37", fontFamily: "Inter, sans-serif" }}>
                    Evidence on Record
                </span>
            </div>
            {text ? (
                <p className="text-[13.5px] leading-relaxed whitespace-pre-line" style={{ color: "#d9d7d0", fontFamily: "Inter, sans-serif" }}>
                    {renderFormatted(text)}
                </p>
            ) : (
                <InkTyping color="#d4af37" />
            )}
        </div>
    );
}

function ScoreBar({ label, value, color }) {
    return (
        <div>
            <div className="flex justify-between text-[11px] mb-1" style={{ color: "#9c9a94", fontFamily: "JetBrains Mono, monospace" }}>
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1c1c1f" }}>
                <div
                    className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    style={{ width: `${value}%`, background: color }}
                />
            </div>
        </div>
    );
}

function Verdict({ v, visible }) {
    if (!v) return null;
    const decisionColor = v.decision === "Go" ? "#4ade80" : v.decision === "No-Go" ? "#ef4444" : "#d4af37";
    return (
        <div
            className={`relative rounded-2xl border p-7 mt-2 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
                }`}
            style={{
                borderColor: "#8a6d1a77",
                background: "linear-gradient(180deg, #16130a 0%, #0b0b0d 100%)",
                boxShadow: visible ? "0 0 50px -12px #d4af3744" : "none",
            }}
        >
            <div className="absolute -top-4 left-7 px-3 py-1 rounded-full flex items-center gap-1.5" style={{ background: "#0b0b0d", border: "1px solid #d4af3766" }}>
                <Gavel size={12} color="#d4af37" />
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#d4af37" }}>Verdict</span>
            </div>

            <div className="flex items-start justify-between flex-wrap gap-4 mt-2">
                <div>
                    <div className="text-3xl font-bold" style={{ color: decisionColor, fontFamily: "Fraunces, serif" }}>
                        {v.decision}
                    </div>
                    <p className="text-[13.5px] mt-2 max-w-md leading-relaxed" style={{ color: "#c9c7c0" }}>
                        {v.summary}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest" style={{ color: "#6b6b73" }}>Confidence</div>
                    <div className="text-2xl font-semibold" style={{ color: "#e8e6e1", fontFamily: "JetBrains Mono, monospace" }}>{v.confidence}%</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <ScoreBar label="SKEPTIC" value={v.skeptic_score} color="#ef4444" />
                <ScoreBar label="OPTIMIST" value={v.optimist_score} color="#4ade80" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <TrendingDown size={13} color="#ef4444" />
                        <span className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: "#ef4444" }}>Top Risks</span>
                    </div>
                    <ul className="space-y-1.5">
                        {v.top_risks.map((r, i) => (
                            <li key={i} className="text-[13px] leading-snug" style={{ color: "#c9c7c0" }}>— {r}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp size={13} color="#4ade80" />
                        <span className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: "#4ade80" }}>Top Opportunities</span>
                    </div>
                    <ul className="space-y-1.5">
                        {v.top_opportunities.map((o, i) => (
                            <li key={i} className="text-[13px] leading-snug" style={{ color: "#c9c7c0" }}>— {o}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Courtroom() {
    const navigate = useNavigate();
    const [idea, setIdea] = useState("");
    const [category, setCategory] = useState("startup");
    const [stage, setStage] = useState("idle"); // idle | round1 | round2 | evidence | verdict-loading | done
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [usedDemo, setUsedDemo] = useState(false);
    const stageTimers = useRef([]);
    const requestId = useRef(0);

    const skeptic1 = result?.rounds?.round1?.skeptic;
    const optimist1 = result?.rounds?.round1?.optimist;
    const skeptic2 = result?.rounds?.round2?.skeptic;
    const optimist2 = result?.rounds?.round2?.optimist;
    const evidence = result?.rounds?.dataInsights;
    const verdict = result?.verdict;

    const isActive = stage !== "idle";

    const currentTilt = { skeptic: 50, optimist: 50 };
    const tiltActive = stage === "done";

    async function presentCase() {
        if (!idea.trim()) return;

        // Cancel any timers from a previous, still-unfinished debate so its
        // results can never bleed into this new one.
        stageTimers.current.forEach(clearTimeout);
        stageTimers.current = [];
        const myRequestId = ++requestId.current;

        setError(null);
        setResult(null);
        setUsedDemo(false);
        setStage("round1");

        let data;
        try {
            const res = await apiRoot.post("/debate", { idea, category });
            data = res.data;
        } catch (e) {
            // Backend not reachable — fall back to a demo transcript so the room
            // never goes empty during a live walkthrough.
            await new Promise((r) => setTimeout(r, 1400));
            data = { ...DEMO_RESULT, idea };
            if (myRequestId === requestId.current) setUsedDemo(true);
        }

        // If a newer request has started since this one began, drop this result.
        if (myRequestId !== requestId.current) return;

        setResult(data);
        // Reveal in stages regardless of whether it was live or demo data,
        // so the debate always feels like it's unfolding.
        setStage("round1");
        stageTimers.current.push(setTimeout(() => { if (myRequestId === requestId.current) setStage("round2"); }, 1100));
        stageTimers.current.push(setTimeout(() => { if (myRequestId === requestId.current) setStage("evidence"); }, 2200));
        stageTimers.current.push(setTimeout(() => { if (myRequestId === requestId.current) setStage("verdict-loading"); }, 3300));
        stageTimers.current.push(setTimeout(() => { if (myRequestId === requestId.current) setStage("done"); }, 4600));
    }

    useEffect(() => () => stageTimers.current.forEach(clearTimeout), []);

    const showRound1 = ["round1", "round2", "evidence", "verdict-loading", "done"].includes(stage);
    const showRound2 = ["round2", "evidence", "verdict-loading", "done"].includes(stage);
    const showEvidence = ["evidence", "verdict-loading", "done"].includes(stage);
    const showVerdict = stage === "done";
    const verdictLoading = stage === "verdict-loading";

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center px-4 py-10 sm:py-14"
            style={{ background: "radial-gradient(ellipse at top, #131215 0%, #08080a 60%)", fontFamily: "Inter, sans-serif" }}
        >
            <style>{`
        @keyframes inkDot { 0%, 60%, 100% { opacity: 0.25; transform: translateY(0);} 30% { opacity: 1; transform: translateY(-3px);} }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>

            {/* Nav */}
            <button
                onClick={() => navigate("/dashboard")}
                className="fixed top-5 left-5 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors z-30"
                style={{ borderColor: "#2a2a2e", color: "#8a8880", background: "#0b0b0dcc" }}
            >
                <ArrowLeft size={12} /> Dashboard
            </button>

            {/* Header */}
            <div className="text-center mb-3" style={{ animation: "fadeDown 0.8s ease-out" }}>
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Scale size={20} color="#d4af37" />
                    <span className="text-[11px] uppercase tracking-[0.35em]" style={{ color: "#8a8880" }}>Now in Session</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                    The Courtroom
                </h1>
                <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "#8a8880" }}>
                    State your case. Two agents will argue it from opposite sides before a verdict is reached.
                </p>
            </div>

            {/* Beam */}
            <Beam skeptic={verdict?.skeptic_score ?? currentTilt.skeptic} optimist={verdict?.optimist_score ?? currentTilt.optimist} active={tiltActive} />

            {/* Input */}
            <div className="w-full max-w-xl mt-2">
                <div className="flex gap-2 justify-center mb-3 flex-wrap">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setCategory(c.id)}
                            className="text-[11px] px-3 py-1.5 rounded-full uppercase tracking-wide transition-colors duration-300 border"
                            style={
                                category === c.id
                                    ? { background: "#d4af3722", borderColor: "#d4af3799", color: "#d4af37" }
                                    : { background: "transparent", borderColor: "#333338", color: "#7a7873" }
                            }
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
                <div
                    className="rounded-xl border p-2 flex gap-2 items-end transition-shadow duration-300"
                    style={{ borderColor: "#2a2a2e", background: "#111113" }}
                >
                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g. Should I quit my job to build a startup full-time?"
                        rows={2}
                        className="flex-1 bg-transparent resize-none outline-none text-sm px-3 py-2"
                        style={{ color: "#e8e6e1" }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                presentCase();
                            }
                        }}
                    />
                    <button
                        onClick={presentCase}
                        disabled={!idea.trim() || (isActive && stage !== "done")}
                        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30"
                        style={{ background: "#d4af37", color: "#1a1608" }}
                    >
                        <Send size={16} />
                    </button>
                </div>
                {usedDemo && stage === "done" && (
                    <p className="text-[11px] text-center mt-2" style={{ color: "#6b6b73" }}>
                        Showing a demo transcript — connect the backend at localhost:5000 to see this live.
                    </p>
                )}
            </div>

            {/* Debate stage */}
            {isActive && (
                <div className="w-full max-w-3xl mt-10 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <ArgumentCard side="skeptic" text={skeptic1} roundLabel="Round 1 — Opening" visible={showRound1} />
                        <ArgumentCard side="optimist" text={optimist1} roundLabel="Round 1 — Opening" visible={showRound1} />
                    </div>

                    {showRound2 && (
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ArgumentCard side="skeptic" text={skeptic2} roundLabel="Round 2 — Rebuttal" visible={showRound2} />
                            <ArgumentCard side="optimist" text={optimist2} roundLabel="Round 2 — Rebuttal" visible={showRound2} />
                        </div>
                    )}

                    {showEvidence && <EvidenceCard text={evidence} visible={showEvidence} />}

                    {(verdictLoading || showVerdict) && (
                        <div className="flex items-center gap-2 justify-center py-2">
                            <ScrollText size={14} color="#d4af37" style={{ opacity: verdictLoading ? 1 : 0, transition: "opacity 0.4s" }} />
                            {verdictLoading && <span className="text-[11px] uppercase tracking-widest" style={{ color: "#8a8880" }}>The judge is deliberating…</span>}
                        </div>
                    )}

                    <Verdict v={verdict} visible={showVerdict} />
                </div>
            )}

            {error && <p className="text-sm mt-6" style={{ color: "#ef4444" }}>{error}</p>}
        </div>
    );
}