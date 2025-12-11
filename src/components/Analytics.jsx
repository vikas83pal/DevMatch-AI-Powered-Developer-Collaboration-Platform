import React, { useState } from 'react';
import {
  FiTrendingUp,
  FiUsers,
  FiFolder,
  FiMessageCircle,
  FiTarget,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiPieChart,
  FiBarChart2,
} from 'react-icons/fi';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  const stats = {
    totalMatches: 892,
    successRate: 94.5,
    activeProjects: 24,
    totalMessages: 1247,
  };

  const trends = {
    matches: { change: 18, up: true },
    projects: { change: 26, up: true },
    messages: { change: 13, up: true },
    connections: { change: 16, up: true },
  };

  const skillsData = [
    { skill: 'React', matches: 245, pct: 28 },
    { skill: 'Node.js', matches: 189, pct: 21 },
    { skill: 'Python', matches: 156, pct: 18 },
    { skill: 'TypeScript', matches: 134, pct: 15 },
    { skill: 'AWS', matches: 98, pct: 11 },
    { skill: 'Docker', matches: 70, pct: 7 },
  ];

  const weeklyData = [
    { day: 'Mon', matches: 45, messages: 89 },
    { day: 'Tue', matches: 52, messages: 102 },
    { day: 'Wed', matches: 68, messages: 156 },
    { day: 'Thu', matches: 41, messages: 87 },
    { day: 'Fri', matches: 59, messages: 134 },
    { day: 'Sat', matches: 38, messages: 67 },
    { day: 'Sun', matches: 28, messages: 45 },
  ];

  const monthlyData = [
    { month: 'Jul', matches: 234, projects: 8 },
    { month: 'Aug', matches: 289, projects: 12 },
    { month: 'Sep', matches: 345, projects: 15 },
    { month: 'Oct', matches: 412, projects: 18 },
    { month: 'Nov', matches: 478, projects: 21 },
    { month: 'Dec', matches: 567, projects: 24 },
  ];

  const topConnections = [
    { name: 'Sarah K.', role: 'Frontend Dev', score: 98, projects: 3 },
    { name: 'Mike R.', role: 'Backend Dev', score: 95, projects: 2 },
    { name: 'Emily C.', role: 'Full Stack', score: 94, projects: 4 },
    { name: 'David L.', role: 'DevOps', score: 92, projects: 2 },
  ];

  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  const overviewCards = [
    { title: 'Total Matches', value: stats.totalMatches, change: trends.matches.change, Icon: FiUsers, color: '#6366f1' },
    { title: 'Success Rate', value: `${stats.successRate}%`, change: 2.3, Icon: FiTarget, color: '#10b981' },
    { title: 'Active Projects', value: stats.activeProjects, change: trends.projects.change, Icon: FiFolder, color: '#f97316' },
    { title: 'Total Messages', value: stats.totalMessages.toLocaleString(), change: trends.messages.change, Icon: FiMessageCircle, color: '#3b82f6' },
  ];

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
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FiBarChart2 style={{ width: 24, height: 24, color: 'white' }} />
              </div>
              <div>
                <h1 className="gradient-text" style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700 }}>
                  Analytics Dashboard
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: 14 }}>Track your performance and growth</p>
              </div>
            </div>
            
            {/* Time Range Filter */}
            <div style={{ 
              display: 'inline-flex', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: 4,
              alignSelf: 'flex-start',
            }}>
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: timeRange === range ? 'white' : '#a1a1aa',
                    background: timeRange === range ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16,
          marginBottom: 32,
        }}>
          {overviewCards.map((card, i) => (
            <div key={i} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}99)`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <card.Icon style={{ width: 22, height: 22, color: 'white' }} />
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#10b981',
                }}>
                  <FiArrowUp style={{ width: 14, height: 14 }} />
                  {card.change}%
                </div>
              </div>
              <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 4 }}>{card.title}</p>
              <p style={{ color: 'white', fontSize: 28, fontWeight: 700 }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
          marginBottom: 32,
        }}>
          {/* Monthly Trends */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <FiTrendingUp style={{ width: 20, height: 20, color: '#6366f1' }} />
              <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Monthly Trends</h2>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 200, gap: 8 }}>
              {monthlyData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#8b5cf6', fontSize: 10, fontWeight: 500 }}>{d.projects}</span>
                  <div style={{
                    width: '100%',
                    maxWidth: 24,
                    height: `${(d.projects / 30) * 60}px`,
                    background: 'linear-gradient(180deg, #8b5cf6, #6366f1)',
                    borderRadius: '4px 4px 0 0',
                  }}></div>
                  <div className="chart-bar" style={{ 
                    width: '100%', 
                    maxWidth: 24, 
                    height: `${(d.matches / 600) * 120}px` 
                  }}></div>
                  <span style={{ color: '#71717a', fontSize: 10 }}>{d.month}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#6366f1', borderRadius: 2 }}></div>
                <span style={{ color: '#a1a1aa', fontSize: 12 }}>Matches</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#8b5cf6', borderRadius: 2 }}></div>
                <span style={{ color: '#a1a1aa', fontSize: 12 }}>Projects</span>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <FiActivity style={{ width: 20, height: 20, color: '#10b981' }} />
              <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Weekly Activity</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {weeklyData.map((d, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: '#a1a1aa' }}>{d.day}</span>
                    <span style={{ color: 'white' }}>{d.matches + d.messages} actions</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, display: 'flex', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${(d.matches / 70) * 50}%`, 
                      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                    }}></div>
                    <div style={{ 
                      width: `${(d.messages / 160) * 50}%`, 
                      background: 'linear-gradient(90deg, #10b981, #34d399)',
                    }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#6366f1', borderRadius: 2 }}></div>
                <span style={{ color: '#a1a1aa', fontSize: 12 }}>Matches</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, background: '#10b981', borderRadius: 2 }}></div>
                <span style={{ color: '#a1a1aa', fontSize: 12 }}>Messages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Connections Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
        }}>
          {/* Matches by Skill */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <FiPieChart style={{ width: 20, height: 20, color: '#f97316' }} />
              <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Matches by Skill</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {skillsData.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: 'white', fontWeight: 500 }}>{s.skill}</span>
                    <span style={{ color: '#a1a1aa' }}>{s.matches} ({s.pct}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${s.pct * 3.5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Connections */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <FiUsers style={{ width: 20, height: 20, color: '#ec4899' }} />
              <h2 style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Top Connections</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {topConnections.map((p, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12, 
                  padding: 12,
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>
                  <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>
                    {p.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'white', fontWeight: 500, fontSize: 14 }}>{p.name}</p>
                    <p style={{ color: '#a1a1aa', fontSize: 12 }}>{p.role}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#6366f1', fontWeight: 700 }}>{p.score}%</p>
                    <p style={{ color: '#71717a', fontSize: 11 }}>{p.projects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
