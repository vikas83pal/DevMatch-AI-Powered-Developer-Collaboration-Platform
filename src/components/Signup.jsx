import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiCheck, FiCode } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignup = () => {
    toast.info('Connecting to Google...', { position: 'top-center', autoClose: 1000 });
    
    setTimeout(() => {
      localStorage.setItem('token', 'google_' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: 'Google User',
        email: 'google@example.com',
        avatar: 'GU',
        provider: 'google'
      }));

      toast.success('Account created! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1000);
  };

  const handleGithubSignup = () => {
    toast.info('Connecting to GitHub...', { position: 'top-center', autoClose: 1000 });
    
    setTimeout(() => {
      localStorage.setItem('token', 'github_' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: 'GitHub Developer',
        email: 'github@example.com',
        avatar: 'GD',
        provider: 'github'
      }));

      toast.success('Account created! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1000);
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name', { position: 'top-center' });
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email', { position: 'top-center' });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters', { position: 'top-center' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem('token', 'demo_' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: formData.name.slice(0, 2).toUpperCase(),
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      }));

      toast.success('Account created! 🎉', { position: 'top-center', autoClose: 1500 });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

      setIsSubmitting(false);
    }, 1000);
  };

  // Password strength
  const getStrength = () => {
    const p = formData.password;
    if (!p) return { level: 0, label: '' };
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const classes = ['', 'weak', 'fair', 'good', 'strong', 'excellent'];
    return { level: s, label: labels[s], cls: classes[s] };
  };

  const strength = getStrength();

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

      {/* Signup Card */}
      <div className="auth-card fade-in-up">
        <div className="glass-card card-padding">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <FiCode style={{ width: 28, height: 28, color: 'white' }} />
            </div>
            <h1 className="auth-title gradient-text">Join DevMatch</h1>
            <p className="auth-subtitle">Create your developer account</p>
          </div>

          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <>
              {/* OAuth Buttons */}
              <div className="oauth-section">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="btn-oauth btn-oauth-google"
                  disabled={isSubmitting}
                >
                  <FcGoogle style={{ width: 20, height: 20 }} />
                  <span>Sign up with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGithubSignup}
                  className="btn-oauth btn-oauth-github"
                  disabled={isSubmitting}
                >
                  <FaGithub style={{ width: 20, height: 20 }} />
                  <span>Sign up with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="divider">
                <span>or continue with email</span>
              </div>

              {/* Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <FiUser className="input-icon" style={{ width: 18, height: 18 }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" style={{ width: 18, height: 18 }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Skills (optional)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, Python..."
                    className="input-field"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary"
                  style={{ marginTop: 8, padding: '14px 24px' }}
                >
                  <span>Continue</span>
                  <FiArrowRight style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <FiLock className="input-icon" style={{ width: 18, height: 18 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field"
                    style={{ paddingRight: 44 }}
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
                    {showPassword ? <FiEyeOff style={{ width: 18, height: 18 }} /> : <FiEye style={{ width: 18, height: 18 }} />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {formData.password && (
                  <div style={{ marginTop: 8 }}>
                    <div className="password-strength">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`password-strength-bar ${i <= strength.level ? `active ${strength.cls}` : ''}`} />
                      ))}
                    </div>
                    {strength.label && (
                      <p style={{ fontSize: 12, marginTop: 4, color: '#a1a1aa' }}>{strength.label}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <FiLock className="input-icon" style={{ width: 18, height: 18 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field"
                    style={{ paddingRight: 44 }}
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <FiCheck style={{ 
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 18, 
                      height: 18, 
                      color: '#10b981' 
                    }} />
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px 24px' }}
                >
                  <FiArrowLeft style={{ width: 18, height: 18 }} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ flex: 1, padding: '14px 24px' }}
                >
                  {isSubmitting ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FiArrowRight style={{ width: 18, height: 18 }} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
