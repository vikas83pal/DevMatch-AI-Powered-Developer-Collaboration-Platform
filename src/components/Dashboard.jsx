import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiFolder,
  FiMessageCircle,
  FiBell,
  FiTrendingUp,
  FiTarget,
  FiClock,
  FiStar,
  FiArrowRight,
  FiActivity,
  FiZap,
  FiAward,
  FiCalendar,
} from 'react-icons/fi';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUserData(JSON.parse(user));
    setTimeout(() => setLoading(false), 500);
  }, []);

  const stats = {
    matches: 892,
    projects: 12,
    connections: 47,
    matchRate: 95,
  };

  const activities = [
    { type: 'match', message: 'New match with Sarah K.', time: '2 hours ago', Icon: FiUsers, color: '#6366f1' },
    { type: 'project', message: 'Project "AI Dashboard" updated', time: '5 hours ago', Icon: FiFolder, color: '#10b981' },
    { type: 'message', message: '3 new messages received', time: '1 day ago', Icon: FiMessageCircle, color: '#3b82f6' },
    { type: 'badge', message: 'Earned "Top Contributor" badge', time: '2 days ago', Icon: FiAward, color: '#f97316' },
  ];

  const notifications = [
    { id: 1, title: 'New Match Found!', message: 'Sarah K. matches your skills', read: false, time: '5m' },
    { id: 2, title: 'Project Invitation', message: 'Join "AI Chatbot" project', read: false, time: '1h' },
    { id: 3, title: 'Message Received', message: 'John D. sent you a message', read: true, time: '3h' },
  ];

  const weeklyData = [
    { month: 'Jul', value: 45 },
    { month: 'Aug', value: 62 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 95 },
    { month: 'Nov', value: 82 },
    { month: 'Dec', value: 110 },
  ];

  const quickActions = [
    { title: 'Find Matches', Icon: FiUsers, path: '/match', color: '#6366f1' },
    { title: 'Projects', Icon: FiFolder, path: '/projects', color: '#10b981' },
    { title: 'Profile', Icon: FiStar, path: '/profile', color: '#f97316' },
    { title: 'Analytics', Icon: FiActivity, path: '/analytics', color: '#3b82f6' },
  ];

  const userName = userData?.name || 'Developer';
  const userInitials = userName.slice(0, 2).toUpperCase();

  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 100 }}>
        <div style={containerStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 120, borderRadius: 16 }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 60 }}>
      <div className="animated-bg"></div>
      
      <div style={containerStyle}>
        {/* Welcome Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="avatar-ring">
                <div className="avatar" style={{ width: 56, height: 56, fontSize: 20 }}>{userInitials}</div>
              </div>
              <div>
                <h1 style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  Welcome back, <span className="gradient-text">{userName.split(' ')[0]}</span>! 👋
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: 14 }}>Here's what's happening with your network</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{
                position: 'relative',
                padding: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                cursor: 'pointer',
              }}>
                <FiBell style={{ width: 20, height: 20, color: 'white' }} />
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              </button>
              <Link to="/profile" className="btn-primary" style={{ padding: '12px 20px', fontSize: 14 }}>
                <FiZap style={{ width: 16, height: 16 }} />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { label: 'Total Matches', value: stats.matches, change: '+12%', Icon: FiUsers, color: '#6366f1' },
            { label: 'Active Projects', value: stats.projects, change: '+3', Icon: FiFolder, color: '#10b981' },
            { label: 'Connections', value: stats.connections, change: '+8', Icon: FiTarget, color: '#f97316' },
            { label: 'Match Rate', value: `${stats.matchRate}%`, change: '+2%', Icon: FiTrendingUp, color: '#3b82f6' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <stat.Icon style={{ width: 20, height: 20, color: 'white' }} />
                </div>
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 500, 
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '4px 8px',
                  borderRadius: 50,
                }}>{stat.change}</span>
              </div>
              <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 4 }}>{stat.label}</p>
              <p style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 24,
          marginBottom: 32,
        }}>
          {/* Chart */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiTrendingUp style={{ color: '#6366f1' }} />
                Match Trends
              </h2>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Week', 'Month', '6M'].map((p, i) => (
                  <button key={p} style={{
                    padding: '6px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: p === 'Month' ? 'white' : '#a1a1aa',
                    background: p === 'Month' ? '#6366f1' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}>{p}</button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, gap: 8 }}>
              {weeklyData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#818cf8', fontSize: 12, fontWeight: 500 }}>{d.value}</span>
                  <div className="chart-bar" style={{ width: '100%', maxWidth: 40, height: `${(d.value / 120) * 140}px` }}></div>
                  <span style={{ color: '#71717a', fontSize: 11 }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <FiActivity style={{ color: '#8b5cf6' }} />
              Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activities.map((a, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 12, 
                  padding: 12, 
                  borderRadius: 10,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    background: `${a.color}20`,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <a.Icon style={{ width: 18, height: 18, color: a.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'white', fontSize: 14, marginBottom: 2 }}>{a.message}</p>
                    <p style={{ color: '#71717a', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FiClock style={{ width: 12, height: 12 }} />
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%',
              marginTop: 16,
              padding: 10,
              background: 'transparent',
              border: 'none',
              color: '#6366f1',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}>
              View All Activity
              <FiArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <FiZap style={{ color: '#eab308' }} />
            Quick Actions
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: 12,
          }}>
            {quickActions.map((a, i) => (
              <Link key={i} to={a.path} className="glass-card hover-lift" style={{ 
                padding: 20, 
                textAlign: 'center',
                textDecoration: 'none',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  background: `linear-gradient(135deg, ${a.color}, ${a.color}99)`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <a.Icon style={{ width: 24, height: 24, color: 'white' }} />
                </div>
                <p style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>{a.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications & Stats Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 24,
        }}>
          {/* Notifications */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiBell style={{ color: '#ef4444' }} />
                Notifications
              </h2>
              <span style={{ fontSize: 12, color: '#a1a1aa', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 50 }}>
                {notifications.filter(n => !n.read).length} new
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notifications.map((n) => (
                <div key={n.id} style={{
                  padding: 14,
                  borderRadius: 10,
                  border: `1px solid ${n.read ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.3)'}`,
                  background: n.read ? 'rgba(255,255,255,0.02)' : 'rgba(99, 102, 241, 0.1)',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <div>
                      <p style={{ color: 'white', fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{n.title}</p>
                      <p style={{ color: '#a1a1aa', fontSize: 12 }}>{n.message}</p>
                    </div>
                    <span style={{ color: '#71717a', fontSize: 11, whiteSpace: 'nowrap' }}>{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Stats */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <FiCalendar style={{ color: '#10b981' }} />
              This Week
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Messages Sent', value: 23, max: 50 },
                { label: 'Project Views', value: 156, max: 200 },
                { label: 'Profile Views', value: 89, max: 150 },
                { label: 'Match Requests', value: 12, max: 30 },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: '#a1a1aa' }}>{s.label}</span>
                    <span style={{ color: 'white', fontWeight: 500 }}>{s.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${(s.value / s.max) * 100}%` }}></div>
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

export default Dashboard;
