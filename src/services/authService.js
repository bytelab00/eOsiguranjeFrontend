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
    return res.data; // expects { token, message: "login_success"}
};
