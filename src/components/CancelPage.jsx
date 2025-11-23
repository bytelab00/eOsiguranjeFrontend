import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. GET SESSION ID FROM URL
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        // 2. CALL BACKEND TO LOG CANCELLATION
        if (sessionId) {
            fetch(`http://localhost:8080/api/purchase/cancel?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => console.log('Cancellation logged:', data))
                .catch(err => console.error('Error logging cancel:', err));
        }

        // 3. REDIRECT AFTER 3 SECONDS
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const container = {
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
        textAlign: "center",
        padding: "40px 20px"
    };

    const card = {
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        maxWidth: "500px"
    };

    return (
        <div style={container}>
            <div style={card}>
                <h1 style={{ color: "#d9534f", fontWeight: "700" }}>
                    Payment Failed
                </h1>
                <p style={{ marginTop: "16px", color: "#555", fontSize: "18px" }}>
                    Your payment was not completed.
                    You will be redirected shortly.
                </p>
            </div>
        </div>
    );
}