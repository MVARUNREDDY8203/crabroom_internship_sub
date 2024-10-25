import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });
            console.log(response);
            const { token, username } = response.data;
            localStorage.setItem("token", token);
            setSuccess(response.data.message);
            setError("");
            setPassword("");
            setEmail("");
            navigate("/dashboard", { state: { username } });
        } catch (err) {
            console.log(error.response?.data);
            setSuccess("");
            setError(error.response?.data.message || "Login failed");
        }
    };
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button onSubmit={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;
