import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Scale,
    Gavel,
    Search,
    Swords,
    Brain,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Play,
    GraduationCap,
    Rocket,
    Briefcase,
    Users,
    RefreshCw,
    Shield,
    Database,
    FileText,
    TrendingUp,
    Check
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AmbientBackground, GoldButton, Card } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Hero Living Scale State
    const [scaleTilt, setScaleTilt] = useState(-8);
    const [heroPhase, setHeroPhase] = useState("skeptic");

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroPhase((prev) => {
                if (prev === "skeptic") {
                    setScaleTilt(8);
                    return "optimist";
                } else if (prev === "optimist") {
                    setScaleTilt(0);
                    return "judge";
                } else {
                    setScaleTilt(-8);
                    return "skeptic";
                }
            });
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    // Live Demo State
    const [demoInput, setDemoInput] = useState("Should I quit college to build a SaaS startup full-time?");
    const [demoStep, setDemoStep] = useState(0);

    const sampleIdeas = [
        "Should I quit college to build a SaaS startup full-time?",
        "Should our startup pivot from B2B to B2C AI tools?",
        "Should I accept a 30% pay cut for early-stage equity?"
    ];

    const runInteractiveDemo = (ideaToRun) => {
        const text = ideaToRun !== undefined ? ideaToRun : demoInput;
        if (!text.trim() || (demoStep > 0 && demoStep < 5)) return;

        setDemoInput(text);
        setDemoStep(1);

        setTimeout(() => setDemoStep(2), 1200);
        setTimeout(() => setDemoStep(3), 2600);
        setTimeout(() => setDemoStep(4), 4000);
        setTimeout(() => {
            setDemoStep(5);
        }, 5200);
    };

    const handleCTA = () => {
        if (user) navigate("/dashboard");
        else navigate("/signup");
    };

    return (
        <div className="min-h-screen text-[#e8e6e1] selection:bg-[#d4af37]/30 selection:text-[#f0eee8]" style={{ fontFamily: "Inter, sans-serif" }}>
            <AmbientBackground />

            {/* SUBTLE, CALM NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-[#1c1c1f] bg-[#08080a]/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="p-1.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 group-hover:border-[#d4af37]/60 transition-colors">
                            <Scale size={18} className="text-[#d4af37]" />
                        </div>
                        <span className="text-lg font-semibold tracking-wide text-[#f0eee8]" style={{ fontFamily: "Fraunces, serif" }}>
                            The Courtroom
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-xs text-[#8a8880]">
                        <a href="#how-it-works" className="hover:text-[#d4af37] transition-colors">How it Works</a>
                        <a href="#demo" className="hover:text-[#d4af37] transition-colors">See a Trial</a>
                        <a href="#inside" className="hover:text-[#d4af37] transition-colors">Inside</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <GoldButton onClick={() => navigate("/dashboard")} className="text-xs px-4 py-2">Dashboard</GoldButton>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-xs font-medium text-[#c9c7c0] hover:text-[#f0eee8] px-3 py-2 rounded-lg transition-colors"
                                >
                                    Sign In
                                </button>
                                <GoldButton onClick={handleCTA} className="text-xs px-4 py-2">
                                    Put My Idea On Trial
                                </GoldButton>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-28 md:pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2a2a2e] bg-[#111113] text-[11px] font-mono text-[#d4af37] mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                            COURT IN SESSION • DOCKET #2026
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#f0eee8] leading-[1.1]"
                            style={{ fontFamily: "Fraunces, serif" }}
                        >
                            Before You Decide, <br />
                            <span className="text-[#d4af37]">Put It On Trial.</span>
                        </motion.h1>

                        {/* Courtroom Story Copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-sm sm:text-lg text-[#a8a6a0] max-w-2xl mx-auto leading-relaxed"
                        >
                            Every important decision deserves a fair hearing. Present your case. Let two AI advocates argue both sides before an impartial judge delivers the verdict.
                        </motion.p>

                        {/* 3 Proof Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#c9c7c0] font-medium"
                        >
                            <span className="flex items-center gap-1.5 text-[#4ade80]">
                                <Check size={14} className="text-[#4ade80]" /> Multi-Agent Debate
                            </span>
                            <span className="text-[#4a4a50]">•</span>
                            <span className="flex items-center gap-1.5 text-[#4ade80]">
                                <Check size={14} className="text-[#4ade80]" /> Live Web Research
                            </span>
                            <span className="text-[#4a4a50]">•</span>
                            <span className="flex items-center gap-1.5 text-[#4ade80]">
                                <Check size={14} className="text-[#4ade80]" /> Decision Memory
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
                        >
                            <GoldButton
                                onClick={handleCTA}
                                className="w-full sm:w-auto text-xs px-7 py-3 flex items-center justify-center gap-2 group shadow-lg"
                            >
                                <span>Put My Idea On Trial</span>
                                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                            </GoldButton>

                            <a
                                href="#demo"
                                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#2a2a2e] text-[#c9c7c0] hover:text-[#f0eee8] hover:border-[#4a4a50] bg-[#111113] transition-all text-xs font-semibold flex items-center justify-center gap-2"
                            >
                                <Play size={14} className="text-[#d4af37]" />
                                Watch Live Case
                            </a>
                        </motion.div>
                    </div>

                    {/* HERO LIVING CASE PREVIEW & LIVING SCALE (#241) */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-14 max-w-3xl mx-auto"
                    >
                        <Card className="p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                            {/* Card Header Bar */}
                            <div className="flex items-center justify-between pb-4 border-b border-[#1e1e21] text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-[#d4af37]" />
                                    <span className="text-[#f0eee8] font-bold">CASE FILE #241</span>
                                    <span className="text-[#6b6b73]">•</span>
                                    <span className="text-[#8a8880] hidden sm:inline">HIGH-STAKES CAREER PIVOT</span>
                                </div>
                                <span className="flex items-center gap-1.5 text-[10px] text-[#ef4444] bg-[#7f1d1d]/20 px-2 py-0.5 rounded border border-[#7f1d1d]/40">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                                    TRIAL IN SESSION
                                </span>
                            </div>

                            {/* Prompt Statement */}
                            <div className="py-4">
                                <p className="text-xs text-[#8a8880] uppercase tracking-wider font-mono">Case Topic:</p>
                                <h3 className="text-base sm:text-lg font-semibold text-[#f0eee8] mt-1" style={{ fontFamily: "Fraunces, serif" }}>
                                    "Should I quit college to build a SaaS startup full-time?"
                                </h3>
                            </div>

                            {/* LIVING SCALE & METRICS GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                                {/* Left Side: Living Animated Scale SVG */}
                                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#08080a] rounded-xl border border-[#1e1e21]">
                                    <div className="relative w-52 h-32 flex items-center justify-center">
                                        <motion.svg width="220" height="130" viewBox="0 0 220 130">
                                            <motion.g
                                                animate={{ rotate: scaleTilt }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                style={{ transformOrigin: "110px 40px" }}
                                            >
                                                <line x1="110" y1="40" x2="35" y2="75" stroke="#ef4444" strokeWidth="2" />
                                                <line x1="110" y1="40" x2="185" y2="75" stroke="#4ade80" strokeWidth="2" />
                                                <circle cx="35" cy="75" r="16" fill="#131215" stroke="#ef4444" strokeWidth="1.5" />
                                                <circle cx="185" cy="75" r="16" fill="#131215" stroke="#4ade80" strokeWidth="1.5" />
                                            </motion.g>
                                            <line x1="110" y1="40" x2="110" y2="110" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
                                            <circle cx="110" cy="40" r="5" fill="#f0d878" />
                                            <rect x="90" y="110" width="40" height="7" rx="3" fill="#8a6d1a" />
                                        </motion.svg>
                                    </div>

                                    {/* Active Speaker Status indicator */}
                                    <div className="mt-2 text-center">
                                        <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${heroPhase === "skeptic"
                                                ? "border-[#ef4444]/40 bg-[#7f1d1d]/20 text-[#ef4444]"
                                                : heroPhase === "optimist"
                                                    ? "border-[#4ade80]/40 bg-[#14532d]/20 text-[#4ade80]"
                                                    : "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37]"
                                            }`}>
                                            {heroPhase === "skeptic" && "⚖ Skeptic Speaking..."}
                                            {heroPhase === "optimist" && "💡 Optimist Replying..."}
                                            {heroPhase === "judge" && "👨‍⚖️ Judge Deliberating..."}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Dynamic Risk & Opportunity Index */}
                                <div className="md:col-span-7 space-y-4 text-xs font-mono">
                                    {/* Skeptic Score */}
                                    <div className="p-3 rounded-lg bg-[#111113] border border-[#2a2a2e]">
                                        <div className="flex justify-between items-center mb-1 text-[#ef4444]">
                                            <span className="font-semibold flex items-center gap-1.5">
                                                <XCircle size={13} /> Skeptic Risk Index
                                            </span>
                                            <span className="font-bold">78% Risk</span>
                                        </div>
                                        <div className="w-full bg-[#1e1e21] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#ef4444] h-full rounded-full transition-all duration-500" style={{ width: "78%" }} />
                                        </div>
                                        <p className="text-[10px] text-[#8a8880] mt-1.5 font-sans">
                                            "CAC is $140 in micro-SaaS; 12-month runway needed before exit."
                                        </p>
                                    </div>

                                    {/* Optimist Score */}
                                    <div className="p-3 rounded-lg bg-[#111113] border border-[#2a2a2e]">
                                        <div className="flex justify-between items-center mb-1 text-[#4ade80]">
                                            <span className="font-semibold flex items-center gap-1.5">
                                                <CheckCircle2 size={13} /> Optimist Growth Index
                                            </span>
                                            <span className="font-bold">84% Upside</span>
                                        </div>
                                        <div className="w-full bg-[#1e1e21] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#4ade80] h-full rounded-full transition-all duration-500" style={{ width: "84%" }} />
                                        </div>
                                        <p className="text-[10px] text-[#8a8880] mt-1.5 font-sans">
                                            "34% YoY demand growth; early customer feedback accelerates PMF."
                                        </p>
                                    </div>

                                    {/* Verdict Preview */}
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#131215] border border-[#d4af37]/40">
                                        <div>
                                            <span className="text-[9px] text-[#8a8880] uppercase tracking-wider">Judicial Recommendation</span>
                                            <p className="text-xs font-bold text-[#4ade80]">CONDITIONAL GO</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] text-[#8a8880] uppercase tracking-wider">Confidence</span>
                                            <p className="text-xs font-bold text-[#d4af37]">82%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* 2. HOW IT WORKS */}
            <section id="how-it-works" className="py-24 px-6 border-t border-[#1c1c1f]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-mono">The Procedure</span>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] mt-2" style={{ fontFamily: "Fraunces, serif" }}>
                            How A Case Is Tried
                        </h2>
                        <p className="text-xs text-[#8a8880] mt-2 max-w-sm mx-auto">
                            Four quiet stages from submission to final decree.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { num: "01", title: "Present Your Case", desc: "State your decision or high-stakes dilemma in plain text." },
                            { num: "02", title: "Subpoena Evidence", desc: "Search agents pull live web facts & real-world precedent." },
                            { num: "03", title: "Adversarial Debate", desc: "Skeptic challenges risks while Optimist builds the upside." },
                            { num: "04", title: "Judicial Decree", desc: "Receive an impartial verdict with a confidence score." }
                        ].map((step, idx) => (
                            <Card key={idx} className="p-6 flex flex-col justify-between hover:border-[#4a4a50] transition-colors">
                                <div>
                                    <span className="text-xs font-mono font-bold text-[#d4af37] tracking-wider">{step.num}</span>
                                    <h3 className="text-base font-semibold text-[#f0eee8] mt-3 mb-2">{step.title}</h3>
                                    <p className="text-xs text-[#8a8880] leading-relaxed">{step.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SEE THE COURT IN ACTION (SIGNATURE DEMO SECTION) */}
            <section id="demo" className="py-24 px-6 bg-[#060608] border-t border-[#1c1c1f]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-mono">Interactive Simulation</span>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] mt-2" style={{ fontFamily: "Fraunces, serif" }}>
                            See the Court in Action
                        </h2>
                        <p className="text-xs text-[#8a8880] mt-2">
                            Select a sample case or enter your own decision to trigger a live courtroom sequence.
                        </p>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        {sampleIdeas.map((preset, i) => (
                            <button
                                key={i}
                                onClick={() => runInteractiveDemo(preset)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${demoInput === preset
                                    ? "border-[#d4af37] bg-[#d4af37]/10 text-[#f0eee8]"
                                    : "border-[#2a2a2e] text-[#8a8880] hover:border-[#4a4a50] hover:text-[#c9c7c0]"
                                    }`}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <Card className="p-6 md:p-8 shadow-2xl">
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <input
                                type="text"
                                value={demoInput}
                                onChange={(e) => setDemoInput(e.target.value)}
                                placeholder="Type your idea or decision here..."
                                className="flex-1 bg-[#0b0b0d] border border-[#2a2a2e] focus:border-[#d4af37] rounded-lg px-4 py-3 text-xs text-[#e8e6e1] outline-none transition-colors"
                            />
                            <GoldButton
                                onClick={() => runInteractiveDemo()}
                                disabled={demoStep > 0 && demoStep < 5}
                                className="px-6 py-3 shrink-0 flex items-center justify-center gap-2 text-xs"
                            >
                                {demoStep === 0 || demoStep === 5 ? (
                                    <>
                                        <Gavel size={15} />
                                        <span>Analyze Trial</span>
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw size={15} className="animate-spin" />
                                        <span>Trial in Session...</span>
                                    </>
                                )}
                            </GoldButton>
                        </div>

                        {/* LIVE LOADING SEQUENCE LOG */}
                        <div className="min-h-[280px] rounded-xl bg-[#08080a] border border-[#1e1e21] p-6 flex flex-col justify-between">
                            {demoStep === 0 && (
                                <div className="my-auto text-center py-10">
                                    <Scale size={32} className="mx-auto text-[#d4af37]/40 mb-3" />
                                    <p className="text-xs text-[#6b6b73]">
                                        Click <strong className="text-[#d4af37]">"Analyze Trial"</strong> above to see AI Advocates debate in real time.
                                    </p>
                                </div>
                            )}

                            {demoStep > 0 && (
                                <div className="space-y-4">
                                    <div className="space-y-3 font-mono text-xs border-b border-[#1e1e21] pb-6">
                                        <div className={`flex items-center gap-2.5 ${demoStep >= 1 ? "text-[#e8e6e1]" : "text-[#4a4a50]"}`}>
                                            {demoStep === 1 ? (
                                                <RefreshCw size={14} className="animate-spin text-[#d4af37]" />
                                            ) : demoStep > 1 ? (
                                                <CheckCircle2 size={14} className="text-[#4ade80]" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]" />
                                            )}
                                            <span>🔍 Subpoenaing web evidence & market facts...</span>
                                            {demoStep > 1 && <span className="text-[10px] text-[#8a8880] ml-auto">✓ 4 sources retrieved</span>}
                                        </div>

                                        <div className={`flex items-center gap-2.5 ${demoStep >= 2 ? "text-[#e8e6e1]" : "text-[#4a4a50]"}`}>
                                            {demoStep === 2 ? (
                                                <RefreshCw size={14} className="animate-spin text-[#ef4444]" />
                                            ) : demoStep > 2 ? (
                                                <CheckCircle2 size={14} className="text-[#4ade80]" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]" />
                                            )}
                                            <span>⚖ Skeptic arguing downside risk & burn rate...</span>
                                            {demoStep > 2 && <span className="text-[10px] text-[#ef4444] ml-auto">Risk profile logged</span>}
                                        </div>

                                        <div className={`flex items-center gap-2.5 ${demoStep >= 3 ? "text-[#e8e6e1]" : "text-[#4a4a50]"}`}>
                                            {demoStep === 3 ? (
                                                <RefreshCw size={14} className="animate-spin text-[#4ade80]" />
                                            ) : demoStep > 3 ? (
                                                <CheckCircle2 size={14} className="text-[#4ade80]" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]" />
                                            )}
                                            <span>💡 Optimist countering with market upside...</span>
                                            {demoStep > 3 && <span className="text-[10px] text-[#4ade80] ml-auto">Growth vectors modeled</span>}
                                        </div>

                                        <div className={`flex items-center gap-2.5 ${demoStep >= 4 ? "text-[#e8e6e1]" : "text-[#4a4a50]"}`}>
                                            {demoStep === 4 ? (
                                                <RefreshCw size={14} className="animate-spin text-[#d4af37]" />
                                            ) : demoStep > 4 ? (
                                                <CheckCircle2 size={14} className="text-[#4ade80]" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]" />
                                            )}
                                            <span>🧠 Consult historic decision memory...</span>
                                            {demoStep > 4 && <span className="text-[10px] text-[#8a8880] ml-auto">Precedent matched</span>}
                                        </div>

                                        <div className={`flex items-center gap-2.5 ${demoStep >= 5 ? "text-[#4ade80] font-bold" : "text-[#4a4a50]"}`}>
                                            {demoStep === 5 ? (
                                                <Gavel size={14} className="text-[#d4af37]" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]" />
                                            )}
                                            <span>👨‍⚖️ Judge delivering final decree...</span>
                                        </div>
                                    </div>

                                    {/* Final Result Card */}
                                    {demoStep === 5 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="pt-2 space-y-4"
                                        >
                                            <div className="flex items-center justify-between bg-[#111113] p-4 rounded-lg border border-[#2a2a2e]">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-wider text-[#8a8880]">Judicial Decree</span>
                                                    <h4 className="text-lg font-bold text-[#4ade80] font-mono mt-0.5">CONDITIONAL GO</h4>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] uppercase tracking-wider text-[#8a8880]">Confidence</span>
                                                    <p className="text-lg font-bold text-[#d4af37] font-mono mt-0.5">82%</p>
                                                </div>
                                            </div>

                                            <p className="text-xs text-[#c9c7c0] leading-relaxed bg-[#111113] p-3 rounded-lg border border-[#1e1e21]">
                                                <strong className="text-[#f0eee8]">Verdict Summary:</strong> High market demand upside. Defer full-time exit until securing 3 paying pilots or 6 months runway reserves.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </section>

            {/* 4. INSIDE THE COURTROOM (5 INDEPENDENT AGENTS) */}
            <section id="inside" className="py-24 px-6 border-t border-[#1c1c1f]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-mono">Adversarial Pipeline</span>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] mt-2" style={{ fontFamily: "Fraunces, serif" }}>
                            Every case is argued by five independent agents.
                        </h2>
                        <p className="text-xs text-[#8a8880] mt-2 max-w-md mx-auto">
                            No single AI decides your future.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { step: "01", icon: Search, title: "Research Agent", line: "Subpoenas real-time web data, market metrics, and industry signals.", color: "text-[#38bdf8]" },
                            { step: "02", icon: Swords, title: "Skeptic Advocate", line: "Relentlessly challenges risks, failure points, and blind assumptions.", color: "text-[#ef4444]" },
                            { step: "03", icon: TrendingUp, title: "Optimist Advocate", line: "Models upside potential, expansion paths, and growth leverage.", color: "text-[#4ade80]" },
                            { step: "04", icon: Database, title: "Memory Agent", line: "Cross-references your past trial decisions to prevent repeat errors.", color: "text-[#a855f7]" },
                            { step: "05", icon: Scale, title: "Judge Engine", line: "Synthesizes arguments into an objective verdict with confidence scoring.", color: "text-[#d4af37]" }
                        ].map((agent, idx) => (
                            <Card key={idx} className="p-5 hover:border-[#4a4a50] transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-xs font-mono font-bold text-[#d4af37] w-6 shrink-0">{agent.step}</div>
                                    <div className={`p-2 rounded-lg bg-[#111113] border border-[#2a2a2e] ${agent.color}`}>
                                        <agent.icon size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#f0eee8]">{agent.title}</h3>
                                        <p className="text-xs text-[#8a8880] mt-0.5">{agent.line}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-[#6b6b73] uppercase tracking-wider self-end md:self-center">Active Agent</span>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COURTROOM PRINCIPLES */}
            <section id="features" className="py-24 px-6 bg-[#060608] border-t border-[#1c1c1f]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-mono">Foundational Principles</span>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] mt-2" style={{ fontFamily: "Fraunces, serif" }}>
                            How Decisions Are Held Accountable
                        </h2>
                        <p className="text-xs text-[#8a8880] mt-2 max-w-sm mx-auto">
                            Designed to replace guesswork with evidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: Search,
                                title: "Evidence Comes Before Opinion",
                                desc: "Arguments are backed by live research instead of unverified assumptions."
                            },
                            {
                                icon: Brain,
                                title: "The Court Remembers",
                                desc: "Every new decision is judged with context from your previous cases."
                            },
                            {
                                icon: Swords,
                                title: "Adversarial Stress-Testing",
                                desc: "Two distinct AI advocates argue opposite sides to eliminate confirmation bias."
                            },
                            {
                                icon: Shield,
                                title: "Clear Judicial Decrees",
                                desc: "Receive definitive Go, Conditional, or No-Go recommendations paired with objective confidence ratings."
                            }
                        ].map((feat, i) => (
                            <Card key={i} className="p-6 hover:border-[#4a4a50] transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-4">
                                    <feat.icon size={20} />
                                </div>
                                <h3 className="text-base font-semibold text-[#f0eee8] mb-2">{feat.title}</h3>
                                <p className="text-xs text-[#8a8880] leading-relaxed">{feat.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. JURISDICTION (WHO IT'S FOR) */}
            <section id="who-its-for" className="py-24 px-6 border-t border-[#1c1c1f]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold font-mono">Jurisdiction</span>
                        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] mt-2" style={{ fontFamily: "Fraunces, serif" }}>
                            Who Stands Trial?
                        </h2>
                        <p className="text-xs text-[#8a8880] mt-2">
                            Built for anyone facing high-stakes career or business decisions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: GraduationCap, title: "Students", role: "Career paths, internship choices, and initial projects." },
                            { icon: Rocket, title: "Founders", role: "Validating startup ideas, pivots, and capital allocation." },
                            { icon: Briefcase, title: "Professionals", role: "Weighing job offers, salary negotiations, and moves." },
                            { icon: Users, title: "Teams", role: "Choosing tech stacks, architecture, and resource allocation." }
                        ].map((item, idx) => (
                            <Card key={idx} className="p-6 text-center hover:border-[#4a4a50] transition-colors">
                                <div className="w-11 h-11 rounded-lg bg-[#111113] border border-[#2a2a2e] flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                                    <item.icon size={20} />
                                </div>
                                <h3 className="text-base font-semibold text-[#f0eee8] mb-1.5">{item.title}</h3>
                                <p className="text-xs text-[#8a8880] leading-relaxed">{item.role}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="py-24 px-6 bg-[#060608] border-t border-[#1c1c1f] text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Scale size={24} />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#f0eee8] leading-tight" style={{ fontFamily: "Fraunces, serif" }}>
                        The Court Is Ready. <br />
                        <span className="text-[#d4af37]">Is Your Idea?</span>
                    </h2>

                    <p className="mt-4 text-xs text-[#8a8880] max-w-sm mx-auto">
                        Stop guessing. Put your next major decision on trial in under 2 minutes.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <GoldButton onClick={handleCTA} className="text-xs px-8 py-3.5 flex items-center gap-2 shadow-lg">
                            <span>Put My Idea On Trial</span>
                            <ArrowRight size={16} />
                        </GoldButton>
                    </div>
                </div>
            </section>

            {/* MINIMALIST INVISIBLE FOOTER */}
            <footer className="py-10 border-t border-[#1c1c1f] text-center text-xs text-[#6b6b73]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Scale size={15} className="text-[#d4af37]" />
                        <span className="font-semibold text-[#e8e6e1]" style={{ fontFamily: "Fraunces, serif" }}>The Courtroom</span>
                        <span className="text-[#4a4a50]">•</span>
                        <span className="text-[#8a8880] text-[11px]">Every decision deserves a fair hearing.</span>
                    </div>
                    <div className="flex items-center gap-6 text-[11px] text-[#8a8880]">
                        <a href="#how-it-works" className="hover:text-[#d4af37] transition-colors">Procedure</a>
                        <a href="#demo" className="hover:text-[#d4af37] transition-colors">Live Trial</a>
                        <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}