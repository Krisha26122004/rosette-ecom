import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/auth.css";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: name,
                    lastName: lname,
                    dob, address, country, city, email, phone, gender
                })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("username", data.firstName);
                localStorage.setItem("token", data.token);
                alert("Congratulations " + data.firstName + "! Your account has been created.");
                navigate("/");
            } else {
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        }
    }

    return (
        <div className="auth-container">
            <h1>Create Account ✨</h1>
            <p style={{ textAlign: "center", color: "#db2777", margin: "-10px 0 15px 0", fontSize: "14px", fontWeight: "500" }}>
                Join our bloomy community
            </p>

            <form onSubmit={handleSignup}>
                <input type="text" placeholder="First Name" onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
                <input type="date" placeholder="Date of Birth" onChange={(e) => setDob(e.target.value)} required />
                <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} style={{ flex: 1 }} />
                    <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} style={{ flex: 1 }} />
                </div>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} required />
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '5px 10px', color: '#555', fontSize: '14px' }}>
                    <span>Gender:</span>
                    <label><input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} required style={{ width: 'auto' }} /> Female</label>
                    <label><input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} style={{ width: 'auto' }} /> Male</label>
                    <label><input type="radio" name="gender" value="Other" onChange={(e) => setGender(e.target.value)} style={{ width: 'auto' }} /> Other</label>
                </div>
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );


}

export default Signup;
