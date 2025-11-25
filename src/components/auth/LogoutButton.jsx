import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Call the API service if it handles server-side invalidation
        logout();

        // 2. Clear client-side storage (Crucial step!)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");

        // 3. Redirect
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Odjavi se
        </button>
    );
}