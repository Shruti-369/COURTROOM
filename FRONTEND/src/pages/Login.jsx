import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AmbientBackground, GoldButton, Field, Card } from "../components/ui";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const res = await login(email, password);
        if (res.ok) navigate("/dashboard");
        else setError(res.message);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ fontFamily: "Inter, sans-serif" }}>
            <AmbientBackground />
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-center mb-6">
                    <Scale size={22} color="#d4af37" className="mx-auto mb-2" />
                    <h1 className="text-3xl font-semibold" style={{ color: "#f0eee8", fontFamily: "Fraunces, serif" }}>
                        Enter the Courtroom
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#8a8880" }}>Sign in to continue your trials.</p>
                </div>

                <Card className="p-7 w-[340px] sm:w-[380px]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                        <Field label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                        {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
                        <GoldButton type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in…" : "Sign In"}
                        </GoldButton>
                    </form>
                </Card>

                <p className="text-center text-sm mt-5" style={{ color: "#8a8880" }}>
                    New here?{" "}
                    <Link to="/signup" style={{ color: "#d4af37" }}>Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
}