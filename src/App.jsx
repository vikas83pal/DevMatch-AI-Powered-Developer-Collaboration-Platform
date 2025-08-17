import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Project from "./components/Project";
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
  return (
    <Router>
      <NavBar />
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot" element={<ForgotPassword />} />
  <Route path="/contact" element={<Contact />} />

  {/* Other Routes */}
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
