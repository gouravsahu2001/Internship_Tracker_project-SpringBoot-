import React from "react";

const InternshipCard = ({ internship }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{internship.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{internship.company}</h6>
        <p className="card-text">Location: {internship.location || 'N/A'}</p>
        <a href={`/apply/${internship.id}`} className="btn btn-outline-primary btn-sm">Apply</a>
      </div>
    </div>
  );
};

export default InternshipCard;