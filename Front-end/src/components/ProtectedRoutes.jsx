import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;