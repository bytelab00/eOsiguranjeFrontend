import api from "./api";

export const register = async ({ username, email, password }) => {
    const res = await api.post("/auth/register", { username, email, password });
    return res.data;
};

export const login = async ({ username, password }) => {
    const res = await api.post("/auth/login", { username, password });
    return res.data; // expects { user2FAId, message: "2fa_sent" }
};

export const verify2FA = async ({ user2FAId, code }) => {
    const res = await api.post("/auth/login/verify", { user2FAId, code });
    // Now expects: { accessToken, refreshToken, username, role }
    const { accessToken, refreshToken, username, role } = res.data;

    // Store both tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    return res.data;
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const res = await api.post("/auth/refresh", { refreshToken });
    const { accessToken, refreshToken: newRefreshToken, username, role } = res.data;

    // Update tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    return res.data;
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};