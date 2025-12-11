import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight, FiArrowLeft, FiKey } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Password reset link sent!', { position: 'top-center' });
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="animated-bg"></div>
      <div className="particles">
        {[...Array(9)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      <div className="auth-card fade-in-up">
        <div className="glass-card card-padding">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <FiKey style={{ width: 28, height: 28, color: 'white' }} />
            </div>
            <h1 className="auth-title gradient-text">Reset Password</h1>
            <p className="auth-subtitle">
              {submitted 
                ? 'Check your email for the reset link' 
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                    <span>Send Reset Link</span>
                    <FiArrowRight style={{ width: 18, height: 18 }} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80,
                height: 80,
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <FiMail style={{ width: 40, height: 40, color: '#10b981' }} />
              </div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                Email Sent!
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 24 }}>
                We've sent a password reset link to <strong style={{ color: 'white' }}>{email}</strong>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
                style={{ padding: '12px 20px' }}
              >
                <FiArrowLeft style={{ width: 16, height: 16 }} />
                <span>Try another email</span>
              </button>
            </div>
          )}

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;