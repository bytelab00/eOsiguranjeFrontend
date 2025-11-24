import React, { useState, useEffect } from "react";
import api from "../services/api"; // ✅ Use configured api instance
import LogoutButton from "../components/auth/LogoutButton";

export default function Dashboard({ user }) {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [purchasing, setPurchasing] = useState(null);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            // ✅ Use api instance - no need to manually add token or base URL
            const response = await api.get("/policies");
            setPolicies(response.data);
            setError(null);
        } catch (err) {
            setError(err?.response?.data?.message || "Greška pri učitavanju polisa");
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (policyId) => {
        try {
            setPurchasing(policyId);
            // ✅ Use api instance
            const response = await api.post(
                `/purchase/create-checkout-session?policyId=${policyId}`
            );

            // Open in same window instead of new tab
            window.location.href = response.data.checkoutUrl;
        } catch (err) {
            setError(err?.response?.data?.message || "Greška pri kreiranju checkout sesije");
        } finally {
            setPurchasing(null);
        }
    };

    const getPolicyIcon = (type) => {
        const icons = {
            Travel: "✈️",
            Health: "❤️",
            Auto: "🚗",
            Home: "🏠",
            Life: "🛡️"
        };
        return icons[type] || "📋";
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 72px)",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            padding: "40px 20px"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Header Section */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "32px 40px",
                    marginBottom: "32px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: "32px",
                                fontWeight: "700",
                                color: "#1a1a1a",
                                marginBottom: "8px",
                                letterSpacing: "-0.5px"
                            }}>
                                Dobrodošli, {user?.username || "user"}!
                            </h1>
                            <p style={{
                                color: "#666",
                                fontSize: "15px",
                                margin: 0
                            }}>
                                Uloga: <span style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: "600"
                            }}>{user?.role || "-"}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Policies Section */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
                }}>
                    <div style={{
                        marginBottom: "32px"
                    }}>
                        <h2 style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "8px"
                        }}>
                            Dostupne police osiguranja
                        </h2>
                        <p style={{
                            color: "#666",
                            fontSize: "15px",
                            margin: 0
                        }}>
                            Izaberite polisu koja vam najbolje odgovara
                        </p>
                    </div>

                    {loading && (
                        <div style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            color: "#666"
                        }}>
                            <div style={{
                                fontSize: "48px",
                                marginBottom: "16px"
                            }}>⏳</div>
                            <p style={{ fontSize: "16px" }}>Učitavam police...</p>
                        </div>
                    )}

                    {error && (
                        <div style={{
                            padding: "20px",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            borderRadius: "12px",
                            color: "#dc2626",
                            fontSize: "15px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            <span style={{ fontSize: "24px" }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {!loading && !error && policies.length === 0 && (
                        <div style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            color: "#666"
                        }}>
                            <div style={{
                                fontSize: "48px",
                                marginBottom: "16px"
                            }}>🔭</div>
                            <p style={{ fontSize: "16px" }}>Trenutno nema dostupnih polisa</p>
                        </div>
                    )}

                    {!loading && !error && policies.length > 0 && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: "24px"
                        }}>
                            {policies.map((policy) => (
                                <div
                                    key={policy.id}
                                    style={{
                                        background: "#fff",
                                        border: "2px solid #f0f0f0",
                                        borderRadius: "16px",
                                        padding: "28px",
                                        transition: "all 0.3s",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-8px)";
                                        e.currentTarget.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.15)";
                                        e.currentTarget.style.borderColor = "#667eea";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                        e.currentTarget.style.borderColor = "#f0f0f0";
                                    }}
                                >
                                    <div style={{
                                        fontSize: "48px",
                                        marginBottom: "16px"
                                    }}>
                                        {getPolicyIcon(policy.type)}
                                    </div>

                                    <div style={{
                                        display: "inline-block",
                                        background: "rgba(102, 126, 234, 0.1)",
                                        color: "#667eea",
                                        padding: "4px 12px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        marginBottom: "12px"
                                    }}>
                                        {policy.type}
                                    </div>

                                    <h3 style={{
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        color: "#1a1a1a",
                                        marginBottom: "8px"
                                    }}>
                                        {policy.name}
                                    </h3>

                                    <p style={{
                                        color: "#666",
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                        marginBottom: "20px",
                                        minHeight: "40px"
                                    }}>
                                        {policy.description}
                                    </p>

                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingTop: "20px",
                                        borderTop: "1px solid #f0f0f0"
                                    }}>
                                        <div>
                                            <div style={{
                                                fontSize: "12px",
                                                color: "#999",
                                                marginBottom: "4px"
                                            }}>
                                                Cijena
                                            </div>
                                            <div style={{
                                                fontSize: "28px",
                                                fontWeight: "700",
                                                color: "#667eea"
                                            }}>
                                                ${policy.price}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePurchase(policy.id)}
                                            disabled={purchasing === policy.id}
                                            style={{
                                                background: purchasing === policy.id
                                                    ? "#ccc"
                                                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "10px",
                                                padding: "12px 24px",
                                                cursor: purchasing === policy.id ? "not-allowed" : "pointer",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                transition: "all 0.3s",
                                                boxShadow: purchasing === policy.id
                                                    ? "none"
                                                    : "0 4px 16px rgba(102, 126, 234, 0.3)"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (purchasing !== policy.id) {
                                                    e.target.style.transform = "scale(1.05)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (purchasing !== policy.id) {
                                                    e.target.style.transform = "scale(1)";
                                                }
                                            }}
                                        >
                                            {purchasing === policy.id ? "Obrađujem..." : "Kupi sada"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div style={{
                    marginTop: "32px",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "28px 40px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px"
                    }}>
                        <div style={{ fontSize: "32px" }}>💳</div>
                        <div>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#1a1a1a",
                                marginBottom: "8px"
                            }}>
                                Sigurna plaćanja preko Stripe
                            </h3>
                            <p style={{
                                color: "#666",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                margin: 0
                            }}>
                                Sve transakcije su zaštićene najnovijim sigurnosnim protokolima.
                                Nakon klika na "Kupi sada", bićete preusmjereni na Stripe checkout stranicu
                                gdje možete sigurno završiti vašu kupovinu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}