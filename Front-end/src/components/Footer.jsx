import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const headingStyle = {
    fontWeight: "600",
    fontSize: "1rem",
    color: "#f8f9fa",
    marginBottom: "0.4rem",
    borderBottom: "1px solid #0d6efd",
    paddingBottom: "0.2rem",
  };

  const itemStyle = {
    fontSize: "0.8rem",
    marginBottom: "0.2rem",
    color: "#d1d1d1",
  };

  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-3">
        <div className="row text-center text-md-start mb-2">
          <div className="col-md-4">
            <h6 style={headingStyle}>About Us</h6>
            <p style={itemStyle}>
              Internship Tracker helps students find internships, and admins post and manage them.
            </p>
          </div>
          <div className="col-md-4">
            <h6 style={headingStyle}>Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li style={itemStyle}>
                <Link to="/aboutus" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li style={itemStyle}>
                <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
              </li>
              <li style={itemStyle}>
                <Link to="/feedback" className="text-white text-decoration-none">Rate Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 style={headingStyle}>Support</h6>
            <p style={itemStyle}><i className="bi bi-envelope-fill me-2"></i>support@internshiptracker.com</p>
            <p style={itemStyle}><i className="bi bi-telephone-fill me-2"></i>+91-9876543210</p>
            <p style={itemStyle}><i className="bi bi-clock-fill me-2"></i>Mon – Fri: 10:00 AM – 6:00 PM</p>
          </div>
        </div>
        <hr className="bg-secondary my-2" />
        <p className="text-center mb-0 pb-0" style={{ fontSize: "0.75rem", color: "#bbbbbb" }}>
          &copy; 2025 Student Internship Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
