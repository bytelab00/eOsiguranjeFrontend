import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. GET SESSION ID FROM URL
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        // 2. CALL BACKEND TO LOG SUCCESS
        if (sessionId) {
            fetch(`http://localhost:8080/api/purchase/success?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => console.log('Purchase logged:', data))
                .catch(err => console.error('Error logging purchase:', err));
        }

        // 3. REDIRECT AFTER 3 SECONDS
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

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
                padding: "60px 40px",
                textAlign: "center",
                maxWidth: "550px",
                width: "100%",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.2)",
                position: "relative",
                zIndex: 1
            }}>
                {/* Success Icon with Animation */}
                <div style={{
                    width: "100px",
                    height: "100px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    fontSize: "50px",
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                    animation: "successPulse 2s ease-in-out infinite"
                }}>
                    ✓
                </div>

                <h2 style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    color: "#1a1a1a",
                    letterSpacing: "-0.5px"
                }}>
                    Uspješna kupovina!
                </h2>

                <p style={{
                    color: "#666",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    marginBottom: "24px"
                }}>
                    Vaša polisa osiguranja je uspješno aktivirana.
                </p>

                <div style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "32px"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "12px"
                    }}>
                        <span style={{ fontSize: "24px" }}>📧</span>
                        <p style={{
                            color: "#059669",
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: 0
                        }}>
                            Email potvrda poslata
                        </p>
                    </div>
                    <p style={{
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        margin: 0
                    }}>
                        Poslali smo vam PDF potvrdu sa detaljima vaše police na vašu email adresu.
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#999",
                    fontSize: "14px"
                }}>
                    <div style={{
                        width: "20px",
                        height: "20px",
                        border: "3px solid #e0e0e0",
                        borderTopColor: "#667eea",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }} />
                    <span>Preusmjeravam na dashboard za 3 sekunde...</span>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                        marginTop: "24px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 32px",
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
                    Idi na Dashboard odmah
                </button>

                <style>{`
                    @keyframes successPulse {
                        0%, 100% {
                            transform: scale(1);
                            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                        }
                        50% {
                            transform: scale(1.05);
                            box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
                        }
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
}