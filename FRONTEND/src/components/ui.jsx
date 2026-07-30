import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";

// Ambient drifting glow behind every screen — keeps the courtroom mood
// consistent without repeating markup everywhere.
export function AmbientBackground() {
    return (
        <div className="fixed inset-0 -z-10" style={{ background: "#08080a" }}>
            <motion.div
                className="absolute rounded-full"
                style={{ width: 600, height: 600, left: "-15%", top: "-15%", background: "radial-gradient(circle, #7f1d1d4a, transparent 70%)", filter: "blur(80px)" }}
                animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute rounded-full"
                style={{ width: 600, height: 600, right: "-15%", bottom: "-15%", background: "radial-gradient(circle, #14532d4a, transparent 70%)", filter: "blur(80px)" }}
                animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute rounded-full"
                style={{ width: 500, height: 500, left: "40%", top: "35%", background: "radial-gradient(circle, #d4af3722, transparent 70%)", filter: "blur(90px)" }}
                animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 50% 0%, #d4af3711, transparent 60%)" }}
            />
        </div>
    );
}

export function GoldButton({ children, className = "", ...props }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-shadow ${className}`}
            style={{ background: "#d4af37", color: "#1a1608", boxShadow: "0 0 24px -8px #d4af3799" }}
            {...props}
        >
            {children}
        </motion.button>
    );
}

export function Field({ label, ...props }) {
    return (
        <label className="block text-left">
            <span className="text-[11px] uppercase tracking-wide" style={{ color: "#8a8880" }}>{label}</span>
            <input
                {...props}
                className="mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#d4af3799]"
                style={{ background: "#111113", borderColor: "#2a2a2e", color: "#e8e6e1" }}
            />
        </label>
    );
}

export function Card({ children, className = "", style = {}, ...props }) {
    return (
        <motion.div
            className={`rounded-2xl border ${className}`}
            style={{ borderColor: "#2a2a2e", background: "linear-gradient(160deg,#131215,#0b0b0d)", ...style }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

const QUOTES = [
    "Every idea deserves to be argued from both sides.",
    "Certainty is easy. Judgment is earned.",
    "Two voices, one verdict.",
];

// Decorative left panel for auth screens — an animated scale illustration
// plus a rotating quote, so the login/signup screen fills the viewport
// instead of floating a lone card in empty space.
export function BrandPanel() {
    const [quoteIndex, setQuoteIndex] = React.useState(0);
    React.useEffect(() => {
        const id = setInterval(() => setQuoteIndex((i) => (i + 1) % QUOTES.length), 4000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="hidden lg:flex flex-col justify-between w-[42%] min-h-screen px-12 py-14 relative border-r"
            style={{ borderColor: "#1c1c1f", background: "linear-gradient(160deg, #100d09 0%, #0b0b0d 55%)" }}
        >
            <div className="flex items-center gap-2">
                <Scale size={18} color="#d4af37" />
                <span className="text-sm font-semibold tracking-wide" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                    The Courtroom
                </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <motion.svg
                    width="220" height="160" viewBox="0 0 220 160"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.g
                        animate={{ rotate: [-6, 6, -6] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: "110px 50px" }}
                    >
                        <line x1="110" y1="50" x2="40" y2="90" stroke="#7f1d1d" strokeWidth="2" />
                        <line x1="110" y1="50" x2="180" y2="90" stroke="#14532d" strokeWidth="2" />
                        <circle cx="40" cy="90" r="18" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="180" cy="90" r="18" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.7" />
                    </motion.g>
                    <line x1="110" y1="50" x2="110" y2="130" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="110" cy="50" r="6" fill="#f0d878" />
                    <rect x="90" y="130" width="40" height="8" rx="3" fill="#8a6d1a" />
                </motion.svg>
            </div>

            <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg leading-relaxed max-w-xs"
                style={{ color: "#c9c7c0", fontFamily: "Fraunces, serif" }}
            >
                "{QUOTES[quoteIndex]}"
            </motion.p>
        </div>
    );
}