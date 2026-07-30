import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AmbientBackground, GoldButton, Field, Card, BrandPanel } from "../components/ui";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signup, loading } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const res = await signup(name, email, password);
        if (res.ok) navigate("/dashboard");
        else setError(res.message);
    }

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>
            <AmbientBackground />
            <BrandPanel />

            <div className="flex-1 flex items-center justify-center px-4 py-14">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="mb-6">
                        <h1 className="text-3xl font-semibold" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                            Join the Bar
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "#8a8880" }}>Create an account to start your first trial.</p>
                    </div>

                    <Card className="p-7 w-[340px] sm:w-[380px]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Field label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Shiz" required />
                            <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                            <Field label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                            {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
                            <GoldButton type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating account…" : "Create Account"}
                            </GoldButton>
                        </form>
                    </Card>

                    <p className="text-sm mt-5" style={{ color: "#8a8880" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#d4af37" }}>Sign in</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}