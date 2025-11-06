import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Verify2FA from "./components/auth/Verify2FA";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import AdminDashboard from "./components/AdminDashboard";
import SuccessPage from "./components/SuccessPage.jsx";


function Navbar({ token, onLogout }) {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                padding: "16px 24px",
                boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <Link to="/" style={{
                color: "#0b5fff",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "24px",
                letterSpacing: "-0.5px"
            }}>
                eOsiguranje
            </Link>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {!token && (
                    <>
                        <Link to="/register" style={{
                            color: "#1a1a1a",
                            textDecoration: "none",
                            fontWeight: "500",
                            transition: "color 0.3s",
                        }}>
                            Registracija
                        </Link>
                        <Link to="/login">
                            <button style={{
                                background: "linear-gradient(135deg, #0b5fff 0%, #0047cc 100%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 24px",
                                cursor: "pointer",
                                fontWeight: "600",
                                boxShadow: "0 4px 12px rgba(11, 95, 255, 0.3)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                                    onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
                                Prijava
                            </button>
                        </Link>
                    </>
                )}
                {token && (
                    <>
                        <Link to="/dashboard" style={{
                            color: "#1a1a1a",
                            textDecoration: "none",
                            fontWeight: "500"
                        }}>
                            Dashboard
                        </Link>
                        <button
                            onClick={onLogout}
                            style={{
                                background: "#fff",
                                color: "#0b5fff",
                                border: "2px solid #0b5fff",
                                borderRadius: "8px",
                                padding: "8px 20px",
                                cursor: "pointer",
                                fontWeight: "600",
                                transition: "all 0.3s",
                            }}
                        >
                            Odjava
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

function Landing() {
    return (
        <div style={{
            minHeight: "calc(100vh - 72px)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Animated background shapes */}
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
                padding: "40px 20px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                maxWidth: "900px",
                margin: "0 auto"
            }}>
                <h1 style={{
                    fontSize: "56px",
                    fontWeight: "800",
                    color: "#fff",
                    marginBottom: "24px",
                    letterSpacing: "-1px",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
                }}>
                    Dobrodošli u eOsiguranje
                </h1>
                <p style={{
                    maxWidth: "700px",
                    margin: "0 auto 20px",
                    fontSize: "20px",
                    lineHeight: "1.8",
                    color: "rgba(255, 255, 255, 0.95)",
                    fontWeight: "400"
                }}>
                    Moderna osiguravajuća kuća koja nudi razne polise osiguranja za vaše vozilo, dom i zdravlje.
                    Naš cilj je da proces osiguranja bude jednostavan, transparentan i brz.
                </p>
                <p style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "40px"
                }}>
                    Prijavite se da pristupite svom korisničkom nalogu ili se registrujte da započnete.
                </p>
                <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link to="/login">
                        <button
                            style={{
                                background: "#fff",
                                color: "#667eea",
                                border: "none",
                                borderRadius: "12px",
                                padding: "16px 40px",
                                cursor: "pointer",
                                fontWeight: "700",
                                fontSize: "16px",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
                            }}
                        >
                            Prijavi se
                        </button>
                    </Link>
                    <Link to="/register">
                        <button
                            style={{
                                background: "rgba(255, 255, 255, 0.15)",
                                backdropFilter: "blur(10px)",
                                color: "#fff",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "12px",
                                padding: "16px 40px",
                                cursor: "pointer",
                                fontWeight: "700",
                                fontSize: "16px",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "rgba(255, 255, 255, 0.25)";
                                e.target.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            Registruj se
                        </button>
                    </Link>
                </div>

                {/* Feature cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "24px",
                    marginTop: "80px",
                    padding: "0 20px"
                }}>
                    {[
                        { icon: "🚗", title: "Auto osiguranje", desc: "Zaštitite svoje vozilo" },
                        { icon: "🏠", title: "Osiguranje doma", desc: "Sigurnost vašeg doma" },
                        { icon: "❤️", title: "Zdravstveno", desc: "Briga o vašem zdravlju" }
                    ].map((feature, idx) => (
                        <div key={idx} style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "16px",
                            padding: "32px 24px",
                            textAlign: "center",
                            transition: "transform 0.3s, background 0.3s",
                        }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.transform = "translateY(-8px)";
                                 e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.transform = "translateY(0)";
                                 e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                             }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{feature.icon}</div>
                            <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px" }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LoginScreen() {
    const navigate = useNavigate();
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
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
                maxWidth: "450px",
                width: "100%"
            }}>
                <Login />
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <span style={{ color: "#666" }}>Nemate nalog? </span>
                    <span
                        onClick={() => navigate("/register")}
                        style={{ color: "#0b5fff", cursor: "pointer", fontWeight: "600" }}
                    >
                        Registrujte se
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const { token, user, loginWithToken, logout } = useAuth();

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8f9fa"
        }}>
            <BrowserRouter>
                <Navbar token={token} onLogout={logout} />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginScreen />} />
                    <Route path="/verify" element={<Verify2FA onToken={loginWithToken} />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute token={token}>
                                {user?.role === "ADMIN" ? (
                                    <AdminDashboard user={user} onLogout={logout} />
                                ) : (
                                    <Dashboard user={user} onLogout={logout} />
                                )}
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}