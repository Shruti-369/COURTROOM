import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Gavel, TrendingUp, TrendingDown, CircleDot, ScrollText, LogOut, Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth, apiRoot } from "../context/AuthContext";
import { AmbientBackground, GoldButton, Card } from "../components/ui";

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

function ConfidenceTrendChart({ history }) {
    // Oldest → newest for a left-to-right timeline, with a short label per point
    const data = [...history]
        .reverse()
        .map((d) => ({
            date: new Date(d.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
            confidence: d.confidence,
        }));

    return (
        <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="confidenceFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#6b6b73", fontSize: 10 }} axisLine={{ stroke: "#2a2a2e" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#6b6b73", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                    contentStyle={{ background: "#131215", border: "1px solid #2a2a2e", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#8a8880" }}
                    itemStyle={{ color: "#d4af37" }}
                />
                <Area type="monotone" dataKey="confidence" stroke="#d4af37" strokeWidth={2} fill="url(#confidenceFill)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

function DecisionBreakdownChart({ goIdeas, conditionalIdeas, noGoIdeas }) {
    const data = [
        { name: "Go", value: goIdeas, color: "#4ade80" },
        { name: "Conditional", value: conditionalIdeas, color: "#d4af37" },
        { name: "No-Go", value: noGoIdeas, color: "#ef4444" },
    ].filter((d) => d.value > 0);

    if (data.length === 0) return null;

    return (
        <div className="flex items-center gap-4">
            <ResponsiveContainer width={100} height={100}>
                <PieChart>
                    <Pie data={data} dataKey="value" innerRadius={28} outerRadius={44} paddingAngle={3} stroke="none">
                        {data.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
                {data.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span style={{ color: "#c9c7c0" }}>{d.name}</span>
                        <span style={{ color: "#6b6b73" }}>· {d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function HistoryCard({ item, delay }) {
    const [open, setOpen] = useState(false);
    const color = decisionColor(item.verdict);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <Card className="p-4" style={{ borderColor: "#1e1e21" }}>
                <button className="w-full flex items-center justify-between gap-3 text-left" onClick={() => setOpen((o) => !o)}>
                    <div className="min-w-0">
                        <p className="text-sm truncate" style={{ color: "#e8e6e1" }}>{item.idea}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: "#6b6b73" }}>
                            {new Date(item.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono" style={{ color: "#8a8880" }}>{item.confidence}%</span>
                        <span
                            className="text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border"
                            style={{ color, borderColor: `${color}66`, background: `${color}15` }}
                        >
                            {item.verdict}
                        </span>
                        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={14} color="#6b6b73" />
                        </motion.span>
                    </div>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-3 mt-3 border-t" style={{ borderColor: "#1e1e21" }}>
                                {item.summary && (
                                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#c9c7c0" }}>{item.summary}</p>
                                )}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {item.topRisks?.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <TrendingDown size={12} color="#ef4444" />
                                                <span className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: "#ef4444" }}>Risks</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {item.topRisks.map((r, i) => (
                                                    <li key={i} className="text-[12px]" style={{ color: "#a8a6a0" }}>— {r}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {item.topOpportunities?.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <TrendingUp size={12} color="#4ade80" />
                                                <span className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: "#4ade80" }}>Opportunities</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {item.topOpportunities.map((o, i) => (
                                                    <li key={i} className="text-[12px]" style={{ color: "#a8a6a0" }}>— {o}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
}

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const [statsRes, historyRes] = await Promise.all([
                    apiRoot.get("/dashboard"),
                    apiRoot.get("/debate/history"),
                ]);
                setStats(statsRes.data);
                setHistory(historyRes.data);
            } catch (err) {
                setError("Couldn't reach the dashboard endpoint — is the backend running?");
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    const last = stats?.lastIdea;
    const hasAnyTrials = stats && stats.totalIdeas > 0;

    return (
        <div className="min-h-screen px-4 py-8 sm:py-12" style={{ fontFamily: "Inter, sans-serif" }}>
            <AmbientBackground />

            <div className="max-w-4xl mx-auto">
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

                        {loading && <p className="text-sm" style={{ color: "#6b6b73" }}>Loading your case record…</p>}
                        {!loading && error && <p className="text-sm" style={{ color: "#ef4444" }}>{error}</p>}
                        {!loading && !error && !hasAnyTrials && (
                            <p className="text-sm" style={{ color: "#8a8880" }}>No trials yet — bring your first idea to the courtroom.</p>
                        )}

                        {!loading && !error && hasAnyTrials && last && (
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Last Trial</div>
                                    <div className="text-sm max-w-xs" style={{ color: "#c9c7c0" }}>{last.idea}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Decision</div>
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                                        style={{ color: decisionColor(last.verdict), borderColor: `${decisionColor(last.verdict)}66`, background: `${decisionColor(last.verdict)}15` }}
                                    >
                                        {last.verdict}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>Confidence</div>
                                    <div className="text-sm font-mono" style={{ color: "#e8e6e1" }}>{last.confidence}%</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: "#6b6b73" }}>When</div>
                                    <div className="text-sm" style={{ color: "#e8e6e1" }}>{new Date(last.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        )}

                        <GoldButton className="mt-5 flex items-center gap-1.5" onClick={() => navigate("/courtroom")}>
                            <Plus size={14} /> Start New Trial
                        </GoldButton>
                    </Card>
                </motion.div>

                {/* Stats */}
                {!loading && !error && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        <StatCard label="Total Trials" value={stats.totalIdeas} icon={Gavel} color="#d4af37" delay={0.1} />
                        <StatCard label="Go" value={stats.goIdeas} icon={TrendingUp} color="#4ade80" delay={0.2} />
                        <StatCard label="Conditional" value={stats.conditionalIdeas} icon={CircleDot} color="#d4af37" delay={0.3} />
                        <StatCard label="No-Go" value={stats.noGoIdeas} icon={TrendingDown} color="#ef4444" delay={0.4} />
                    </div>
                )}

                {/* Charts */}
                {!loading && !error && hasAnyTrials && (
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                            <Card className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={14} color="#d4af37" />
                                    <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#d4af37" }}>Confidence Over Time</span>
                                </div>
                                {history?.length > 1 ? (
                                    <ConfidenceTrendChart history={history} />
                                ) : (
                                    <p className="text-xs pt-4" style={{ color: "#6b6b73" }}>Need at least 2 trials to show a trend.</p>
                                )}
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                            <Card className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Scale size={14} color="#d4af37" />
                                    <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#d4af37" }}>Verdict Breakdown</span>
                                </div>
                                <DecisionBreakdownChart goIdeas={stats.goIdeas} conditionalIdeas={stats.conditionalIdeas} noGoIdeas={stats.noGoIdeas} />
                            </Card>
                        </motion.div>
                    </div>
                )}

                {/* History list */}
                {!loading && !error && hasAnyTrials && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                        <div className="flex items-center gap-2 mb-3 mt-2">
                            <ScrollText size={14} color="#d4af37" />
                            <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#d4af37" }}>Case History</span>
                        </div>
                        <div className="space-y-2.5">
                            {history?.map((item, i) => (
                                <HistoryCard key={item._id ?? i} item={item} delay={0.05 * i} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}