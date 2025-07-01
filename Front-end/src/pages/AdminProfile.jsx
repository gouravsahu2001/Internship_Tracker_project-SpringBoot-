import React, { useState, useRef, useEffect } from "react";

const AdminProfile = () => {
  
  const initialAdminData = {
    name: "Admin Name",
    email: "admin@example.com",
    phone: "1234567890",
    role: "Administrator",
    photo: null, 
  };

  const [formData, setFormData] = useState(initialAdminData);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    
    if (formData.photo && typeof formData.photo === "string") {
      setPreviewUrl(formData.photo);
    }
  }, [formData.photo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, photo: file }));
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, photo: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert(`Admin profile updated for ${formData.name}`);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Admin Profile</h2>

      <div className="d-flex flex-column align-items-center mb-3">
        <div
          onClick={handleImageClick}
          className="rounded-circle border"
          style={{
            width: "140px",
            height: "140px",
            overflow: "hidden",
            backgroundColor: "#e9ecef",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
          title="Click to upload/change photo"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "#6c757d" }}>Upload Photo</span>
          )}
        </div>

        {previewUrl && (
          <div className="mt-2 d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleImageClick}
            >
              Change Photo
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleRemovePhoto}
            >
              Remove Photo
            </button>
          </div>
        )}

      
        <input
          ref={fileInputRef}
          type="file"
          name="photo"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
          readOnly
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3" aria-disabled>
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            readOnly
            onChange={handleChange}
            required
            placeholder="Full Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email (read-only)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            readOnly
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            className="form-control"
            value={formData.role}
            readOnly
          />
        </div>

        
      </form>
    </div>
  );
};

export default AdminProfile;
