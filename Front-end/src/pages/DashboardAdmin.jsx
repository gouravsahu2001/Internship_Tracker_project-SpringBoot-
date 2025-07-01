import React from "react";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Admin Stats */}
      <div className="row text-center mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Internships Posted</h5>
              <h3>12</h3> {/* Replace with dynamic value later */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Total Applications Received</h5>
              <h3>35</h3> {/* Replace with dynamic value later */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white shadow">
            <div className="card-body">
              <h5>Certificates Issued</h5>
              <h3>8</h3> {/* Replace with dynamic value later */}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Post Internship</h5>
              <p>Create and publish new internship opportunities.</p>
              <Link to="/post-internship" className="btn btn-primary btn-sm">
                Post Internship
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Manage Internships</h5>
              <p>Edit or delete posted internships.</p>
              <Link to="/manage-internships" className="btn btn-outline-secondary btn-sm">
                Manage Internships
              </Link>
            </div>
          </div>
        </div>

        
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Manage Students</h5>
              <p>Activate, deactivate or edit student accounts.</p>
              <Link to="/students" className="btn btn-info btn-sm">
                Manage Students
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Upload Certificate</h5>
              <p>Upload internship certificates for students.</p>
              <Link to="/admin/upload-certificate" className="btn btn-warning btn-sm">
                Upload Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
