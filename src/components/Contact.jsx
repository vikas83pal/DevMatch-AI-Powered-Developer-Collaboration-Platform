import React, { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiUser, FiMessageSquare, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.', { position: 'top-center' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    { 
      Icon: FiMail, 
      title: 'Email', 
      value: 'vikas83pal@gmail.com', 
      href: 'mailto:vikas83pal@gmail.com',
      color: '#6366f1' 
    },
    { 
      Icon: FiGithub, 
      title: 'GitHub', 
      value: 'github.com/vikas83pal', 
      href: 'https://github.com/vikas83pal',
      color: '#ffffff' 
    },
    { 
      Icon: FiLinkedin, 
      title: 'LinkedIn', 
      value: 'linkedin.com/in/vikas-pal', 
      href: 'https://www.linkedin.com/in/vikas-pal-b91067254/',
      color: '#0077b5' 
    },
  ];

  const containerStyle = {
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 16px',
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      <div className="particles">
        {[...Array(9)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      <div style={containerStyle}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <FiMessageSquare style={{ width: 32, height: 32, color: 'white' }} />
          </div>
          <h1 className="gradient-text" style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, marginBottom: 12 }}>
            Get In Touch
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 32,
        }}>
          {/* Contact Form */}
          <div className="glass-card" style={{ padding: 28 }}>
            <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiSend style={{ color: '#6366f1' }} />
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" style={{ width: 18, height: 18 }} />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
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
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field"
                  style={{ resize: 'none' }}
                  required
                />
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
                    <FiSend style={{ width: 18, height: 18 }} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Info Card */}
            <div className="glass-card" style={{ padding: 28 }}>
              <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
                Contact Information
              </h2>
              <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                Feel free to reach out through any of the following channels. We typically respond within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {contactMethods.map((method, i) => (
                  <a
                    key={i}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: 14,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 12,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      background: `${method.color}15`,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <method.Icon style={{ width: 22, height: 22, color: method.color }} />
                    </div>
                    <div>
                      <p style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>{method.title}</p>
                      <p style={{ color: '#a1a1aa', fontSize: 13 }}>{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <FiMapPin style={{ width: 22, height: 22, color: '#10b981' }} />
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 500 }}>Location</p>
                  <p style={{ color: '#a1a1aa', fontSize: 14 }}>Remote - Worldwide</p>
                </div>
              </div>
              <p style={{ color: '#71717a', fontSize: 13, lineHeight: 1.6 }}>
                DevMatch is a fully remote platform, connecting developers from around the globe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;