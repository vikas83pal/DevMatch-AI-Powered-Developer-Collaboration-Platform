import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Project from "./components/Project";
import Match from "./components/Match";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Arena from "./components/Arena";
import ProtectedRoute from "../src/auth/protectedRoute"
import { AuthProvider } from "../src/auth/AuthProvider";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/projects"
            element={<Project />}
            // element={
            //   <ProtectedRoute>
            //     <Project />
            //   </ProtectedRoute>
            // }
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetails />}
            // element={
            //   <ProtectedRoute>
            //     <ProjectDetails />
            //   </ProtectedRoute>
            // }
          />          
          <Route
            path="/match"
            element={<Match />}
            // element={
            //   <ProtectedRoute>
            //     <Match />
            //   </ProtectedRoute>
            // }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/arena"
            element={<Arena />}
            // element={
            //   <ProtectedRoute>
            //     <Arena />
            //   </ProtectedRoute>
            // }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;