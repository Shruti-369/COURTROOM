import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale, Gavel, TrendingUp, TrendingDown, ScrollText, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, api } from "../context/AuthContext";
import { AmbientBackground, GoldButton, Card } from "../components/ui";

// Shown if the history endpoint isn't reachable yet, so the dashboard is
// never empty while the backend route is being wired up.
const DEMO_HISTORY = [
    { id: 1, idea: "AI Interview Coach for students", category: "startup", decision: "Go", confidence: 80, createdAt: new Date().toISOString() },
    { id: 2, idea: "Quit my job to build a startup full-time", category: "career", decision: "Conditional", confidence: 65, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, idea: "Buy a MacBook Pro for college", category: "purchase", decision: "No-Go", confidence: 58, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];

const decisionColor = (d) => (d === "Go" ? "#4ade80" : d === "No-Go" ? "#ef4444" : "#d4af37");

function StatCard({ label, value, icon: Icon, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -3 }}
        >
            <Card className="p-4">
                <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} color={color} />
                    <span className="text-[10px] uppercase tracking-wide" style={{ color: "#8a8880" }}>{label}</span>
                </div>
                <div className="text-2xl font-semibold" style={{ color: "#f0eee8", fontFamily: "JetBrains Mono, monospace" }}>{value}</div>
            </Card>
        </motion.div>
    );
}

function HistoryRow({ item, delay }) {
    const color = decisionColor(item.decision);
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between gap-3 py-3 border-b last:border-b-0"
            style={{ borderColor: "#1e1e21" }}
        >
            <div className="min-w-0">
                <p className="text-sm truncate" style={{ color: "#e8e6e1" }}>{item.idea}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#6b6b73" }}>
                    {item.category} · {new Date(item.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono" style={{ color: "#8a8880" }}>{item.confidence}%</span>
                <span
                    className="text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                    style={{ color, borderColor: `${color}66`, background: `${color}15` }}
                >
                    {item.decision}
                </span>
            </div>
        </motion.div>
    );
}

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState(null);
    const [usedDemo, setUsedDemo] = useState(false);

    useEffect(() => {
        async function loadHistory() {
            try {
                // NOTE: adjust this path to match your debateRoutes if different
                const res = await api.get("/debates");
                setHistory(res.data.length ? res.data : DEMO_HISTORY);
                if (!res.data.length) setUsedDemo(true);
            } catch {
                setHistory(DEMO_HISTORY);
                setUsedDemo(true);
            }
        }
        loadHistory();
    }, []);

    const last = history?.[0];
    const goCount = history?.filter((h) => h.decision === "Go").length ?? 0;
    const avgConfidence = history?.length
        ? Math.round(history.reduce((s, h) => s + h.confidence, 0) / history.length)
        : 0;

    return (
        <div className="min-h-screen px-4 py-8 sm:py-12" style={{ fontFamily: "Inter, sans-serif" }}>
            <AmbientBackground />

            <div className="max-w-3xl mx-auto">
                {/* Nav */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Scale size={18} color="#d4af37" />
                        <span className="text-sm font-semibold tracking-wide" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                            The Courtroom
                        </span>
                    </div>
                    <button
                        onClick={() => { logout(); navigate("/login"); }}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors"
                        style={{ borderColor: "#2a2a2e", color: "#8a8880" }}
                    >
                        <LogOut size={12} /> Logout
                    </button>
                </div>

                {/* Welcome card */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Card className="p-6 relative overflow-hidden mb-6" style={{ borderColor: "#8a6d1a55" }}>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#4ade80" }} />
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#4ade80" }} />
                            </span>
                            <span className="text-[11px] uppercase tracking-widest" style={{ color: "#8a8880" }}>Welcome back</span>
                        </div>
                        <h1 className="text-3xl font-semibold mb-4" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                            {user?.name || "Counsel"}
                        </h1>

                        {last && (
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Last Trial</div>
                                    <div className="text-sm max-w-xs" style={{ color: "#c9c7c0" }}>{last.idea}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Decision</div>
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                                        style={{ color: decisionColor(last.decision), borderColor: `${decisionColor(last.decision)}66`, background: `${decisionColor(last.decision)}15` }}
                                    >
                                        {last.decision}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Confidence</div>
                                    <div className="text-sm font-mono" style={{ color: "#e8e6e1" }}>{last.confidence}%</div>
                                </div>
                            </div>
                        )}

                        <GoldButton className="mt-5 flex items-center gap-1.5" onClick={() => navigate("/courtroom")}>
                            <Plus size={14} /> Start New Trial
                        </GoldButton>
                    </Card>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <StatCard label="Total Trials" value={history?.length ?? 0} icon={Gavel} color="#d4af37" delay={0.1} />
                    <StatCard label="Go Verdicts" value={goCount} icon={TrendingUp} color="#4ade80" delay={0.2} />
                    <StatCard label="Avg Confidence" value={`${avgConfidence}%`} icon={TrendingDown} color="#ef4444" delay={0.3} />
                </div>

                {/* History */}
                <Card className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <ScrollText size={14} color="#d4af37" />
                        <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#d4af37" }}>Case History</span>
                    </div>
                    {history?.map((item, i) => (
                        <HistoryRow key={item.id ?? i} item={item} delay={0.1 + i * 0.08} />
                    ))}
                    {usedDemo && (
                        <p className="text-[11px] mt-3" style={{ color: "#6b6b73" }}>
                            Showing sample history — connect a GET /api/debates route to see real cases here.
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
}