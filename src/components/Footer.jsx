import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCode,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiHeart,
  FiArrowUp,
  FiSend,
  FiCheck,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email', { position: 'top-center' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email', { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/newsletter/subscribe`, { email });
      
      toast.success(response.data.message || 'Successfully subscribed! 🎉', { 
        position: 'top-center',
        autoClose: 3000,
      });
      setIsSubscribed(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      toast.error(errorMessage, { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Match', path: '/match' },
      { name: 'Projects', path: '/projects' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' },
    ],
    resources: [
      { name: 'Docs', path: '/docs' },
      { name: 'API', path: '/api' },
      { name: 'Help', path: '/help' },
      { name: 'Community', path: '/community' },
    ],
    legal: [
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
      { name: 'Cookies', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { Icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { Icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: FiMail, href: 'mailto:hello@devmatch.io', label: 'Email' },
  ];

  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  return (
    <footer style={{ 
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(180deg, transparent, rgba(15, 15, 23, 0.8))',
    }}>
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 40,
          background: 'rgba(22, 22, 34, 0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FiArrowUp style={{ width: 18, height: 18, color: '#a1a1aa' }} />
      </button>

      <div style={{ ...containerStyle, paddingTop: 60, paddingBottom: 32 }}>
        {/* Main Footer Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: 32,
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
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
              <span className="gradient-text" style={{ fontSize: 20, fontWeight: 700 }}>DevMatch</span>
            </Link>
            <p style={{ color: '#71717a', fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              AI-powered developer matchmaking. Find your perfect team and build amazing projects together.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                  }}
                  aria-label={s.label}
                >
                  <s.Icon style={{ width: 16, height: 16, color: '#a1a1aa' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.product.map((link, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  <Link to={link.path} style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  <Link to={link.path} style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.resources.map((link, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  <Link to={link.path} style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.legal.map((link, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  <Link to={link.path} style={{ color: '#71717a', fontSize: 13, textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 16,
          }}>
            <div>
              <h4 style={{ color: 'white', fontSize: 16, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiMail style={{ color: '#6366f1' }} />
                Subscribe to our newsletter
              </h4>
              <p style={{ color: '#71717a', fontSize: 13 }}>
                Get the latest updates, developer resources, and project opportunities.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                disabled={isSubmitting || isSubscribed}
                style={{ flex: 1, minWidth: 200 }}
              />
              <button 
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="btn-primary" 
                style={{ 
                  padding: '12px 24px', 
                  whiteSpace: 'nowrap',
                  opacity: isSubmitting || isSubscribed ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : isSubscribed ? (
                  <>
                    <FiCheck style={{ width: 18, height: 18 }} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <FiSend style={{ width: 18, height: 18 }} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>

            {isSubscribed && (
              <p style={{ color: '#10b981', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCheck style={{ width: 14, height: 14 }} />
                Check your inbox for a confirmation email!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#71717a', fontSize: 13 }}>
            © {new Date().getFullYear()} DevMatch. All rights reserved.
          </p>
          <p style={{ color: '#71717a', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <FiHeart style={{ width: 14, height: 14, color: '#ef4444' }} /> by developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;