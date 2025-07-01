import React, { useState, useRef, useEffect } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setToastMessage("Thank you for contacting us, We'll get back to you soon!!");
    setShowToast(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
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
      className="min-vh-100 d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
      }}
    >
      <div className="container">
        {/* Animated heading */}
        <h2
          className="fw-bold position-relative d-inline-block mb-4"
          style={{ color: "black", paddingBottom: "10px" }}
        >
          Contact Us
          <span
            className="position-absolute start-50 translate-middle-x"
            style={{
              bottom: 0,
              height: "4px",
              width: "60%",
              backgroundColor: "#0d6efd",
              borderRadius: "10px",
              animation: "underlineExpand 1s ease-out forwards",
            }}
          ></span>
        </h2>

        {/* Toast Message */}
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

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form
              onSubmit={handleSubmit}
              className="p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
              }}
              noValidate
            >
              <div className="mb-3 text-start">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                />
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>

        {/* Keyframe animation */}
        <style>
          {`
            @keyframes underlineExpand {
              0% {
                width: 0%;
                opacity: 0;
              }
              100% {
                width: 60%;
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ContactUs;
