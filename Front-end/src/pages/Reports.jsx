import React, { useEffect, useState } from "react";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    setData([
      { internship: "Frontend Developer Intern", applicants: 10 },
      { internship: "Backend Developer Intern", applicants: 5 },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Reports</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Internship</th>
            <th>Number of Applicants</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.internship}</td>
              <td>{row.applicants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;