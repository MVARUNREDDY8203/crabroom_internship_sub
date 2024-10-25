import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");

        // Redirect the user to the login page
        navigate("/login");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
