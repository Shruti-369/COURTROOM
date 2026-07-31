import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
export const apiRoot = axios.create({ baseURL: import.meta.env.VITE_API_URL });
const AuthContext = createContext(null);

// Axios instance that automatically attaches the auth token to every request
export const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("courtroom_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Some routes (like /debate) are mounted directly on the root app in index.js,
// not under /api — this instance targets the server root for those.
export const apiRoot = axios.create({ baseURL: import.meta.env.VITE_API_URL });
apiRoot.interceptors.request.use((config) => {
    const token = localStorage.getItem("courtroom_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("courtroom_user");
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) localStorage.setItem("courtroom_user", JSON.stringify(user));
        else localStorage.removeItem("courtroom_user");
    }, [user]);

    async function login(email, password) {
        setLoading(true);
        try {
            // NOTE: adjust this path if your authController mounts login elsewhere
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("courtroom_token", res.data.token);
            setUser(res.data.user);
            return { ok: true };
        } catch (err) {
            return { ok: false, message: err.response?.data?.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    }

    async function signup(name, email, password) {
        setLoading(true);
        try {
            const res = await api.post("/auth/signup", { name, email, password });
            localStorage.setItem("courtroom_token", res.data.token);
            setUser(res.data.user);
            return { ok: true };
        } catch (err) {
            return { ok: false, message: err.response?.data?.message || "Signup failed" };
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("courtroom_token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}