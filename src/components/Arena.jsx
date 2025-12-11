import React, { useState, useEffect } from "react";
import {
  FiCode,
  FiCheck,
  FiPlus,
  FiSearch,
  FiAward,
  FiTrendingUp,
  FiCalendar,
  FiThumbsUp,
  FiTrash2,
  FiX,
  FiChevronRight,
  FiBookOpen,
} from "react-icons/fi";

// Roadmap data
const roadmaps = {
  JavaScript: [
    { title: "Variables & Data Types", description: "Learn let, const, var and primitive types" },
    { title: "Control Structures", description: "If/else, loops, and switch statements" },
    { title: "Functions", description: "Function declarations, expressions, and arrow functions" },
    { title: "Objects & Arrays", description: "Working with complex data structures" },
    { title: "ES6+ Features", description: "Destructuring, spread operator, template literals" },
    { title: "DOM Manipulation", description: "Interacting with HTML elements" },
    { title: "Async JavaScript", description: "Promises, async/await, and fetch API" },
  ],
  Python: [
    { title: "Syntax & Variables", description: "Python basics and data types" },
    { title: "Data Structures", description: "Lists, tuples, sets, and dictionaries" },
    { title: "Control Flow", description: "Conditionals and loops" },
    { title: "Functions & Modules", description: "Creating reusable code" },
    { title: "OOP Concepts", description: "Classes, inheritance, polymorphism" },
    { title: "Popular Libraries", description: "NumPy, Pandas, Matplotlib" },
    { title: "Web Frameworks", description: "Flask and Django basics" },
  ],
  React: [
    { title: "JSX Basics", description: "Writing JSX syntax" },
    { title: "Components", description: "Functional and class components" },
    { title: "Props", description: "Passing data between components" },
    { title: "State Management", description: "useState and component state" },
    { title: "Hooks", description: "useEffect, useContext, useReducer" },
    { title: "Context API", description: "Global state management" },
    { title: "Performance", description: "Optimization techniques" },
  ],
  "Node.js": [
    { title: "Runtime Basics", description: "Understanding Node.js runtime" },
    { title: "Modules", description: "CommonJS and ES modules" },
    { title: "File System", description: "Reading and writing files" },
    { title: "Express.js", description: "Building REST APIs" },
    { title: "Databases", description: "MongoDB and SQL integration" },
    { title: "Authentication", description: "JWT and session management" },
    { title: "Deployment", description: "Docker and cloud hosting" },
  ],
};

const Arena = () => {
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);
  
  // Progress tracking
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem("arena_progress");
    return saved ? JSON.parse(saved) : {};
  });

  // Ideas
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem("arena_ideas");
    return saved ? JSON.parse(saved) : [
      { text: "AI-powered code review tool", votes: 12, author: "Sarah K." },
      { text: "Real-time collaborative whiteboard", votes: 8, author: "Mike R." },
    ];
  });
  const [newIdea, setNewIdea] = useState("");

  useEffect(() => {
    localStorage.setItem("arena_progress", JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem("arena_ideas", JSON.stringify(ideas));
  }, [ideas]);

  const filteredLangs = Object.keys(roadmaps).filter(
    (lang) => lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const steps = roadmaps[selectedLang] || [];
  const completedCount = steps.filter((_, i) => completedSteps[`${selectedLang}_${i}`]).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const toggleStep = (index) => {
    const key = `${selectedLang}_${index}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submitIdea = (e) => {
    e.preventDefault();
    if (!newIdea.trim()) return;
    setIdeas([{ text: newIdea, votes: 0, author: "You" }, ...ideas]);
    setNewIdea("");
  };

  const voteIdea = (index) => {
    setIdeas(ideas.map((idea, i) => 
      i === index ? { ...idea, votes: idea.votes + 1 } : idea
    ));
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
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            borderRadius: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <FiBookOpen style={{ width: 32, height: 32, color: 'white' }} />
          </div>
          <h1 className="gradient-text" style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, marginBottom: 12 }}>
            Learning Arena
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Master programming languages with interactive roadmaps and track your progress
          </p>
        </div>

        {/* Language Selection */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Search */}
            <div className="input-with-icon">
              <FiSearch className="input-icon" style={{ width: 18, height: 18 }} />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Language Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {filteredLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setSelectedStep(null);
                  }}
                  style={{
                    padding: '10px 18px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: selectedLang === lang ? 'white' : '#a1a1aa',
                    background: selectedLang === lang ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.03)',
                    border: selectedLang === lang ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <FiCode style={{ width: 16, height: 16 }} />
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiAward style={{ color: '#eab308' }} />
              {selectedLang} Progress
            </span>
            <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 18 }}>{progressPct}%</span>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
          <p style={{ color: '#71717a', fontSize: 13, marginTop: 10 }}>
            {completedCount} of {steps.length} steps completed
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FiTrendingUp style={{ color: '#6366f1' }} />
            {selectedLang} Roadmap
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {steps.map((step, i) => {
              const isCompleted = completedSteps[`${selectedLang}_${i}`];
              return (
                <div
                  key={i}
                  onClick={() => setSelectedStep(selectedStep === i ? null : i)}
                  style={{
                    padding: 16,
                    background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : selectedStep === i ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : selectedStep === i ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      background: isCompleted ? '#10b981' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'white',
                      flexShrink: 0,
                    }}>
                      {isCompleted ? <FiCheck style={{ width: 18, height: 18 }} /> : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: 'white', fontWeight: 500, marginBottom: 2 }}>{step.title}</p>
                      <p style={{ color: '#71717a', fontSize: 13 }}>{step.description}</p>
                    </div>
                    <FiChevronRight style={{ 
                      width: 18, 
                      height: 18, 
                      color: '#71717a',
                      transform: selectedStep === i ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s',
                    }} />
                  </div>

                  {selectedStep === i && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(i);
                        }}
                        className={isCompleted ? "btn-secondary" : "btn-primary"}
                        style={{ padding: '10px 20px', fontSize: 13 }}
                      >
                        <FiCheck style={{ width: 16, height: 16 }} />
                        <span>{isCompleted ? 'Mark Incomplete' : 'Mark Complete'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hackathon Ideas */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FiTrendingUp style={{ color: '#f97316' }} />
            Hackathon Ideas
          </h2>

          {/* Add Idea Form */}
          <form onSubmit={submitIdea} style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Share your hackathon idea..."
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              className="input-field"
              style={{ flex: 1, minWidth: 200 }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
              <FiPlus style={{ width: 18, height: 18 }} />
              <span>Post</span>
            </button>
          </form>

          {/* Ideas List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {ideas.map((idea, i) => (
              <div key={i} style={{
                padding: 16,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
              }}>
                <p style={{ color: 'white', fontWeight: 500, marginBottom: 8 }}>{idea.text}</p>
                <p style={{ color: '#71717a', fontSize: 12, marginBottom: 12 }}>by {idea.author}</p>
                <button
                  onClick={() => voteIdea(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 8,
                    color: '#10b981',
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <FiThumbsUp style={{ width: 14, height: 14 }} />
                  {idea.votes} votes
                </button>
              </div>
            ))}
          </div>

          {ideas.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#71717a' }}>
              <FiTrendingUp style={{ width: 40, height: 40, margin: '0 auto 12px', opacity: 0.5 }} />
              <p>No ideas yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arena;
