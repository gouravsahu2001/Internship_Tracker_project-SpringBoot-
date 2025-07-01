import React, { useState } from "react";
import axios from "axios";

const UploadCertificate = () => {
  const [applicationId, setApplicationId] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!file || !applicationId) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("applicationId", applicationId);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/certificates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Certificate uploaded successfully.");
    } catch (error) {
      console.error("Upload error", error);
      setMessage("Failed to upload certificate.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Upload Certificate</h3>
      {message && <p className="text-info text-center">{message}</p>}
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label>Application ID</label>
          <input
            type="text"
            className="form-control"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Upload PDF Certificate</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Upload</button>
      </form>
    </div>
  );
};

export default UploadCertificate;
