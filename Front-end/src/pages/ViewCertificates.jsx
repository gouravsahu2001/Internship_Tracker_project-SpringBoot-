import React, { useEffect, useState } from "react";

const ViewCertificates = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate fetching completed applications (dummy data)
  useEffect(() => {
    const dummyApplications = [
      {
        id: 1,
        internship: {
          title: "Web Development Internship",
          companyName: "TCS",
          startDate: "2024-01-01",
          endDate: "2024-03-01",
        },
      },
    ];

    setTimeout(() => {
      setApplications(dummyApplications);
      setLoading(false);
    }, 1000); // Simulate API delay
  }, []);

  // Download dummy certificate
  const handleDownload = (applicationId) => {
    const link = document.createElement("a");
    link.href = "/dummy-certificate.pdf"; // Make sure this PDF exists in public folder
    link.setAttribute("download", `certificate_${applicationId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // UI
  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      <h3 className="text-center mb-4">Internship Completion Certificates</h3>

      {loading && <div className="text-center">Loading...</div>}

      {error && <div className="text-danger text-center">{error}</div>}

      {!loading && !error && applications.length === 0 && (
        <div className="text-center">No completed internships found.</div>
      )}

      <div className="row">
        {applications.map((app) => (
          <div key={app.id} className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">
                  {app.internship.title || "Untitled Internship"}
                </h5>
                <p className="card-text">
                  <strong>Company:</strong> {app.internship.companyName} <br />
                  <strong>Duration:</strong> {app.internship.startDate} to{" "}
                  {app.internship.endDate}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownload(app.id)}
                >
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCertificates;
