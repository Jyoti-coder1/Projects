import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email.includes("@")) {
            alert("Invalid email address");
            return;
        }
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        dispatch(signup(formData));
        alert("Signup successful! Please login.");
        navigate("/login");
    };

    return (
        <div className="card">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />
                <button type="submit" className="signup-btn">Signup</button>
            </form>
        </div>
    );
}

export default SignupForm;