import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../pages/utils/api";

const InternshipApply = () => {
  const { id: internshipId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeUrl: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to apply.");

    const decoded = parseJwt(token);
    const studentId = decoded?.userId;
    if (!studentId) return alert("Invalid user token.");

    try {
      await apiClient.post(
        "/api/applications",
        {
          studentId,
          internshipId,
          coverLetter: formData.coverLetter,
          resumeUrl: formData.resumeUrl,
          status: "PENDING"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Application submitted successfully!");
      navigate("/applications");
    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to apply for internship.");
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        padding: "20px"
      }}
    >
      <div
        className="p-5 shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(200, 200, 200, 0.3)"
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
           Internship Application
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">Cover Letter</label>
            <textarea
              name="coverLetter"
              className="form-control shadow-sm"
              placeholder="Tell us why you're a great fit for this internship. Mention your skills, interests, or past projects"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={6}
              style={{
                borderRadius: "12px",
                padding: "12px",
                fontSize: "15px",
                border: "1px solid #ccc"
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold"> Resume Link</label>
            <input
              type="url"
              name="resumeUrl"
              className="form-control shadow-sm"
              placeholder="Enter a shareable Google Drive link (PDF only)"
              value={formData.resumeUrl}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
                padding: "10px",
                fontSize: "15px",
                border: "1px solid #ccc"
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            style={{
              borderRadius: "12px",
              padding: "12px",
              fontSize: "16px",
              letterSpacing: "0.5px"
            }}
          >
             Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default InternshipApply;
