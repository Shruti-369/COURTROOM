import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale, Gavel, TrendingUp, TrendingDown, CircleDot, ScrollText, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await apiRoot.get("/dashboard");
                setStats(res.data);
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

                        {loading && (
                            <p className="text-sm" style={{ color: "#6b6b73" }}>Loading your case record…</p>
                        )}

                        {!loading && error && (
                            <p className="text-sm" style={{ color: "#ef4444" }}>{error}</p>
                        )}

                        {!loading && !error && !hasAnyTrials && (
                            <p className="text-sm" style={{ color: "#8a8880" }}>
                                No trials yet — bring your first idea to the courtroom.
                            </p>
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <StatCard label="Total Trials" value={stats.totalIdeas} icon={Gavel} color="#d4af37" delay={0.1} />
                        <StatCard label="Go" value={stats.goIdeas} icon={TrendingUp} color="#4ade80" delay={0.2} />
                        <StatCard label="Conditional" value={stats.conditionalIdeas} icon={CircleDot} color="#d4af37" delay={0.3} />
                        <StatCard label="No-Go" value={stats.noGoIdeas} icon={TrendingDown} color="#ef4444" delay={0.4} />
                    </div>
                )}

                {!loading && !error && hasAnyTrials && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-3">
                        <Card className="p-5">
                            <div className="flex items-center gap-2 mb-1">
                                <ScrollText size={14} color="#d4af37" />
                                <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: "#d4af37" }}>Average Confidence</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#1c1c1f" }}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: "linear-gradient(90deg,#7f1d1d,#d4af37,#14532d)" }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.averageConfidence}%` }}
                                        transition={{ delay: 0.6, duration: 1 }}
                                    />
                                </div>
                                <span className="text-sm font-mono" style={{ color: "#e8e6e1" }}>{stats.averageConfidence}%</span>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}