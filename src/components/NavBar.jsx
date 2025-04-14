import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiUsers, FiMessageSquare, FiLogIn, FiGitBranch } from 'react-icons/fi';

const NavBar = () => {
  // Ensure the navbar is always visible
  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Very high z-index to ensure it's above everything
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  return (
    <nav style={navbarStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with inline styles as fallback */}
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
              color: 'transparent'
            }}
          >
            DevMatch
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition"
                style={{ color: 'white' }} // Inline fallback
              >
                <FiCode className="mr-2" /> Home
              </Link>
              <Link 
                to="/project" 
                className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition"
                style={{ color: 'white' }} // Inline fallback
              >
                <FiGitBranch className="mr-2" /> Projects
              </Link>
              <Link 
                to="/match" 
                className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition"
                style={{ color: 'white' }} // Inline fallback
              >
                <FiUsers className="mr-2" /> Match
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-indigo-300 px-3 py-2 text-sm font-medium flex items-center transition"
                style={{ color: 'white' }} // Inline fallback
              >
                <FiMessageSquare className="mr-2" /> Contact
              </Link>
              <Link 
                to="/login" 
                className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition flex items-center"
                style={{ 
                  backgroundColor: '#4f46e5',
                  color: 'white'
                }} // Inline fallback
              >
                <FiLogIn className="mr-2" /> Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button - visible only on small screens */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-white hover:text-white focus:outline-none"
              style={{ color: 'white' }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;