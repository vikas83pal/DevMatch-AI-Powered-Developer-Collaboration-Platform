import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiCode, 
  FiUsers, 
  FiMessageSquare, 
  FiGitBranch, 
  FiAward, 
  FiLogIn, 
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiGrid,
  FiBarChart2,
  FiChevronDown,
  FiArrowRight,
} from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClose = (e) => {
      if (isProfileOpen && !e.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    setIsProfileOpen(false);
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiCode },
    { path: '/projects', label: 'Projects', icon: FiGitBranch },
    { path: '/match', label: 'Match', icon: FiUsers },
    { path: '/arena', label: 'RoadMap', icon: FiAward },
    { path: '/contact', label: 'Contact', icon: FiMessageSquare },
  ];

  const protectedLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  ];

  const isActive = (path) => location.pathname === path;
  const userInitials = userData?.name?.slice(0, 2).toUpperCase() || userData?.avatar || 'U';

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.3s ease',
    background: isScrolled ? 'rgba(15, 15, 23, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FiCode style={{ width: 20, height: 20, color: 'white' }} />
          </div>
          <span className="gradient-text" style={{ fontSize: 20, fontWeight: 700, display: 'none' }} className="hidden sm:block">
            DevMatch
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'none', alignItems: 'center', gap: 4 }} className="hidden lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                fontSize: 14,
                fontWeight: 500,
                color: isActive(link.path) ? '#818cf8' : '#a1a1aa',
                background: isActive(link.path) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: isActive(link.path) ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <link.icon style={{ width: 16, height: 16 }} />
              <span>{link.label}</span>
            </Link>
          ))}
          
          {isLoggedIn && protectedLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                fontSize: 14,
                fontWeight: 500,
                color: isActive(link.path) ? '#818cf8' : '#a1a1aa',
                background: isActive(link.path) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: isActive(link.path) ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <link.icon style={{ width: 16, height: 16 }} />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              <button style={{
                position: 'relative',
                padding: 8,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
              }} className="hidden sm:block">
                <FiBell style={{ width: 20, height: 20, color: '#a1a1aa' }} />
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  background: '#ef4444',
                  borderRadius: '50%',
                }}></span>
              </button>

              {/* Profile Menu */}
              <div className="profile-menu" style={{ position: 'relative' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 12px 6px 6px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 10,
                  }}
                >
                  <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
                    {userInitials}
                  </div>
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 500, display: 'none' }} className="hidden md:block">
                    {userData?.name || 'User'}
                  </span>
                  <FiChevronDown style={{ 
                    width: 16, 
                    height: 16, 
                    color: '#a1a1aa',
                    transform: isProfileOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    display: 'none',
                  }} className="hidden md:block" />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="glass-card fade-in" style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: 8,
                    width: 220,
                    padding: 8,
                    zIndex: 100,
                  }}>
                    <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>{userData?.name}</p>
                      <p style={{ color: '#71717a', fontSize: 12, marginTop: 2 }}>{userData?.email}</p>
                    </div>
                    
                    <div style={{ padding: '8px 0' }}>
                      {[
                        { path: '/profile', label: 'My Profile', icon: FiUser },
                        { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
                        { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsProfileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 12px',
                            color: '#a1a1aa',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderRadius: 8,
                            transition: 'background 0.2s',
                          }}
                        >
                          <item.icon style={{ width: 16, height: 16 }} />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 0 0' }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '10px 12px',
                          width: '100%',
                          color: '#ef4444',
                          background: 'transparent',
                          border: 'none',
                          fontSize: 14,
                          cursor: 'pointer',
                          borderRadius: 8,
                          textAlign: 'left',
                        }}
                      >
                        <FiLogOut style={{ width: 16, height: 16 }} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  color: '#a1a1aa',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'none',
                }}
                className="hidden sm:block"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                <span>Get Started</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              padding: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'block',
            }}
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <FiX style={{ width: 24, height: 24, color: 'white' }} />
            ) : (
              <FiMenu style={{ width: 24, height: 24, color: 'white' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="glass fade-in lg:hidden" style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: 16,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: 12,
                  color: isActive(link.path) ? '#818cf8' : '#a1a1aa',
                  background: isActive(link.path) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <link.icon style={{ width: 18, height: 18 }} />
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
                {protectedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: 12,
                      color: isActive(link.path) ? '#818cf8' : '#a1a1aa',
                      background: isActive(link.path) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <link.icon style={{ width: 18, height: 18 }} />
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: 12,
                    color: '#a1a1aa',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  <FiUser style={{ width: 18, height: 18 }} />
                  Profile
                </Link>
              </>
            )}

            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 0' }}></div>

            {isLoggedIn ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                    {userInitials}
                  </div>
                  <div>
                    <p style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>{userData?.name}</p>
                    <p style={{ color: '#71717a', fontSize: 12 }}>{userData?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  style={{
                    padding: 8,
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  <FiLogOut style={{ width: 18, height: 18, color: '#ef4444' }} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', padding: 12 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: 12 }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;