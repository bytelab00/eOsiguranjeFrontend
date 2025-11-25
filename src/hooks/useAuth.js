import { useState, useEffect } from "react";

export default function useAuth() {
    const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
    const [user, setUser] = useState(() => {
        const t = localStorage.getItem("accessToken");
        if (!t) return null;
        try {
            const payload = JSON.parse(atob(t.split(".")[1]));
            return { username: payload.sub, role: payload.role };
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
            // Parse user info from token
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser({ username: payload.sub, role: payload.role });
            } catch {
                setUser(null);
            }
        } else {
            localStorage.removeItem("accessToken");
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");


    };

    return { token, user, loginWithToken, logout };
}