import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../pages/utils/api";

const DeleteInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await apiClient.get(`/api/internships/${id}`);
        setInternship(response.data);
      } catch (error) {
        console.error("Failed to fetch internship", error);
      }
    };
    fetchInternship();
  }, [id]);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/internships/${id}`);
      alert("Internship deleted successfully.");
      navigate("/manage-internships");
    } catch (error) {
      console.error("Error deleting internship", error);
      alert("Failed to delete internship.");
    }
  };

  if (!internship) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Delete Internship</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{internship.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{internship.company}</h6>
          <p className="card-text">{internship.description}</p>
          <div className="mt-3">
            <button onClick={handleDelete} className="btn btn-danger me-2">Confirm Delete</button>
            <Link to="/manage-internships" className="btn btn-secondary">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInternship;
