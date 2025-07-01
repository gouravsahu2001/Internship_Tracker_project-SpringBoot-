import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const temp = {};

        if (!email) {
            temp.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            temp.email = "Invalid email format.";
        }

        if (!password) {
            temp.password = "Password is required.";
        } else if (password.length < 6) {
            temp.password = "Password must be at least 6 characters.";
        }

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        if (!validate()) return;

        try {
            const response = await axios.post(
                `http://localhost:8080/api/auth/${role === "admin" ? "admin/" : ""}login`,
                { email, password }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            onLogin(response.data);

            if (response.data.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (response.data.role === "STUDENT") {
                navigate("/student/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            alert("Login failed: " + (error.response?.data?.message || "Invalid credentials"));
        }
    };

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: "url('/login1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className="col-md-4 p-4"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.2)"
                }}
            >
                <ul className="nav nav-tabs mb-3 justify-content-center">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${role === "student" ? "active" : ""}`}
                            onClick={() => setRole("student")}
                            type="button"
                        >
                            Student Login
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${role === "admin" ? "active" : ""}`}
                            onClick={() => setRole("admin")}
                            type="button"
                        >
                            Admin Login
                        </button>
                    </li>
                </ul>

                <h4 className="text-center mb-3">
                    {role === "admin" ? "Admin Login" : "Student Login"}
                </h4>

                <form onSubmit={handleLogin} noValidate>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder={`${role === "admin" ? "Admin" : "Student"} Email`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                            required
                        />
                        {touched.email && errors.email && (
                            <small className="text-danger">{errors.email}</small>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                            required
                        />
                        {touched.password && errors.password && (
                            <small className="text-danger">{errors.password}</small>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                    <div className="text-center mt-3">
    <span>Not registered? </span>
    <a href="/register">Register as Student</a>
</div>

                </form>
            </div>
        </div>
    );
};

export default Login;
