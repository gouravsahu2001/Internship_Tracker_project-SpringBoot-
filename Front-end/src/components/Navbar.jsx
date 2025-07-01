import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
            <div className="container-fluid px-4">
                
                <Link className="navbar-brand fw-bold fs-5" to="/">
                    Internship Tracker
                </Link>

                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/internships">Internships</Link>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {user.role === "ADMIN" && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                                    </li>
                                )}
                                {user.role === "STUDENT" && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/student/dashboard">Student Dashboard</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    
                                    <span
                                        className="nav-link"
                                        role="button"
                                        onClick={handleLogout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Logout
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;