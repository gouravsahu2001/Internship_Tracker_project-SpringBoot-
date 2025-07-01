import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Gourav Sahu",
     
      photo: "/motu.jpg",
      bio: "Gourav leads the vision and strategy of the Student Internship Tracker platform.",
    },
    {
      id: 2,
      name: "Shital Kawthe",
    
      photo: "/shital.jpg",
      bio: "Shital Kawthe leads the frontend and backend development teams with a passion for clean code.",
    },
    {
      id: 3,
      name: "Abhishek Verma",
      
      photo: "/abhi.jpg",
      bio: "Abhishek crafts user-friendly designs that make the application intuitive and engaging.",
    },
  ];

  return (
    <div className="container mt-5 text-center">
      {/* Stylish heading */}
      <h1
        className="mb-5 fw-bold position-relative d-inline-block"
        data-aos="fade-down"
        style={{
          paddingBottom: "10px",
        }}
      >
        About Us
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
      </h1>

      {/* About sections */}
      <section className="mb-5" data-aos="fade-right">
        <h2>Our Story</h2>
        <p className="mx-auto w-75">
          Student Internship Tracker is an innovative platform designed to connect
          students with the best internship opportunities available. Founded in 2025,
          our goal is to simplify the internship search process and empower students
          to gain valuable industry experience.
        </p>
      </section>

      <section className="mb-5" data-aos="fade-left">
        <h2>Our Mission</h2>
        <p className="mx-auto w-75">
          To bridge the gap between academia and industry by providing students with
          a seamless way to discover, apply for, and manage internships that align with
          their career goals.
        </p>
      </section>

      <section className="mb-5" data-aos="fade-right">
        <h2>Our Vision</h2>
        <p className="mx-auto w-75">
          To be the most trusted and comprehensive internship platform, fostering
          growth and opportunities for students worldwide.
        </p>
      </section>

      {/* Team Cards */}
      <section>
        <h2 className="mb-4" data-aos="zoom-in">Meet Our Team</h2>
        <div className="row justify-content-center">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-md-4 mb-4" data-aos="zoom-in-up">
              <div
                className="card h-100 text-center shadow-lg border-0"
                style={{
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={member.photo}
                  className="card-img-top rounded-circle mx-auto mt-4 border border-3"
                  alt={member.name}
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{member.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{member.role}</h6>
                  <p className="card-text flex-grow-1">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom CSS keyframes inside JSX */}
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
  );
};

export default AboutUs;
