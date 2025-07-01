import React, { useState } from "react";

const AddInternshipForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ title: "", company: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); 
    setFormData({ title: "", company: "" });
  };

  return (
    <div className="container mt-4">
      <h2>Post New Internship</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Internship Title"
          className="form-control mb-2"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          type="text"
          placeholder="Company Name"
          className="form-control mb-2"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Post Internship</button>
      </form>
    </div>
  );
};

export default AddInternshipForm;
