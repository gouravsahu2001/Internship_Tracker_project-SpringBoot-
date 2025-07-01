import React, { useState, useEffect, useRef } from "react";
import apiClient from "../pages/utils/api";

const InternshipList = ({ user }) => {
  const [internships, setInternships] = useState([]);
  const toastRef = useRef(null);

  
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await apiClient.get("/api/internships");
        setInternships(response.data);
      } catch (error) {
        console.error("Failed to load internships", error);
      }
    };

    fetchInternships();
  }, []);

  const showToast = () => {
    if (toastRef.current) {
      toastRef.current.classList.add("show");
      setTimeout(() => {
        toastRef.current.classList.remove("show");
      }, 4000);
    }
  };

  const handleApply = (e, id) => {
    if (!user) {
      e.preventDefault(); 
      showToast();
    }
    
  };

  return (
    <div className="container mt-4">
    
      <div
        ref={toastRef}
        className="toast align-items-center text-dark bg-warning border border-secondary position-fixed top-0 start-50 translate-middle-x mt-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ minWidth: "300px", fontSize: "1.1rem", zIndex: 1055 }}
      >
        <div className="d-flex">
          <div className="toast-body">
            Please login or register first to apply for internships.
          </div>
          <button
            type="button"
            className="btn-close btn-close-dark me-2 m-auto"
            onClick={() => toastRef.current?.classList.remove("show")}
            aria-label="Close"
          ></button>
        </div>
      </div>

      <h2 className="mb-4">Available Internships</h2>
      <div className="row">
        {internships.length > 0 ? (
          internships.map((item, index) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Company : {item.company}</h6>
                  <p className="card-text flex-grow-1"> Desciption : {item.description}</p>
                  <p className="card-text flex-grow-1"> Duration : 6 months</p>
                  <a
                    href={`/apply/${item.id}`}
                    className="btn btn-primary mt-auto"
                    onClick={(e) => handleApply(e, item.id)}
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No internships found. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default InternshipList;