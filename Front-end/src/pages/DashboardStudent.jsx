import React from "react";
import { Link } from "react-router-dom";

const DashboardStudent = () => {
  return (
    <div style={{background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)"}}>
    <div className="container mt-4" >
      <h2 className="text-center mb-4">Student Dashboard</h2>

      {/* Quick Stats */}
      <div className="row text-center mb-4" >
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white shadow">
            <div className="card-body">
              <h5>Internships Applied</h5>
              <h3>10</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Approved Applications</h5>
              <h3>5</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h5>Rejected Applications</h5>
              <h3>2</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Student Actions */}
      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Browse Internships</h5>
              <p>Explore and apply for open internships.</p>
              <Link to="/internships" className="btn btn-primary btn-sm">
                View Internships
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5>Application Status</h5>
              <p>Check your application status & feedback.</p>
              <Link to="/applications" className="btn btn-success btn-sm">
                View Status
              </Link>
            </div>
          </div>
        </div>

        

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5> Internship Completion Certificate</h5>
              <p>Download certificate for selected internships.</p>
              <Link to="/offers" className="btn btn-info btn-sm">
                View certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardStudent;
