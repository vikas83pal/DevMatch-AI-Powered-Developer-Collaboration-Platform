import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCode,
  FiUsers,
  FiMessageSquare,
  FiCpu,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiShield,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiPlay,
  FiGitBranch,
} from "react-icons/fi";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah Chen", role: "Senior Developer @ Meta", content: "DevMatch helped me find the perfect team for my open source project. The AI matching is incredibly accurate!", avatar: "SC" },
    { name: "Marcus Johnson", role: "Startup Founder", content: "Found 3 talented co-founders through DevMatch. Our MVP was built in just 2 months!", avatar: "MJ" },
    { name: "Emily Rodriguez", role: "Full Stack Engineer", content: "The collaboration tools are top-notch. Real-time coding and messaging made remote work seamless.", avatar: "ER" },
  ];

  const features = [
    { title: "AI Matchmaking", description: "Advanced algorithms analyze skills and preferences to find your perfect teammates with 95% accuracy.", icon: FiCpu, color: "#6366f1" },
    { title: "Real-Time Collaboration", description: "Stay connected with integrated messaging, video calls, and code sharing.", icon: FiMessageSquare, color: "#06b6d4" },
    { title: "Project Management", description: "Manage projects with Git integration, task tracking, and sprint planning.", icon: FiGitBranch, color: "#10b981" },
  ];

  const developers = [
    { name: "Alex", role: "React Specialist", skills: ["TypeScript", "Next.js", "UI/UX"], match: "92%" },
    { name: "Sarah", role: "Backend Engineer", skills: ["Node.js", "Python", "AWS"], match: "89%" },
    { name: "Jordan", role: "Full Stack Dev", skills: ["React", "GraphQL", "Docker"], match: "95%" },
    { name: "Taylor", role: "DevOps Engineer", skills: ["Kubernetes", "CI/CD", "Terraform"], match: "87%" },
  ];

  const benefits = [
    { icon: FiAward, title: "Verified Profiles", description: "All developers are verified for skills.", color: "#eab308" },
    { icon: FiShield, title: "Secure Collaboration", description: "End-to-end encrypted messaging.", color: "#10b981" },
    { icon: FiTrendingUp, title: "Success Stories", description: "Thousands of successful projects.", color: "#3b82f6" },
    { icon: FiZap, title: "Quick Onboarding", description: "Start collaborating in minutes.", color: "#f97316" },
  ];

  // Responsive container style
  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      <div className="animated-bg"></div>
      <div className="particles">
        {[...Array(9)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              marginBottom: 24,
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 50,
              color: '#818cf8',
              fontSize: 14,
              fontWeight: 500,
            }}>
              <FiZap style={{ width: 16, height: 16 }} />
              <span>Now with AI-Powered Matching</span>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: 'clamp(32px, 8vw, 64px)', 
              fontWeight: 700, 
              color: 'white', 
              lineHeight: 1.1,
              marginBottom: 20 
            }}>
              Find Your Perfect
              <br />
              <span className="gradient-text">Development Team</span>
            </h1>

            {/* Subtitle */}
            <p style={{ 
              fontSize: 'clamp(16px, 3vw, 20px)', 
              color: '#a1a1aa', 
              marginBottom: 32,
              maxWidth: 600,
              margin: '0 auto 32px',
            }}>
              AI-powered matchmaking connects you with ideal teammates. Collaborate in real-time and build amazing projects.
            </p>

            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              marginBottom: 60,
            }}>
              <Link 
                to={isLoggedIn ? "/dashboard" : "/signup"} 
                className="btn-primary"
                style={{ padding: '16px 32px', fontSize: 16, width: '100%', maxWidth: 280, justifyContent: 'center' }}
              >
                <FiCode style={{ width: 20, height: 20 }} />
                <span>{isLoggedIn ? "Go to Dashboard" : "Start Matching Free"}</span>
              </Link>
              <a 
                href="#features" 
                className="btn-secondary"
                style={{ padding: '16px 32px', fontSize: 16, width: '100%', maxWidth: 280, justifyContent: 'center' }}
              >
                <FiPlay style={{ width: 20, height: 20 }} />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: 16,
              maxWidth: 600,
              margin: '0 auto',
            }}>
              {[
                { value: "10K+", label: "Developers" },
                { value: "95%", label: "Match Rate" },
                { value: "5K+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i} className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
                  <div className="gradient-text" style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#a1a1aa', fontSize: 14 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={containerStyle}>
          <p style={{ textAlign: 'center', color: '#71717a', fontSize: 12, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
            Trusted by developers from
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 40px', opacity: 0.5 }}>
            {["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Spotify"].map((company, i) => (
              <span key={i} style={{ color: '#a1a1aa', fontSize: 16, fontWeight: 500 }}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="glass" style={{ padding: '80px 0' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              How <span className="gradient-text">DevMatch</span> Works
            </h2>
            <p style={{ color: '#a1a1aa', maxWidth: 500, margin: '0 auto' }}>
              Our intelligent platform uses advanced algorithms to match developers.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 24,
          }}>
            {features.map((feat, i) => (
              <div key={i} className="glass-card hover-lift" style={{ padding: 28 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  background: `linear-gradient(135deg, ${feat.color}, ${feat.color}99)`,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <feat.icon style={{ width: 28, height: 28, color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 10 }}>{feat.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section style={{ padding: '80px 0' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Meet Your Next <span className="gradient-text">Teammates</span>
            </h2>
            <p style={{ color: '#a1a1aa', maxWidth: 500, margin: '0 auto' }}>
              Discover talented developers ready to build amazing projects.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: 20,
          }}>
            {developers.map((dev, i) => (
              <div key={i} className="glass-card hover-lift" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div className="avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{dev.name[0]}</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600 }}>{dev.name}</div>
                    <div style={{ color: '#818cf8', fontSize: 13 }}>{dev.role}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  {dev.skills.map((skill, j) => (
                    <span key={j} style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      margin: '0 6px 6px 0',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 50,
                      fontSize: 12,
                      color: '#a1a1aa',
                    }}>{skill}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#71717a', fontSize: 13 }}>Match score</span>
                  <span style={{ color: '#818cf8', fontSize: 18, fontWeight: 700 }}>{dev.match}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/match" className="btn-secondary" style={{ padding: '14px 28px' }}>
              <span>View All Developers</span>
              <FiArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="glass" style={{ padding: '80px 0' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              What Developers <span className="gradient-text">Say</span>
            </h2>
          </div>

          <div className="glass-card" style={{ maxWidth: 700, margin: '0 auto', padding: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: activeTestimonial === i ? 24 : 8,
                    height: 8,
                    background: activeTestimonial === i ? '#6366f1' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <div>
                <div style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ color: '#818cf8', fontSize: 14 }}>{testimonials[activeTestimonial].role}</div>
              </div>
            </div>

            <p style={{ color: '#d1d5db', fontSize: 18, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 20 }}>
              "{testimonials[activeTestimonial].content}"
            </p>

            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar key={i} style={{ width: 18, height: 18, color: '#eab308', fill: '#eab308' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 0' }}>
        <div style={containerStyle}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: 'white', marginBottom: 48 }}>
            Why Choose DevMatch?
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 20,
          }}>
            {benefits.map((b, i) => (
              <div key={i} className="glass-card hover-lift" style={{ padding: 24, display: 'flex', gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <b.icon style={{ width: 24, height: 24, color: b.color }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{b.title}</h3>
                  <p style={{ color: '#a1a1aa', fontSize: 14 }}>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0' }}>
        <div style={containerStyle}>
          <div className="glass-card" style={{ 
            maxWidth: 800, 
            margin: '0 auto', 
            padding: 48, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            borderColor: 'rgba(99, 102, 241, 0.2)',
          }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Ready to Find Your Team?
            </h2>
            <p style={{ color: '#a1a1aa', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Join thousands of developers building innovative projects together.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Link to="/signup" className="btn-primary" style={{ padding: '16px 32px', fontSize: 16, width: '100%', maxWidth: 260, justifyContent: 'center' }}>
                <FiUsers style={{ width: 20, height: 20 }} />
                <span>Get Started Free</span>
              </Link>
              <Link to="/match" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, width: '100%', maxWidth: 260, justifyContent: 'center' }}>
                <FiCode style={{ width: 20, height: 20 }} />
                <span>Explore Developers</span>
              </Link>
            </div>

            <p style={{ color: '#71717a', fontSize: 13, marginTop: 32 }}>
              No credit card required • Free forever plan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
