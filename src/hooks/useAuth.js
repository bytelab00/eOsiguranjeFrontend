import { useState, useEffect } from "react";

export default function useAuth() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const t = localStorage.getItem("token");
        if (!t) return null;
        try {
            const payload = JSON.parse(atob(t.split(".")[1]));
            return { username: payload.sub, role: payload.role };
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    const loginWithToken = (t) => {
        setToken(t);
        try {
            const payload = JSON.parse(atob(t.split(".")[1]));
            setUser({ username: payload.sub, role: payload.role });
        } catch {
            setUser(null);
        }
    };

    const logout = () => {
        setToken(null);
    };

    return { token, user, loginWithToken, logout };
}
