import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Project from "./components/Project"
import Match from "./components/Match"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Contact from "./components/Contact"
import Signup from "./components/Signup"
import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/match" element={<Match />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App