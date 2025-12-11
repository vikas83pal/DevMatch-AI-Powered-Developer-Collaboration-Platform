import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiGitBranch,
  FiStar,
  FiMessageCircle,
  FiExternalLink,
  FiCheck,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const projectData = {
  1: {
    title: "AI Chatbot Platform",
    description: "Building an AI-powered chatbot for customer service with natural language processing.",
    fullDescription: `This project aims to create a comprehensive AI-powered chatbot platform that can handle customer service inquiries across multiple channels. The system uses advanced NLP techniques and machine learning to understand and respond to user queries in a natural, conversational manner.

Key features include:
- Multi-language support
- Context-aware conversations
- Integration with popular messaging platforms
- Analytics dashboard for conversation insights
- Custom training capabilities`,
    skills: ["Python", "TensorFlow", "NLP", "React", "Node.js"],
    members: [
      { name: "Alice Johnson", role: "Project Lead", avatar: "AJ" },
      { name: "Bob Smith", role: "ML Engineer", avatar: "BS" },
      { name: "Carol Davis", role: "Frontend Dev", avatar: "CD" },
    ],
    openRoles: ["Backend Developer", "DevOps Engineer"],
    status: "recruiting",
    createdAt: "2024-01-10",
    stars: 156,
  },
  2: {
    title: "E-Commerce Dashboard",
    description: "Full-stack e-commerce platform with real-time analytics and inventory management.",
    fullDescription: `A modern e-commerce dashboard that provides merchants with powerful tools to manage their online stores. Built with React and Node.js, featuring real-time updates and comprehensive analytics.

Key features include:
- Real-time sales analytics
- Inventory management system
- Order tracking and fulfillment
- Customer relationship management
- Multi-vendor support`,
    skills: ["React", "Node.js", "MongoDB", "Redis", "GraphQL"],
    members: [
      { name: "David Lee", role: "Full Stack Dev", avatar: "DL" },
      { name: "Emma Wilson", role: "UI/UX Designer", avatar: "EW" },
    ],
    openRoles: ["Frontend Developer"],
    status: "active",
    createdAt: "2024-01-15",
    stars: 89,
  },
  3: {
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans and social features.",
    fullDescription: `A comprehensive mobile fitness application that helps users track their workouts, set goals, and connect with other fitness enthusiasts.

Key features include:
- Personalized workout plans
- Progress tracking with charts
- Social feed and challenges
- Integration with wearables
- Nutrition tracking`,
    skills: ["React Native", "Firebase", "TypeScript"],
    members: [
      { name: "Frank Garcia", role: "Mobile Developer", avatar: "FG" },
    ],
    openRoles: ["Backend Developer", "UI Designer"],
    status: "recruiting",
    createdAt: "2024-02-01",
    stars: 234,
  },
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);

  const project = projectData[projectId];

  const handleApply = (role) => {
    setIsApplying(true);
    setTimeout(() => {
      toast.success(`Applied for ${role} position!`, { position: 'top-center' });
      setIsApplying(false);
    }, 1000);
  };

  const containerStyle = {
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 16px',
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'recruiting': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', text: 'Recruiting' };
      case 'active': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Active' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', text: 'Closed' };
    }
  };

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="animated-bg"></div>
        <div style={containerStyle}>
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <FiGitBranch style={{ width: 48, height: 48, color: '#71717a', margin: '0 auto 16px' }} />
            <h2 style={{ color: 'white', fontSize: 24, marginBottom: 8 }}>Project Not Found</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 24 }}>The project you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/projects')} className="btn-primary" style={{ padding: '12px 24px' }}>
              <FiArrowLeft style={{ width: 18, height: 18 }} />
              <span>Back to Projects</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusStyle(project.status);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      <div className="particles">
        {[...Array(9)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      <div style={containerStyle}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#a1a1aa',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            marginBottom: 24,
            padding: 0,
          }}
        >
          <FiArrowLeft style={{ width: 18, height: 18 }} />
          Back to Projects
        </button>

        {/* Header */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: statusStyle.bg,
                    color: statusStyle.color,
                    borderRadius: 50,
                    fontSize: 12,
                    fontWeight: 500,
                  }}>
                    {statusStyle.text}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#71717a', fontSize: 13 }}>
                    <FiCalendar style={{ width: 14, height: 14 }} />
                    {project.createdAt}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#eab308', fontSize: 13 }}>
                    <FiStar style={{ width: 14, height: 14 }} />
                    {project.stars}
                  </span>
                </div>
                <h1 className="gradient-text" style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, marginBottom: 8 }}>
                  {project.title}
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: 16, lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.skills.map((skill, i) => (
                <span key={i} style={{
                  padding: '6px 14px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 50,
                  fontSize: 13,
                  color: '#818cf8',
                }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
          marginBottom: 24,
        }}>
          {/* About */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiGitBranch style={{ color: '#6366f1' }} />
              About This Project
            </h2>
            <div style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {project.fullDescription}
            </div>
          </div>

          {/* Team */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiUsers style={{ color: '#10b981' }} />
              Team Members ({project.members.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {project.members.map((member, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 10,
                }}>
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: 500 }}>{member.name}</p>
                    <p style={{ color: '#818cf8', fontSize: 13 }}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        {project.openRoles.length > 0 && (
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCheck style={{ color: '#f97316' }} />
              Open Positions ({project.openRoles.length})
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: 16,
            }}>
              {project.openRoles.map((role, i) => (
                <div key={i} style={{
                  padding: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12,
                }}>
                  <h3 style={{ color: 'white', fontWeight: 500, marginBottom: 12 }}>{role}</h3>
                  <button
                    onClick={() => handleApply(role)}
                    disabled={isApplying}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}
                  >
                    {isApplying ? (
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <>
                        <FiCheck style={{ width: 16, height: 16 }} />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProjectDetails;
