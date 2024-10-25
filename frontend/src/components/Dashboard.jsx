import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Dashboard = () => {
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };

    return (
        <div>
            <h1>Hi, {username}!</h1>
            <p>This is your dashboard.</p>
            <LogoutButton></LogoutButton>
        </div>
    );
};

export default Dashboard;
