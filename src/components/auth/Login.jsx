import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const r = await login(form);
            navigate("/verify", { state: { user2FAId: r.user2FAId, username: form.username } });
        } catch (err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "48px 40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
            maxWidth: "450px",
            width: "100%",
            margin: "0 auto"
        }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h2 style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "8px",
                    letterSpacing: "-0.5px"
                }}>
                    Dobrodošli nazad
                </h2>
                <p style={{
                    color: "#666",
                    fontSize: "15px"
                }}>
                    Prijavite se na vaš nalog
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "8px"
                    }}>
                        Korisničko ime
                    </label>
                    <input
                        name="username"
                        placeholder="Unesite korisničko ime"
                        value={form.username}
                        onChange={onChange}
                        required
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            fontSize: "15px",
                            border: "2px solid #e8e8e8",
                            borderRadius: "10px",
                            outline: "none",
                            transition: "all 0.3s",
                            boxSizing: "border-box"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#0b5fff";
                            e.target.style.boxShadow = "0 0 0 3px rgba(11, 95, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e8e8e8";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "8px"
                    }}>
                        Lozinka
                    </label>
                    <input
                        name="password"
                        placeholder="Unesite lozinku"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        required
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            fontSize: "15px",
                            border: "2px solid #e8e8e8",
                            borderRadius: "10px",
                            outline: "none",
                            transition: "all 0.3s",
                            boxSizing: "border-box"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#0b5fff";
                            e.target.style.boxShadow = "0 0 0 3px rgba(11, 95, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e8e8e8";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#fff",
                        background: loading ? "#ccc" : "linear-gradient(135deg, #0b5fff 0%, #0047cc 100%)",
                        border: "none",
                        borderRadius: "10px",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "all 0.3s",
                        boxShadow: loading ? "none" : "0 4px 16px rgba(11, 95, 255, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 20px rgba(11, 95, 255, 0.4)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 16px rgba(11, 95, 255, 0.3)";
                        }
                    }}
                >
                    {loading ? "Šaljem 2FA..." : "Pošalji 2FA kod"}
                </button>

                {error && (
                    <div style={{
                        marginTop: "20px",
                        padding: "12px 16px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "10px",
                        color: "#dc2626",
                        fontSize: "14px",
                        fontWeight: "500"
                    }}>
                        ⚠️ {error}
                    </div>
                )}
            </form>

            <div style={{
                marginTop: "32px",
                padding: "20px",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(102, 126, 234, 0.2)"
            }}>
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>🔐</div>
                <p style={{
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.6",
                    margin: 0
                }}>
                    Nakon što unesete podatke, poslaćemo vam 2FA kod za verifikaciju na vaš nalog.
                </p>
            </div>
        </div>
    );
}