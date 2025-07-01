import React, { useEffect, useState } from "react";
import apiClient from "../pages/utils/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await apiClient.get("/api/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const cancelApplication = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this application?")) return;

    try {
      await apiClient.delete(`/api/applications/${id}`);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Failed to cancel application:", error);
      alert("Cancellation failed. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Applications</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>id</th>
            <th>Internship</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{app.internshipTitle || "N/A"}</td>
                <td>{app.status}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
