import React, { useState, useEffect, useRef } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Feedback submitted:", formData);
    setToastMessage("Thank you for your feedback!");
    setShowToast(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/fed.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
          padding: "2rem",
          marginTop: "100px",
        }}
      >
        <h2 className="mb-4 text-center">Feedback Form</h2>

        {showToast && (
          <div
            className="toast show position-fixed top-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={toastRef}
            style={{ zIndex: 1055 }}
          >
            <div className="toast-header">
              <strong className="me-auto">Submitted</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Message<span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your feedback here..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
