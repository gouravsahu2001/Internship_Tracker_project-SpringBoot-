import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../pages/utils/api";

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await apiClient.get(`/api/internships/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch internship", error);
      }
    };
    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/api/internships/${id}`, formData);
      alert("Internship updated successfully");
      navigate("/manage-internships");
    } catch (error) {
      console.error("Failed to update internship", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Internship</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          className="form-control mb-2"
          placeholder="Internship Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          className="form-control mb-2"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditInternship;
