import React, { useState } from "react";
import defaultImage from "../assets/default-profile.png"; // use default image

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    branch: "",
    year: ""
    
  });

  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student Profile</h2>
      
      <div className="d-flex flex-column align-items-center mb-4">
        <label htmlFor="photo-upload" style={{ cursor: "pointer" }}>
          <img
            src={photo || defaultImage}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #007bff" }}
          />
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
        <div className="mt-2">
          <button className="btn btn-sm btn-secondary me-2" onClick={() => document.getElementById("photo-upload").click()}>
            Change Photo
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleRemovePhoto}>
            Remove Photo
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="name" type="text" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" type="text" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Course</label>
              <input name="course" type="text" className="form-control" value={formData.course} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Branch</label>
              <input name="branch" type="text" className="form-control" value={formData.branch} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Year</label>
              <input name="year" type="text" className="form-control" value={formData.year} onChange={handleChange} />
            </div>

            

            <div className="mb-3">
              <label className="form-label">Upload Resume (PDF)</label>
              <input type="file" accept=".pdf" className="form-control" onChange={handleResumeUpload} />
              {resume && <p className="mt-2">Selected: {resume.name}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
