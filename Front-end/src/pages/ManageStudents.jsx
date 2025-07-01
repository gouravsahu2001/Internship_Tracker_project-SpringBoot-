import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import apiClient from "./utils/api"; // Adjust path if needed

const ManageStudents = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await apiClient.get("/api/admin/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await apiClient.put(`/api/admin/applications/${applicationId}/status`, {
        status: newStatus,
      });
      fetchApplications();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleViewProfile = async (studentId) => {
    try {
      const response = await apiClient.get(`/api/admin/students/${studentId}`);
      setSelectedStudent(response.data);
      setShowProfileModal(true);
    } catch (error) {
      console.error("Error fetching student profile", error);
    }
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await apiClient.delete(`/api/admin/applications/${applicationId}`);
        fetchApplications(); // Refresh after deletion
      } catch (error) {
        console.error("Error deleting internship", error.response?.data || error.message || error);
        alert("Failed to delete internship.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Manage Student Applications</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Application ID</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Internship</th>
              <th>Company</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.student.id}</td>
                <td>{app.student.name}</td>
                <td>{app.internship.title}</td>
                <td>{app.internship.company}</td>
                <td>{app.status}</td>
                <td>
                  <select
                    className="form-select"
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewProfile(app.student.id)}
                  >
                    View
                  </button>
                </td>
                
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for profile */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent ? (
            <div>
              <p><strong>ID:</strong> {selectedStudent.id}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone}</p>
              <p><strong>College:</strong> {selectedStudent.college}</p>
              <p><strong>Roll No:</strong> {selectedStudent.rollNumber}</p>
              <p><strong>Degree:</strong> {selectedStudent.degree}</p>
              <p><strong>Branch:</strong> {selectedStudent.branch}</p>
              <p><strong>Year:</strong> {selectedStudent.year}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageStudents;
