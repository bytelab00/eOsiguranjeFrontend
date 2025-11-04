import React from "react";

export default function AdminDashboard({ user, onLogout }) {
    return (
        <div className="card">
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user?.username}</p>
            <p>Role: {user?.role}</p>

            <hr />
            <h3>Admin Controls</h3>
            <ul style={{ textAlign: "left" }}>
                <li>View all registered users</li>
                <li>Manage insurance policies</li>
                <li>Review suspicious transactions</li>
                <li>Generate system reports</li>
            </ul>

            <button onClick={onLogout} style={{ marginTop: "20px" }}>
                Logout
            </button>
        </div>
    );
}
