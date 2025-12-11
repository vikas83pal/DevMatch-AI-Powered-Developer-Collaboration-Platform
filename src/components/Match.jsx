import React, { useState, useEffect, useRef } from "react";
import { 
  FiUsers, 
  FiFilter, 
  FiSearch, 
  FiX, 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiSend, 
  FiStar, 
  FiMessageCircle, 
  FiCheck, 
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiArrowRight,
} from "react-icons/fi";

// Simulated AI response
const getAIResponse = async (userMessage, dev) => {
  await new Promise((res) => setTimeout(res, 800));
  const msg = userMessage.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) {
    return `Hi! I'm ${dev.name}, a ${dev.role}. How can I help you today?`;
  }
  if (msg.includes("skills")) {
    return `My main skills are: ${dev.skills.join(", ")}.`;
  }
  if (msg.includes("available")) {
    return `I'm currently available for ${dev.availability} work.`;
  }
  return `Thanks for your message! I'm ${dev.name}, a ${dev.role}. Feel free to ask about my experience or skills!`;
};

const Match = () => {
  const [developers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "CSS"],
      availability: "Full-time",
      matchScore: 95,
      bio: "Frontend developer passionate about creating smooth, accessible UIs.",
      experience: "5 years",
      hourlyRate: "$50-60/hr",
      timezone: "EST",
      contacts: { email: "alice@example.com", github: "alice", linkedin: "alice" },
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer",
      skills: ["Node.js", "Python", "MongoDB"],
      availability: "Part-time",
      matchScore: 88,
      bio: "Backend engineer experienced in scalable APIs and databases.",
      experience: "7 years",
      hourlyRate: "$60-75/hr",
      timezone: "PST",
      contacts: { email: "bob@example.com", github: "bobsmith", linkedin: "bobsmith" },
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Full-stack Developer",
      skills: ["React", "Node.js", "GraphQL"],
      availability: "Full-time",
      matchScore: 92,
      bio: "Full-stack developer with expertise in GraphQL and modern stacks.",
      experience: "6 years",
      hourlyRate: "$65-80/hr",
      timezone: "CST",
      contacts: { email: "charlie@example.com", github: "charliebrown", linkedin: "charliebrown" },
    },
    {
      id: 4,
      name: "Diana Prince",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      availability: "Contract",
      matchScore: 89,
      bio: "Creative designer with a knack for user-centered design.",
      experience: "4 years",
      hourlyRate: "$45-55/hr",
      timezone: "GMT",
      contacts: { email: "diana@example.com", github: "diana", linkedin: "diana" },
    },
    {
      id: 5,
      name: "Ethan Hunt",
      role: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "AWS"],
      availability: "Full-time",
      matchScore: 91,
      bio: "DevOps specialist focusing on CI/CD and cloud infrastructure.",
      experience: "8 years",
      hourlyRate: "$70-90/hr",
      timezone: "CET",
      contacts: { email: "ethan@example.com", github: "ethanhunt", linkedin: "ethanhunt" },
    },
    {
      id: 6,
      name: "Fiona Green",
      role: "Data Scientist",
      skills: ["Python", "TensorFlow", "SQL"],
      availability: "Full-time",
      matchScore: 87,
      bio: "Data scientist with ML expertise and analytics background.",
      experience: "5 years",
      hourlyRate: "$65-85/hr",
      timezone: "IST",
      contacts: { email: "fiona@example.com", github: "fiona", linkedin: "fiona" },
    },
  ]);

  const [filters, setFilters] = useState({ role: "", availability: "", skill: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDev, setSelectedDev] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const filteredDevs = developers.filter((dev) => {
    const matchesRole = !filters.role || dev.role.toLowerCase().includes(filters.role.toLowerCase());
    const matchesAvail = !filters.availability || dev.availability === filters.availability;
    const matchesSkill = !filters.skill || dev.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()));
    const matchesSearch = !searchQuery || 
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesAvail && matchesSkill && matchesSearch;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const openChat = (dev) => {
    setSelectedDev(dev);
    setShowChat(true);
    setChatMessages([
      { sender: "system", text: `Connected with ${dev.name}. Start chatting!` },
      { sender: "dev", text: `Hi there! I'm ${dev.name}. How can I help you today?` },
    ]);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedDev) return;
    
    const userMsg = newMessage;
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setNewMessage("");
    setIsTyping(true);
    
    const response = await getAIResponse(userMsg, selectedDev);
    setIsTyping(false);
    setChatMessages((prev) => [...prev, { sender: "dev", text: response }]);
  };

  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      
      <div style={containerStyle}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FiUsers style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700 }}>
                Find Developers
              </h1>
              <p style={{ color: '#a1a1aa', fontSize: 14 }}>
                {filteredDevs.length} developers match your criteria
              </p>
            </div>
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
                placeholder="Search developers, skills, roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filters */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: 12,
            }}>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                <option value="">All Roles</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-stack">Full-stack</option>
                <option value="UI/UX">UI/UX</option>
                <option value="DevOps">DevOps</option>
                <option value="Data">Data Science</option>
              </select>

              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                <option value="">All Availability</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>

              <input
                type="text"
                placeholder="Filter by skill..."
                value={filters.skill}
                onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Developer Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 20,
        }}>
          {filteredDevs.map((dev) => (
            <div key={dev.id} className="glass-card hover-lift" style={{ padding: 24 }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>
                  {dev.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h3 style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>{dev.name}</h3>
                    <button
                      onClick={() => toggleFavorite(dev.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <FiStar style={{ 
                        width: 16, 
                        height: 16, 
                        color: favorites.includes(dev.id) ? '#eab308' : '#71717a',
                        fill: favorites.includes(dev.id) ? '#eab308' : 'none',
                      }} />
                    </button>
                  </div>
                  <p style={{ color: '#818cf8', fontSize: 14 }}>{dev.role}</p>
                </div>
                <div style={{
                  padding: '4px 10px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: 50,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'white',
                }}>
                  {dev.matchScore}%
                </div>
              </div>

              {/* Bio */}
              <p style={{ color: '#a1a1aa', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                {dev.bio}
              </p>

              {/* Skills */}
              <div style={{ marginBottom: 16 }}>
                {dev.skills.map((skill, i) => (
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
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 10,
                marginBottom: 16,
                paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#71717a' }}>
                  <FiClock style={{ width: 14, height: 14 }} />
                  <span>{dev.experience}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#71717a' }}>
                  <FiDollarSign style={{ width: 14, height: 14 }} />
                  <span>{dev.hourlyRate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#71717a' }}>
                  <FiMapPin style={{ width: 14, height: 14 }} />
                  <span>{dev.timezone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: dev.availability === 'Full-time' ? '#10b981' : '#f97316' }}>
                  <FiCheck style={{ width: 14, height: 14 }} />
                  <span>{dev.availability}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => openChat(dev)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px 16px', fontSize: 13 }}
                >
                  <FiMessageCircle style={{ width: 16, height: 16 }} />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setSelectedDev(dev)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px 16px', fontSize: 13 }}
                >
                  <span>View Profile</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDevs.length === 0 && (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <FiUsers style={{ width: 48, height: 48, color: '#71717a', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>No developers found</h3>
            <p style={{ color: '#a1a1aa', fontSize: 14 }}>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {showChat && selectedDev && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: 16,
          zIndex: 100,
        }} onClick={() => setShowChat(false)}>
          <div 
            className="glass-card fade-in-up"
            style={{ 
              width: '100%', 
              maxWidth: 400, 
              height: '70vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div style={{ 
              padding: 16, 
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                  {selectedDev.name.charAt(0)}
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 500 }}>{selectedDev.name}</p>
                  <p style={{ color: '#10b981', fontSize: 12 }}>● Online</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              >
                <FiX style={{ width: 20, height: 20, color: '#a1a1aa' }} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  marginBottom: 12,
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: 12,
                    fontSize: 14,
                    background: msg.sender === 'user' 
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
                      : msg.sender === 'system'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.08)',
                    color: msg.sender === 'system' ? '#a1a1aa' : 'white',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                  }}>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ 
              padding: 16, 
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: 10,
            }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="input-field"
                style={{ flex: 1 }}
              />
              <button onClick={sendMessage} className="btn-primary" style={{ padding: '12px 16px' }}>
                <FiSend style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedDev && !showChat && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          zIndex: 100,
        }} onClick={() => setSelectedDev(null)}>
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
            <button
              onClick={() => setSelectedDev(null)}
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 16,
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: 8 
              }}
            >
              <FiX style={{ width: 20, height: 20, color: '#a1a1aa' }} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div className="avatar" style={{ width: 80, height: 80, fontSize: 28, margin: '0 auto 16px' }}>
                {selectedDev.name.charAt(0)}
              </div>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{selectedDev.name}</h2>
              <p style={{ color: '#818cf8', fontSize: 16 }}>{selectedDev.role}</p>
            </div>

            <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: 24, lineHeight: 1.6 }}>
              {selectedDev.bio}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 12,
              marginBottom: 24,
            }}>
              {[
                { label: 'Experience', value: selectedDev.experience },
                { label: 'Rate', value: selectedDev.hourlyRate },
                { label: 'Timezone', value: selectedDev.timezone },
                { label: 'Availability', value: selectedDev.availability },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: 14,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                  <p style={{ color: '#71717a', fontSize: 12, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: 'white', fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ color: 'white', fontWeight: 500, marginBottom: 12 }}>Skills</p>
              <div>
                {selectedDev.skills.map((skill, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    margin: '0 8px 8px 0',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: 50,
                    fontSize: 13,
                    color: '#818cf8',
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => {
                  setShowChat(true);
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '14px 20px' }}
              >
                <FiMessageCircle style={{ width: 18, height: 18 }} />
                <span>Start Chat</span>
              </button>
              <a
                href={`mailto:${selectedDev.contacts.email}`}
                className="btn-secondary"
                style={{ flex: 1, padding: '14px 20px', justifyContent: 'center' }}
              >
                <FiMail style={{ width: 18, height: 18 }} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Match;
