import React, { useState } from "react";
import apiClient from "../pages/utils/api";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        college: "",
        rollNumber: "",
        degree: "",
        branch: "",
        year: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (fieldValues = formData) => {
        const temp = { ...errors };

        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "Name is required.";

        if ("email" in fieldValues)
            temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
                ? ""
                : "Email is not valid.";

        if ("password" in fieldValues)
            temp.password =
                fieldValues.password.length >= 6
                    ? ""
                    : "Password must be at least 6 characters.";

        if ("phone" in fieldValues)
            temp.phone = /^[0-9]{10}$/.test(fieldValues.phone)
                ? ""
                : "Phone must be 10 digits.";

        if ("college" in fieldValues)
            temp.college = fieldValues.college ? "" : "College name is required.";

        if ("rollNumber" in fieldValues)
            temp.rollNumber = fieldValues.rollNumber ? "" : "Roll number is required.";

        if ("degree" in fieldValues)
            temp.degree = fieldValues.degree ? "" : "Degree is required.";

        if ("branch" in fieldValues)
            temp.branch = fieldValues.branch ? "" : "Branch is required.";

        if ("year" in fieldValues)
            temp.year = fieldValues.year ? "" : "Year is required.";

        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...formData, [name]: value };
        setFormData(updatedForm);

        if (touched[name]) {
            validate({ [name]: value });
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validate({ [name]: formData[name] });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await apiClient.post("/api/auth/register", formData);
            alert("Registration successful!");
            window.location.href = "/login";
        } catch (error) {
            alert("Registration failed: " + (error.response?.data?.message || error.message));
        }
    };

    const renderError = (field) =>
        touched[field] && errors[field] ? (
            <small className="text-danger">{errors[field]}</small>
        ) : null;

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: "url('/reg1.png')",
                
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div
                className="col-md-6 p-4"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.2)"
                }}
            >
                <h2 className="text-center mb-4">Student Registration</h2>
                <form onSubmit={handleRegister} noValidate>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {renderError("name")}
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {renderError("email")}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {renderError("password")}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {renderError("phone")}
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="college" className="form-label">College Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="college"
                                name="college"
                                placeholder="Enter college name"
                                value={formData.college}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {renderError("college")}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="rollNumber" className="form-label">Roll Number / Student ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rollNumber"
                                name="rollNumber"
                                placeholder="Enter roll number"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {renderError("rollNumber")}
                        </div>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label htmlFor="degree" className="form-label">Select Degree</label>
                            <select
                                className="form-select"
                                id="degree"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            >
                                <option value="">Select Degree</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                            </select>
                            {renderError("degree")}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="branch" className="form-label">Select Branch</label>
                            <select
                                className="form-select"
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            >
                                <option value="">Select Branch</option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                            </select>
                            {renderError("branch")}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="year" className="form-label">Select Year</label>
                            <select
                                className="form-select"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            {renderError("year")}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
