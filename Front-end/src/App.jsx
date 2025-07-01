import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ViewCertificates from "./pages/ViewCertificates";
import Register from "./pages/Register";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardStudent from "./pages/DashboardStudent";
import InternshipList from "./pages/InternshipList";
import InternshipApply from "./pages/InternshipApply";
import Applications from "./pages/Applications";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import ProtectedRoute from "./components/ProtectedRoutes";
import PostInternship from "./pages/PostInternship";
import ManageInternships from "./pages/ManageInternships";
import EditInternship from "./pages/EditInternship";
import DeleteInternship from "./pages/DeleteInternship";
import UploadCertificate from "./pages/UploadCertificate";
import ManageStudents from "./pages/ManageStudents";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Feedback from "./pages/Feedback";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route
              path="/internships"
              element={<ProtectedRoute allowedRoles={["STUDENT", "ADMIN"]}><InternshipList user={user} /></ProtectedRoute>}
            />
            <Route
              path="/apply/:id"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><InternshipApply user={user} /></ProtectedRoute>}
            />
            <Route
              path="/applications"
              element={<ProtectedRoute allowedRoles={["STUDENT", "ADMIN"]}><Applications user={user} /></ProtectedRoute>}
            />
            <Route
              path="/reports"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><Reports user={user} /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><Profile user={user} /></ProtectedRoute>}
            />
            <Route
              path="/student/dashboard"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><DashboardStudent /></ProtectedRoute>}
            />
            <Route
              path="/offers"
              element={<ProtectedRoute allowedRoles={["STUDENT"]}><ViewCertificates user={user} /></ProtectedRoute>}
            />

            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><DashboardAdmin /></ProtectedRoute>}
            />
            <Route
              path="/admin/profile"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminProfile user={user} /></ProtectedRoute>}
            />
            <Route
              path="/post-internship"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><PostInternship /></ProtectedRoute>}
            />
            <Route
              path="/admin/upload-certificate"
              element={<UploadCertificate />}
            />
            <Route
              path="/manage-internships"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><ManageInternships /></ProtectedRoute>}
            />
            <Route
              path="/edit-internship/:id"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><EditInternship /></ProtectedRoute>}
            />
            <Route
              path="/delete-internship/:id"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><DeleteInternship /></ProtectedRoute>}
            />
            <Route
              path="/students"
              element={<ProtectedRoute allowedRoles={["ADMIN"]}><ManageStudents /></ProtectedRoute>}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
