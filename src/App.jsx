import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Project from "./components/ProjectsList";
import Home from "./components/Home";
import Match from "./components/Match";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Arena from "./components/Arena";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setLoggedIn(true);
      setInitials(storedEmail.slice(0, 2).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setLoggedIn(false);
    setInitials("");
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} initials={initials} handleLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <Login
              setLoggedIn={setLoggedIn}
              setInitials={setInitials}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />

        {/* Other Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/match" element={<Match />} />
        <Route path="/arena" element={<Arena />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;