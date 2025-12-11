import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = () => {
    toast.info('Connecting to Google...', { position: 'top-center', autoClose: 1000 });
    
    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        name: 'Google User',
        email: 'google@example.com',
        avatar: 'GU',
        provider: 'google'
      };

      localStorage.setItem('token', 'google_' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Successfully logged in! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1000);
  };

  const handleGithubLogin = () => {
    toast.info('Connecting to GitHub...', { position: 'top-center', autoClose: 1000 });
    
    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        name: 'GitHub Developer',
        email: 'github@example.com',
        avatar: 'GD',
        provider: 'github'
      };

      localStorage.setItem('token', 'github_' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Successfully logged in! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate login
    setTimeout(() => {
      localStorage.setItem('token', 'demo_' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        avatar: email.slice(0, 2).toUpperCase(),
      }));

      toast.success('Welcome back! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      
      {/* Particles */}
      <div className="particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Login Card */}
      <div className="auth-card fade-in-up">
        <div className="glass-card card-padding">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <FiZap style={{ width: 28, height: 28, color: 'white' }} />
            </div>
            <h1 className="auth-title gradient-text">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your journey</p>
          </div>

          {/* OAuth Buttons */}
          <div className="oauth-section">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn-oauth btn-oauth-google"
              disabled={isSubmitting}
            >
              <FcGoogle style={{ width: 20, height: 20 }} />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="btn-oauth btn-oauth-github"
              disabled={isSubmitting}
            >
              <FaGithub style={{ width: 20, height: 20 }} />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span>or continue with email</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" style={{ width: 18, height: 18 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <FiLock className="input-icon" style={{ width: 18, height: 18 }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#71717a'
                  }}
                >
                  {showPassword ? (
                    <FiEyeOff style={{ width: 18, height: 18 }} />
                  ) : (
                    <FiEye style={{ width: 18, height: 18 }} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#a1a1aa' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#6366f1' }}
                />
                <span>Remember me</span>
              </label>
              <Link 
                to="/forgot" 
                style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ marginTop: 8, padding: '14px 24px' }}
            >
              {isSubmitting ? (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight style={{ width: 18, height: 18 }} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup">Create one now</Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p style={{ textAlign: 'center', color: '#71717a', fontSize: 12, marginTop: 20 }}>
          By signing in, you agree to our{' '}
          <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>Terms</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>Privacy Policy</a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;