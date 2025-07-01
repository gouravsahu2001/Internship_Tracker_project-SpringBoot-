import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../pages/utils/api";

const PostInternship = () => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: ""
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiClient.post("/api/internships", formData);
            setSuccessMessage("Internship posted successfully!");
            setFormData({ title: "", company: "", description: "" });
        } catch (error) {
            alert("Failed to post internship.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm rounded-4">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Post New Internship</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Internship Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter internship title"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="company" className="form-label">Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="5"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter internship description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success btn-lg">Post Internship</button>
                                </div>
                            </form>

                            {/* ✅ Success message with link */}
                            {successMessage && (
                                <div className="alert alert-success mt-4" role="alert">
                                    {successMessage}{" "}
                                    <Link to="/manage-internships" className="alert-link">
                                        Go to Manage Internships &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostInternship;
