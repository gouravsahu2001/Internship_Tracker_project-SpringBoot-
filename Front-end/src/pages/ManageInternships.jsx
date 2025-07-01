import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../pages/utils/api";

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);

  const fetchInternships = async () => {
    try {
      const response = await apiClient.get("/api/internships");
      setInternships(response.data);
    } catch (error) {
      console.error("Failed to fetch internships", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await apiClient.delete(`/api/internships/${id}`);
        fetchInternships(); 
      } catch (error) {
        console.error("Failed to delete internship", error);
      }
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Manage Internships</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((internship) => (
            <tr key={internship.id}>
              <td>{internship.title}</td>
              <td>{internship.company}</td>
              <td>{internship.description}</td>
              <td>
                <Link to={`/edit-internship/${internship.id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(internship.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInternships;
