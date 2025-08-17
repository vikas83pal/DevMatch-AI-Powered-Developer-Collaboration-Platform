import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiUsers, FiMessageSquare, FiGitBranch, FiAward, FiLogIn } from 'react-icons/fi';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  return (
    <nav style={navbarStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            DevMatch
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition">
                <FiCode className="mr-2" /> Home
              </Link>
              <Link to="/projects" className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition">
                <FiGitBranch className="mr-2" /> Projects
              </Link>
              <Link to="/match" className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition">
                <FiUsers className="mr-2" /> Match
              </Link>
              <Link to="/arena" className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition">
                <FiAward className="mr-2" /> RoadMap
              </Link>
              <Link to="/contact" className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition">
                <FiMessageSquare className="mr-2" /> Contact
              </Link>
              <Link to="/login" className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition flex items-center">
                <FiLogIn className="mr-2" /> Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-white focus:outline-none">
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white px-4 py-6 space-y-4">
          <Link to="/" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Projects</Link>
          <Link to="/match" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Match</Link>
          <Link to="/arena" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Arena</Link>
          <Link to="/contact" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Contact</Link>
          <Link to="/login" className="block text-white hover:text-indigo-300 text-sm font-medium" onClick={toggleMenu}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
