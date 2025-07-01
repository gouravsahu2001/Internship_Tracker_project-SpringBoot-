import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExploreClick = () => navigate("/internships");
  const handleFeedbackClick = () => navigate("/feedback");

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      {/* Hero Section */}
      <div
        className="d-flex flex-column align-items-center text-center"
        style={{
          minHeight: "90vh",
          backgroundImage: "linear-gradient(to right, #667eea, #764ba2), url('/home2.png')",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundPosition: "center",
          color: "white",
          padding: "2rem",
          justifyContent: "center",
        }}
      >
        <div className="bg-dark bg-opacity-75 p-5 rounded shadow-lg" data-aos="fade-up">
          <h1 className="display-4 fw-bold mb-3">
            Empower Your Future with the Right Internship
          </h1>
          <p className="lead mb-4">
            Discover opportunities, track your applications, and grow your career with the Student Internship Tracker.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-warning btn-lg px-4 hover-scale" onClick={handleExploreClick}>
              Explore Internships
            </button>
            <button className="btn btn-outline-light btn-lg px-4 hover-scale" onClick={handleFeedbackClick}>
              Give Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-5 text-center" style={{ background: "linear-gradient(to bottom, #e0eafc, #cfdef3)" }}>
        <div className="container">
          <h2 className="mb-4 fw-bold" data-aos="fade-down">Why Use Internship Tracker?</h2>
          <div className="row g-4">
            {[
              { title: "Centralized Tracking", desc: "Keep all your applications organized in one place." },
              { title: "Verified Opportunities", desc: "Only real, verified internships curated for students." },
              { title: "Student-Centric Tools", desc: "From profile management to status tracking." },
            ].map((card, index) => (
              <div className="col-md-4" key={index} data-aos="zoom-in">
                <div className="p-4 rounded card-glass text-dark h-100 shadow-sm">
                  <h5 className="fw-bold">{card.title}</h5>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 text-center" style={{ background: "linear-gradient(to bottom, #fbc2eb, #a6c1ee)" }}>
        <div className="container">
          <h2 className="mb-4 fw-bold" data-aos="fade-up">How It Works</h2>
          <div className="row g-4">
            {[
              "Register your account",
              "Search for internships",
              "Apply and track progress",
              "Grow your experience"
            ].map((step, i) => (
              <div className="col-md-3" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="p-3 rounded card-color h-100 shadow-sm text-white">
                  <h5>{i + 1}. {step.split(" ")[0]}</h5>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-4" data-aos="flip-up">Featured Internships</h2>
        <p className="mb-4" data-aos="fade-right">Discover the top opportunities currently trending on our platform.</p>
        <button className="btn btn-success btn-lg hover-scale" onClick={handleExploreClick}>
          Browse Now
        </button>
      </section>

      {/* Testimonials */}
      <section className="py-5 text-center text-white" style={{ background: "linear-gradient(to right, #141e30, #243b55)" }}>
        <div className="container">
          <h2 className="fw-bold mb-4" data-aos="fade-up">What Students Say</h2>
          <div className="row g-4">
            {[
              { quote: "Found my internship in just a week!", author: "Aarav, B.Tech Student" },
              { quote: "Tracking applications has never been easier.", author: "Sneha, MBA Intern" },
              { quote: "Highly recommended for students serious about careers.", author: "Ravi, Final Year CS" },
            ].map((testi, idx) => (
              <div className="col-md-4" key={idx} data-aos="zoom-in">
                <blockquote className="blockquote bg-light text-dark p-4 rounded card-hover">
                  <p>"{testi.quote}"</p>
                  <footer className="blockquote-footer mt-2">{testi.author}</footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-muted bg-light">
        <small>&copy; 2025 Student Internship Tracker. All rights reserved.</small>
      </footer>

      {/* Extra Styles */}
      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        .card-hover {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .card-glass {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .card-color {
          background: linear-gradient(to right, #ff758c, #ff7eb3);
        }
      `}</style>
    </div>
  );
};

export default Home;
