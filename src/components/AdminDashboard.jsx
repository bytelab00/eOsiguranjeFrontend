import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard({ user, onLogout }) {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "Travel",
        description: "",
        price: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:8080/api/admin/policies",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setPolicies(response.data);
            setError(null);
        } catch (err) {
            setError(err?.response?.data?.message || "Greška pri učitavanju polisa");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingPolicy(null);
        setFormData({
            name: "",
            type: "Travel",
            description: "",
            price: ""
        });
        setShowModal(true);
    };

    const handleEdit = (policy) => {
        setEditingPolicy(policy);
        setFormData({
            name: policy.name,
            type: policy.type,
            description: policy.description,
            price: policy.price
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Da li ste sigurni da želite obrisati ovu polisu?")) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `http://localhost:8080/api/admin/policies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchPolicies();
        } catch (err) {
            setError(err?.response?.data?.message || "Greška pri brisanju polise");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            const payload = {
                name: formData.name,
                type: formData.type,
                description: formData.description,
                price: parseFloat(formData.price)
            };

            if (editingPolicy) {
                // Update existing policy
                await axios.put(
                    `http://localhost:8080/api/admin/policies/${editingPolicy.id}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
            } else {
                // Create new policy
                await axios.post(
                    "http://localhost:8080/api/admin/policies",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
            }

            setShowModal(false);
            fetchPolicies();
            setError(null);
        } catch (err) {
            setError(err?.response?.data?.message || "Greška pri čuvanju polise");
        } finally {
            setSubmitting(false);
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
                maxWidth: "1400px",
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
                                Admin Dashboard
                            </h1>
                            <p style={{
                                color: "#666",
                                fontSize: "15px",
                                margin: 0
                            }}>
                                Dobrodošli, <strong>{user?.username}</strong> | Uloga: <span style={{
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                color: "#fff",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: "600"
                            }}>{user?.role}</span>
                            </p>
                        </div>
                        {/*
                        <button
                            onClick={onLogout}
                            style={{
                                background: "#fff",
                                color: "#f5576c",
                                border: "2px solid #f5576c",
                                borderRadius: "10px",
                                padding: "10px 24px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "15px",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#f5576c";
                                e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "#fff";
                                e.target.style.color = "#f5576c";
                            }}
                        >
                            Odjavi se
                        </button>
                        */}
                    </div>
                </div>

                {/* Policies Management Section */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "32px",
                        flexWrap: "wrap",
                        gap: "16px"
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#1a1a1a",
                                marginBottom: "8px"
                            }}>
                                Upravljanje policama osiguranja
                            </h2>
                            <p style={{
                                color: "#666",
                                fontSize: "15px",
                                margin: 0
                            }}>
                                Kreiraj, izmijeni ili obriši police
                            </p>
                        </div>
                        <button
                            onClick={handleCreate}
                            style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "10px",
                                padding: "12px 28px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "15px",
                                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
                            }}
                        >
                            + Nova polisa
                        </button>
                    </div>

                    {error && (
                        <div style={{
                            padding: "16px 20px",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            borderRadius: "12px",
                            color: "#dc2626",
                            fontSize: "15px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "24px"
                        }}>
                            <span style={{ fontSize: "24px" }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {loading && (
                        <div style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            color: "#666"
                        }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
                            <p style={{ fontSize: "16px" }}>Učitavam police...</p>
                        </div>
                    )}

                    {!loading && policies.length === 0 && (
                        <div style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            color: "#666"
                        }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
                            <p style={{ fontSize: "16px", marginBottom: "20px" }}>Nema kreiranih polisa</p>
                            <button
                                onClick={handleCreate}
                                style={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "12px 28px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "15px"
                                }}
                            >
                                Kreiraj prvu polisu
                            </button>
                        </div>
                    )}

                    {!loading && policies.length > 0 && (
                        <div style={{
                            overflowX: "auto"
                        }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "separate",
                                borderSpacing: "0 12px"
                            }}>
                                <thead>
                                <tr style={{
                                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)"
                                }}>
                                    <th style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: "#666",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        borderRadius: "10px 0 0 10px"
                                    }}>
                                        Tip
                                    </th>
                                    <th style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: "#666",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    }}>
                                        Naziv
                                    </th>
                                    <th style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: "#666",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    }}>
                                        Opis
                                    </th>
                                    <th style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: "#666",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    }}>
                                        Cijena
                                    </th>
                                    <th style={{
                                        padding: "16px 20px",
                                        textAlign: "right",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        color: "#666",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        borderRadius: "0 10px 10px 0"
                                    }}>
                                        Akcije
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {policies.map((policy) => (
                                    <tr key={policy.id} style={{
                                        background: "#fff",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                                        transition: "all 0.3s"
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                                        }}>
                                        <td style={{
                                            padding: "20px",
                                            borderRadius: "10px 0 0 10px"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}>
                                                <span style={{ fontSize: "24px" }}>{getPolicyIcon(policy.type)}</span>
                                                <span style={{
                                                    background: "rgba(102, 126, 234, 0.1)",
                                                    color: "#667eea",
                                                    padding: "4px 10px",
                                                    borderRadius: "6px",
                                                    fontSize: "12px",
                                                    fontWeight: "600"
                                                }}>
                                                        {policy.type}
                                                    </span>
                                            </div>
                                        </td>
                                        <td style={{
                                            padding: "20px",
                                            fontWeight: "600",
                                            color: "#1a1a1a"
                                        }}>
                                            {policy.name}
                                        </td>
                                        <td style={{
                                            padding: "20px",
                                            color: "#666",
                                            fontSize: "14px",
                                            maxWidth: "300px"
                                        }}>
                                            {policy.description}
                                        </td>
                                        <td style={{
                                            padding: "20px",
                                            fontWeight: "700",
                                            color: "#667eea",
                                            fontSize: "18px"
                                        }}>
                                            ${policy.price}
                                        </td>
                                        <td style={{
                                            padding: "20px",
                                            textAlign: "right",
                                            borderRadius: "0 10px 10px 0"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                gap: "8px",
                                                justifyContent: "flex-end"
                                            }}>
                                                <button
                                                    onClick={() => handleEdit(policy)}
                                                    style={{
                                                        background: "#fff",
                                                        color: "#667eea",
                                                        border: "2px solid #667eea",
                                                        borderRadius: "8px",
                                                        padding: "8px 16px",
                                                        cursor: "pointer",
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        transition: "all 0.3s"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = "#667eea";
                                                        e.target.style.color = "#fff";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = "#fff";
                                                        e.target.style.color = "#667eea";
                                                    }}
                                                >
                                                    ✏️ Izmijeni
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(policy.id)}
                                                    style={{
                                                        background: "#fff",
                                                        color: "#ef4444",
                                                        border: "2px solid #ef4444",
                                                        borderRadius: "8px",
                                                        padding: "8px 16px",
                                                        cursor: "pointer",
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        transition: "all 0.3s"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = "#ef4444";
                                                        e.target.style.color = "#fff";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = "#fff";
                                                        e.target.style.color = "#ef4444";
                                                    }}
                                                >
                                                    🗑️ Obriši
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Create/Edit */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px"
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "20px",
                        padding: "40px",
                        maxWidth: "600px",
                        width: "100%",
                        boxShadow: "0 25px 70px rgba(0, 0, 0, 0.3)",
                        maxHeight: "90vh",
                        overflowY: "auto"
                    }}>
                        <h2 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "8px"
                        }}>
                            {editingPolicy ? "Izmijeni polisu" : "Nova polisa"}
                        </h2>
                        <p style={{
                            color: "#666",
                            fontSize: "15px",
                            marginBottom: "32px"
                        }}>
                            {editingPolicy ? "Ažurirajte informacije o polisi" : "Dodajte novu polisu osiguranja"}
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "8px"
                                }}>
                                    Naziv polise *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="npr. Travel Basic"
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
                                        e.target.style.borderColor = "#667eea";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e8e8e8";
                                        e.target.style.boxShadow = "none";
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
                                }}>
                                    Tip polise *
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "14px 16px",
                                        fontSize: "15px",
                                        border: "2px solid #e8e8e8",
                                        borderRadius: "10px",
                                        outline: "none",
                                        transition: "all 0.3s",
                                        boxSizing: "border-box",
                                        cursor: "pointer"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#667eea";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e8e8e8";
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="Travel">Travel</option>
                                    <option value="Health">Health</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Home">Home</option>
                                    <option value="Life">Life</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "8px"
                                }}>
                                    Opis *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    placeholder="Opišite detalje polise..."
                                    rows="4"
                                    style={{
                                        width: "100%",
                                        padding: "14px 16px",
                                        fontSize: "15px",
                                        border: "2px solid #e8e8e8",
                                        borderRadius: "10px",
                                        outline: "none",
                                        transition: "all 0.3s",
                                        boxSizing: "border-box",
                                        resize: "vertical",
                                        fontFamily: "inherit"
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

                            <div style={{ marginBottom: "32px" }}>
                                <label style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "8px"
                                }}>
                                    Cijena ($) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    placeholder="49.99"
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
                                        e.target.style.borderColor = "#667eea";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#e8e8e8";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            <div style={{
                                display: "flex",
                                gap: "12px",
                                justifyContent: "flex-end"
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    disabled={submitting}
                                    style={{
                                        background: "#fff",
                                        color: "#666",
                                        border: "2px solid #e8e8e8",
                                        borderRadius: "10px",
                                        padding: "12px 24px",
                                        cursor: submitting ? "not-allowed" : "pointer",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        transition: "all 0.3s"
                                    }}
                                >
                                    Otkaži
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        background: submitting
                                            ? "#ccc"
                                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        padding: "12px 32px",
                                        cursor: submitting ? "not-allowed" : "pointer",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        boxShadow: submitting
                                            ? "none"
                                            : "0 4px 16px rgba(102, 126, 234, 0.3)",
                                        transition: "all 0.3s"
                                    }}
                                >
                                    {submitting ? "Čuvam..." : (editingPolicy ? "Sačuvaj izmjene" : "Kreiraj polisu")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}