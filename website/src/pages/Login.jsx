import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("username", data.firstName);
                localStorage.setItem("token", data.token);
                alert("Welcome back, " + data.firstName + "!");
                navigate("/");
            } else {
                alert(data.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="auth-container">
            <h1>Welcome Back 🌸</h1>
            <p style={{ textAlign: "center", color: "#db2777", margin: "-10px 0 15px 0", fontSize: "14px", fontWeight: "500" }}>
                Sign in to your Rosette account
            </p>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;