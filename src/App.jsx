import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Project from "./components/Project"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/match" element={<h1>Match Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/contact" element={<h1>Contact Us Page</h1>} />
      </Routes>
    </Router>
  )
}

export default App