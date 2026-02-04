import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiGitBranch,
  FiStar,
  FiCheck,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { projectAPI } from '../services/api';
import { useAuth } from '../auth/AuthProvider';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingRole, setApplyingRole] = useState(null);

  // Fetch project data from API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectAPI.getById(projectId);
        setProject(response.project);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError(err.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const handleApply = async (role) => {
    if (!isAuthenticated) {
      toast.info('Please login to apply for this role', { position: 'top-center' });
      navigate('/login');
      return;
    }

    setApplyingRole(role);
    try {
      await fetch(`http://localhost:5000/api/projects/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ role }),
      });
      toast.success(`Applied for ${role} position!`, { position: 'top-center' });
    } catch (err) {
      toast.error(err.message || 'Failed to apply', { position: 'top-center' });
    } finally {
      setApplyingRole(null);
    }
  };

  const containerStyle = {
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 16px',
  };

  const getStatusStyle = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower.includes('recruit')) return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', text: 'Recruiting' };
    if (statusLower.includes('active')) return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Active' };
    return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', text: status || 'Unknown' };
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="animated-bg"></div>
        <div style={containerStyle}>
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <FiLoader style={{ width: 48, height: 48, color: '#6366f1', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <h2 style={{ color: 'white', fontSize: 24, marginBottom: 8 }}>Loading Project...</h2>
            <p style={{ color: '#a1a1aa' }}>Please wait while we fetch the project details.</p>
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60 }}>
        <div className="animated-bg"></div>
        <div style={containerStyle}>
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <FiAlertCircle style={{ width: 48, height: 48, color: '#ef4444', margin: '0 auto 16px' }} />
            <h2 style={{ color: 'white', fontSize: 24, marginBottom: 8 }}>Error Loading Project</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 24 }}>{error}</p>
            <button onClick={() => navigate('/projects')} className="btn-primary" style={{ padding: '12px 24px' }}>
              <FiArrowLeft style={{ width: 18, height: 18 }} />
              <span>Back to Projects</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
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
  const skills = Array.isArray(project.skills) ? project.skills : [];
  const members = Array.isArray(project.members) ? project.members : [];
  const openRoles = Array.isArray(project.openRoles) ? project.openRoles : [];

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
                  {project.createdAt && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#71717a', fontSize: 13 }}>
                      <FiCalendar style={{ width: 14, height: 14 }} />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#eab308', fontSize: 13 }}>
                    <FiStar style={{ width: 14, height: 14 }} />
                    {project.stars || 0}
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
            {skills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map((skill, i) => (
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
            )}
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
              {project.fullDescription || project.details || project.description}
            </div>
          </div>

          {/* Team */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiUsers style={{ color: '#10b981' }} />
              Team Members ({members.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {members.length > 0 ? members.map((member, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 10,
                }}>
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                    {typeof member === 'object' ? (member.avatar || member.name?.slice(0, 2).toUpperCase()) : 'U'}
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: 500 }}>
                      {typeof member === 'object' ? member.name : `Member ${member}`}
                    </p>
                    <p style={{ color: '#818cf8', fontSize: 13 }}>
                      {typeof member === 'object' ? (member.role || 'Developer') : 'Developer'}
                    </p>
                  </div>
                </div>
              )) : (
                <p style={{ color: '#71717a', fontSize: 14 }}>No team members yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        {openRoles.length > 0 && (
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCheck style={{ color: '#f97316' }} />
              Open Positions ({openRoles.length})
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 16,
            }}>
              {openRoles.map((role, i) => (
                <div key={i} style={{
                  padding: 20,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12,
                }}>
                  <h3 style={{ color: 'white', fontWeight: 500, marginBottom: 12 }}>{role}</h3>
                  <button
                    onClick={() => handleApply(role)}
                    disabled={applyingRole === role}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}
                  >
                    {applyingRole === role ? (
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
