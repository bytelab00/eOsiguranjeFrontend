import React from "react";

export default function Dashboard({ user, onLogout }) {
    return (
        <div className="card">
            <h2>Dashboard</h2>
            <div>Welcome, {user?.username || "user"}</div>
            <div>Role: {user?.role || "-"}</div>
            <button onClick={onLogout}>Logout</button>
            <hr />
            <p>Success. This is your eOsiguranje dashboard placeholder.</p>
        </div>
    );
}
