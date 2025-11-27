import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // Password validation
    const validatePassword = (pwd) => {
        if (pwd.length < 6) return "Lozinka mora imati najmanje 6 karaktera.";
        if (!/[a-z]/.test(pwd)) return "Lozinka mora sadržavati malo slovo.";
        if (!/[0-9]/.test(pwd)) return "Lozinka mora sadržavati broj.";
        if (!/[^A-Za-z0-9]/.test(pwd)) return "Lozinka mora sadržavati specijalni znak.";
        return null;
    };

    // Password strength calculation (0-4)
    const getPasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 6) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;
        return strength;
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const validation = validatePassword(form.password);
        if (validation) {
            setError(validation);
            setLoading(false);
            return;
        }

        try {
            await register(form);
            navigate("/login");
        } catch (err) {
            const status = err?.response?.status;
            const message = err?.response?.data?.message;

            if (status === 400) {
                setError(message || "Korisnik sa tim imenom ili emailom već postoji.");
            } else {
                setError(err.message || "Došlo je do greške.");
            }
        } finally {
            setLoading(false);
        }

    };

    const passwordStrength = getPasswordStrength(form.password);
    const strengthColor = ["#f87171", "#fbbf24", "#60a5fa", "#10b981"]; // red, yellow, blue, green
    const strengthLabel = ["Slaba", "Osrednja", "Dobra", "Jaka"];

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
            {/* Background decorations */}
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
                maxWidth: "480px",
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
                        ✨
                    </div>
                    <h2 style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "8px",
                        letterSpacing: "-0.5px"
                    }}>
                        Kreirajte nalog
                    </h2>
                    <p style={{ color: "#666", fontSize: "15px" }}>
                        Pridružite se eOsiguranju danas
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
                        }}>Korisničko ime</label>
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
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "8px"
                        }}>Email adresa</label>
                        <input
                            name="email"
                            placeholder="vas@email.com"
                            type="email"
                            value={form.email}
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
                        />
                    </div>

                    <div style={{ marginBottom: "8px" }}>
                        <label style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "8px"
                        }}>Lozinka</label>
                        <input
                            name="password"
                            placeholder="Minimum 6 karaktera, broj, malo slovo i simbol"
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
                        />
                    </div>

                    {/* Live password strength meter */}
                    {form.password && (
                        <div style={{
                            height: "8px",
                            width: "100%",
                            background: "#e5e7eb",
                            borderRadius: "4px",
                            marginBottom: "16px",
                            overflow: "hidden"
                        }}>
                            <div style={{
                                height: "100%",
                                width: `${(passwordStrength / 4) * 100}%`,
                                background: strengthColor[passwordStrength - 1] || "#e5e7eb",
                                transition: "width 0.3s"
                            }} />
                        </div>
                    )}
                    {form.password && (
                        <p style={{ fontSize: "13px", color: strengthColor[passwordStrength - 1] || "#000", marginTop: "0", marginBottom: "16px" }}>
                            Snaga lozinke: {strengthLabel[passwordStrength - 1] || "Prekratka"}
                        </p>
                    )}

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
                    >
                        {loading ? "Kreiranje naloga..." : "Registruj se"}
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
                        <div style={{ fontSize: "20px", lineHeight: 1 }}>🛡️</div>
                        <div>
                            <p style={{
                                fontSize: "13px",
                                color: "#555",
                                lineHeight: "1.6",
                                margin: 0
                            }}>
                                Vaši podaci su bezbjedni kod nas. Koristimo najnovije sigurnosne protokole i 2FA autentifikaciju.
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
                    Već imate nalog?{" "}
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
                        Prijavite se
                    </span>
                </div>
            </div>
        </div>
    );
}
