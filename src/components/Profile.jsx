import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiCode, 
  FiMapPin, 
  FiGlobe, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter,
  FiEdit3,
  FiSave,
  FiX,
  FiPlus,
  FiAward,
  FiFolder,
  FiUsers,
  FiStar,
  FiCalendar,
} from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [newSkill, setNewSkill] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications.',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'johndoe',
    twitter: 'johndoe',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
    availability: 'Full-time',
    experience: '5 years',
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserData(parsed);
      setProfileData(prev => ({
        ...prev,
        name: parsed.name || prev.name,
        email: parsed.email || prev.email,
        skills: parsed.skills?.length > 0 ? parsed.skills : prev.skills,
      }));
    }
  }, []);

  const [tempData, setTempData] = useState({ ...profileData });

  const stats = [
    { label: 'Projects', value: 12, Icon: FiFolder },
    { label: 'Connections', value: 47, Icon: FiUsers },
    { label: 'Match Score', value: '95%', Icon: FiStar },
    { label: 'Member Since', value: 'Jan 2024', Icon: FiCalendar },
  ];

  const achievements = [
    { title: 'Top Contributor', description: '10+ projects', icon: '🏆', color: '#eab308' },
    { title: 'Quick Responder', description: '<1hr reply time', icon: '⚡', color: '#3b82f6' },
    { title: 'Team Player', description: '20+ collaborations', icon: '🤝', color: '#8b5cf6' },
    { title: 'Code Master', description: '500+ commits', icon: '💻', color: '#10b981' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    toast.success('Profile updated!', { position: 'top-center' });
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill && !tempData.skills.includes(newSkill)) {
      setTempData({ ...tempData, skills: [...tempData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setTempData({ ...tempData, skills: tempData.skills.filter(s => s !== skill) });
  };

  const userInitials = profileData.name.slice(0, 2).toUpperCase();

  const containerStyle = {
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 16px',
  };

  const tabs = ['about', 'skills', 'achievements', 'projects'];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      <div className="particles">
        {[...Array(9)].map((_, i) => <div key={i} className="particle" />)}
      </div>

      <div style={containerStyle}>
        {/* Profile Header */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div className="avatar-ring">
                <div className="avatar" style={{ width: 80, height: 80, fontSize: 28 }}>{userInitials}</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      className="input-field"
                      style={{ fontSize: 20, fontWeight: 700, maxWidth: 250 }}
                    />
                  ) : (
                    <h1 className="gradient-text" style={{ fontSize: 24, fontWeight: 700 }}>{profileData.name}</h1>
                  )}
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: 50,
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}>✓ Available</span>
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={tempData.role}
                    onChange={handleChange}
                    className="input-field"
                    style={{ marginBottom: 12, maxWidth: 250 }}
                  />
                ) : (
                  <p style={{ color: '#818cf8', fontSize: 16, fontWeight: 500, marginBottom: 12 }}>{profileData.role}</p>
                )}
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', color: '#a1a1aa', fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiMapPin style={{ width: 14, height: 14 }} /> {profileData.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiMail style={{ width: 14, height: 14 }} /> {profileData.email}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                {isEditing ? (
                  <>
                    <button onClick={handleCancel} className="btn-secondary" style={{ padding: '10px 16px', fontSize: 13 }}>
                      <FiX style={{ width: 16, height: 16 }} />
                      <span>Cancel</span>
                    </button>
                    <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
                      <FiSave style={{ width: 16, height: 16 }} />
                      <span>Save</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
                    <FiEdit3 style={{ width: 16, height: 16 }} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { Icon: FiGithub, href: `https://github.com/${profileData.github}`, color: 'white' },
                { Icon: FiLinkedin, href: `https://linkedin.com/in/${profileData.linkedin}`, color: '#0077b5' },
                { Icon: FiTwitter, href: `https://twitter.com/${profileData.twitter}`, color: '#1da1f2' },
                { Icon: FiGlobe, href: profileData.website, color: '#10b981' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                }}>
                  <s.Icon style={{ width: 18, height: 18, color: s.color }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: 12,
          marginBottom: 24,
        }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
              <s.Icon style={{ width: 20, height: 20, color: '#6366f1', marginBottom: 8 }} />
              <p style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{s.value}</p>
              <p style={{ color: '#a1a1aa', fontSize: 12 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 500,
                color: activeTab === tab ? 'white' : '#a1a1aa',
                background: activeTab === tab ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.03)',
                border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card" style={{ padding: 24 }}>
          {activeTab === 'about' && (
            <div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiUser style={{ color: '#6366f1' }} /> About Me
              </h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={tempData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                  style={{ resize: 'none' }}
                />
              ) : (
                <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>{profileData.bio}</p>
              )}

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: 20,
                marginTop: 24,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div>
                  <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 4 }}>Availability</p>
                  <p style={{ color: 'white' }}>{profileData.availability}</p>
                </div>
                <div>
                  <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 4 }}>Experience</p>
                  <p style={{ color: 'white' }}>{profileData.experience}</p>
                </div>
                <div>
                  <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 4 }}>Website</p>
                  <a href={profileData.website} style={{ color: '#6366f1' }}>{profileData.website}</a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiCode style={{ color: '#6366f1' }} /> Skills & Technologies
              </h3>
              
              {isEditing && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill..."
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <button onClick={addSkill} className="btn-primary" style={{ padding: '12px 16px' }}>
                    <FiPlus style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(isEditing ? tempData.skills : profileData.skills).map((skill, i) => (
                  <span key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: '#818cf8',
                    borderRadius: 50,
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontSize: 14,
                  }}>
                    {skill}
                    {isEditing && (
                      <button 
                        onClick={() => removeSkill(skill)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#818cf8' }}
                      >
                        <FiX style={{ width: 14, height: 14 }} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiAward style={{ color: '#eab308' }} /> Achievements
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: 12,
              }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{
                    padding: 16,
                    background: `${a.color}10`,
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>{a.icon}</span>
                      <span style={{ color: 'white', fontWeight: 600 }}>{a.title}</span>
                    </div>
                    <p style={{ color: '#a1a1aa', fontSize: 13 }}>{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiFolder style={{ color: '#10b981' }} /> Projects
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: 12,
              }}>
                {[
                  { title: 'AI Chatbot Platform', tech: ['React', 'Node.js'], status: 'Active' },
                  { title: 'E-Commerce Dashboard', tech: ['Next.js', 'MongoDB'], status: 'Completed' },
                  { title: 'DevMatch Platform', tech: ['React', 'Vite'], status: 'Active' },
                  { title: 'Portfolio Builder', tech: ['TypeScript'], status: 'Recruiting' },
                ].map((p, i) => (
                  <div key={i} style={{
                    padding: 16,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ color: 'white', fontWeight: 600 }}>{p.title}</span>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 50,
                        background: p.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : p.status === 'Completed' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                        color: p.status === 'Active' ? '#10b981' : p.status === 'Completed' ? '#3b82f6' : '#8b5cf6',
                      }}>{p.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {p.tech.map((t, j) => (
                        <span key={j} style={{ fontSize: 11, color: '#a1a1aa', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 4 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
