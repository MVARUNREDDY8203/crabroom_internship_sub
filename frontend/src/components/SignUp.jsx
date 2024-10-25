import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSingUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                name,
                email,
                password,
            });
            console.log(response);
            setSuccess(response.data.message);
            setError("");
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error.response?.data);
            setSuccess("");
            setError(error.response?.data.message || "SignUp failed");
        }
    };
    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{"success"}</p>}
            <form onSubmit={handleSingUp}>
                <input
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                ></input>
                <input
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
