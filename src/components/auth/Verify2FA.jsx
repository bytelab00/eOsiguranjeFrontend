import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify2FA } from "../../services/authService";

export default function Verify2FA({ onToken }) {
    const loc = useLocation();
    const navigate = useNavigate();
    const { user2FAId, username } = loc.state || {};
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!user2FAId) {
        return (
            <div style={{
                minHeight: "calc(100vh - 72px)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px"
            }}>
                <div style={{
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.2)",
                    maxWidth: "450px",
                    width: "100%",
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
                    <h3 style={{ color: "#1a1a1a", fontSize: "24px", marginBottom: "12px" }}>
                        Nema aktivne 2FA sesije
                    </h3>
                    <p style={{ color: "#666", marginBottom: "24px" }}>
                        Molimo vas da se prijavite ponovo.
                    </p>
                    <a href="/login" style={{
                        display: "inline-block",
                        padding: "12px 32px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)"
                    }}>
                        Idi na Login
                    </a>
                </div>
            </div>
        );
    }

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1. Call the API
            const response = await verify2FA({ user2FAId, code });

            // 2. CRITICAL FIX: Extract data based on your backend JSON structure
            const { accessToken, refreshToken, role } = response;

            // 3. Store in LocalStorage (Required for ProtectedRoute)
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("userRole", role); // Optional: store role if needed

                // 4. Update global state if used
                if (onToken) onToken(accessToken);

                // 5. Redirect
                navigate("/dashboard");
            } else {
                throw new Error("Token missing from response");
            }

        } catch (err) {
            console.error("2FA Error:", err);
            setError("Neispravan 2FA kod ili greška na serveru.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 72px)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background decorative elements */}
            <div style={{
                position: "absolute",
                top: "-10%",
                right: "-5%",
                width: "500px",
                height: "500px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                filter: "blur(80px)",
            }} />
            <div style={{
                position: "absolute",
                bottom: "-15%",
                left: "-10%",
                width: "600px",
                height: "600px",
                background: "rgba(11, 95, 255, 0.2)",
                borderRadius: "50%",
                filter: "blur(100px)",
            }} />

            <div style={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "48px 40px",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.2)",
                maxWidth: "450px",
                width: "100%",
                position: "relative",
                zIndex: 1
            }}>
                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <div style={{
                        width: "70px",
                        height: "70px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        fontSize: "32px",
                        boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)"
                    }}>
                        🔐
                    </div>
                    <h2 style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "8px",
                        letterSpacing: "-0.5px"
                    }}>
                        Verifikuj svoj nalog
                    </h2>
                    <p style={{
                        color: "#666",
                        fontSize: "15px"
                    }}>
                        Unesite 6-cifreni kod za <strong style={{ color: "#667eea" }}>{username}</strong>
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "8px"
                        }}>
                            2FA Kod
                        </label>
                        <input
                            placeholder="000000"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            required
                            maxLength="6"
                            style={{
                                width: "100%",
                                padding: "16px",
                                fontSize: "24px",
                                fontWeight: "600",
                                textAlign: "center",
                                letterSpacing: "8px",
                                border: "2px solid #e8e8e8",
                                borderRadius: "10px",
                                outline: "none",
                                transition: "all 0.3s",
                                boxSizing: "border-box"
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#667eea";
                                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
                            background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            borderRadius: "10px",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s",
                            boxShadow: loading ? "none" : "0 4px 20px rgba(102, 126, 234, 0.4)",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 24px rgba(102, 126, 234, 0.5)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.4)";
                            }
                        }}
                    >
                        {loading ? "Verifikujem..." : "Verifikuj i prijavi se"}
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
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                </form>

                <div style={{
                    marginTop: "32px",
                    padding: "20px",
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                    borderRadius: "12px",
                    border: "1px solid rgba(102, 126, 234, 0.15)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px"
                    }}>
                        <div style={{ fontSize: "20px", lineHeight: 1 }}>📧</div>
                        <div>
                            <p style={{
                                fontSize: "13px",
                                color: "#555",
                                lineHeight: "1.6",
                                margin: 0
                            }}>
                                Kod je poslat na vaš email. Provjerite inbox ili spam folder ako ne vidite poruku.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{
                    textAlign: "center",
                    marginTop: "24px",
                    fontSize: "14px",
                    color: "#666"
                }}>
                    Problemi sa kodom?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{
                            color: "#667eea",
                            cursor: "pointer",
                            fontWeight: "600",
                            textDecoration: "none"
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                    >
                        Vrati se na login
                    </span>
                </div>
            </div>
        </div>
    );
}