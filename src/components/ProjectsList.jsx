import React, { useState, useEffect } from "react";
import {
  FiGitBranch,
  FiPlus,
  FiSearch,
  FiX,
  FiUsers,
  FiStar,
  FiEye,
  FiCalendar,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { projectAPI } from '../services/api';

const ProjectsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    skills: '',
    status: 'Open',
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data?.projects || response.projects || []); 
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Categories for filtering
  const categories = [
    "All",
    "Web Development",
    "Mobile",
    "AI/ML",
    "DevOps",
    "Blockchain",
    "Data Science",
    "IoT",
    "Game Development",
  ];

  // Filter projects based on search and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills?.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast.error('Please fill in all required fields', { position: 'top-center' });
      return;
    }

    try {
      const projectData = {
        ...newProject,
        domain: newProject.category,
        skills: newProject.skills.split(',').map(s => s.trim()).filter(s => s),
      };

      await projectAPI.create(projectData);
      
      toast.success('Project created successfully!', { position: 'top-center' });
      setShowAddModal(false);
      setNewProject({ title: '', description: '', category: 'Web Development', skills: '', status: 'Open' });
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    }
  };

  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recruiting': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      case 'Active': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      
      <div style={containerStyle}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FiGitBranch style={{ width: 24, height: 24, color: 'white' }} />
              </div>
              <div>
                <h1 className="gradient-text" style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700 }}>
                  Explore Projects
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: 14 }}>
                  {filteredProjects.length} projects available
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', padding: '12px 20px', fontSize: 14 }}
            >
              <FiPlus style={{ width: 18, height: 18 }} />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Search */}
            <div className="input-with-icon" style={{ width: '100%' }}>
              <FiSearch className="input-icon" style={{ width: 18, height: 18 }} />
              <input
                type="text"
                placeholder="Search projects, skills, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Categories */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: selectedCategory === cat ? 'white' : '#a1a1aa',
                    background: selectedCategory === cat ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.03)',
                    border: selectedCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 50,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 20,
        }}>
          {loading ? (
            <div style={{ colSpan: 'full', textAlign: 'center', padding: 40, width: '100%', gridColumn: '1 / -1' }}>
              <div className="typing-indicator" style={{ display: 'inline-flex' }}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p style={{ color: '#a1a1aa', marginTop: 16 }}>Loading projects...</p>
            </div>
          ) : filteredProjects.map((project) => {
            const statusStyle = getStatusColor(project.status);
            return (
              <div key={project.id} className="glass-card hover-lift" style={{ padding: 24 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{
                        padding: '4px 10px',
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: 50,
                        fontSize: 11,
                        fontWeight: 500,
                      }}>
                        {project.status}
                      </span>
                      <span style={{ color: '#71717a', fontSize: 12 }}>
                        <FiTag style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />
                        {project.category}
                      </span>
                    </div>
                    <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>{project.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                  {project.description}
                </p>

                {/* Skills */}
                <div style={{ marginBottom: 16 }}>
                  {project.skills.map((skill, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      margin: '0 6px 6px 0',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: 50,
                      fontSize: 12,
                      color: '#818cf8',
                    }}>{skill}</span>
                  ))}
                </div>

                {/* Meta Info */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: 16,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#71717a' }}>
                      <FiUsers style={{ width: 14, height: 14 }} />
                      {project.teamSize} members
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#71717a' }}>
                      <FiStar style={{ width: 14, height: 14 }} />
                      {project.stars}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#71717a' }}>
                      <FiEye style={{ width: 14, height: 14 }} />
                      {project.views}
                    </span>
                  </div>
                </div>

                {/* Open Roles Badge */}
                {project.openRoles > 0 && (
                  <div style={{
                    padding: '10px 14px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 10,
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{ color: '#10b981', fontSize: 13, fontWeight: 500 }}>
                      {project.openRoles} open position{project.openRoles > 1 ? 's' : ''}
                    </span>
                    <FiArrowRight style={{ width: 16, height: 16, color: '#10b981' }} />
                  </div>
                )}

                {/* Actions */}
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}
                >
                  <span>View Project</span>
                  <FiArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <FiGitBranch style={{ width: 48, height: 48, color: '#71717a', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>No projects found</h3>
            <p style={{ color: '#a1a1aa', fontSize: 14 }}>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          zIndex: 100,
        }} onClick={() => setShowAddModal(false)}>
          <div 
            className="glass-card fade-in-up"
            style={{ 
              width: '100%', 
              maxWidth: 500, 
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 22, fontWeight: 600 }}>Create New Project</h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              >
                <FiX style={{ width: 20, height: 20, color: '#a1a1aa' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  placeholder="My Awesome Project"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  placeholder="Describe your project..."
                  rows="4"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="input-field"
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  {categories.filter(c => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python..."
                  value={newProject.skills}
                  onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px 20px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="btn-primary"
                  style={{ flex: 1, padding: '14px 20px' }}
                >
                  <FiPlus style={{ width: 18, height: 18 }} />
                  <span>Create Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProjectsList;
