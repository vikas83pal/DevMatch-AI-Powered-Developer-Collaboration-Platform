const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'devmatch_super_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB/MySQL in production)
let users = [];
let projects = [
  {
    id: 1,
    title: "AI Chatbot Platform",
    description: "Building an AI-powered chatbot for customer service with natural language processing.",
    category: "AI/ML",
    skills: ["Python", "TensorFlow", "NLP"],
    status: "Recruiting",
    members: [1],
    createdAt: new Date(),
    stars: 156,
    views: 2340,
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "Full-stack e-commerce platform with real-time analytics and inventory management.",
    category: "Web Development",
    skills: ["React", "Node.js", "MongoDB"],
    status: "Active",
    members: [2],
    createdAt: new Date(),
    stars: 89,
    views: 1560,
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans and social features.",
    category: "Mobile",
    skills: ["React Native", "Firebase"],
    status: "Recruiting",
    members: [3],
    createdAt: new Date(),
    stars: 234,
    views: 3210,
  },
  {
    id: 4,
    title: "DevOps Pipeline Tool",
    description: "Automated CI/CD pipeline tool with container orchestration and monitoring.",
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "Jenkins"],
    status: "Active",
    members: [1],
    createdAt: new Date(),
    stars: 178,
    views: 1890,
  },
  {
    id: 5,
    title: "Blockchain Wallet",
    description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration.",
    category: "Blockchain",
    skills: ["Solidity", "Web3.js", "React"],
    status: "Recruiting",
    members: [2],
    createdAt: new Date(),
    stars: 312,
    views: 4520,
  },
];
let notifications = [];
let messages = [];
let subscribers = []; // Newsletter subscribers
let analyticsData = {
  totalUsers: 0,
  totalProjects: 0,
  totalMatches: 0,
  matchSuccessRate: 95,
};

// Nodemailer setup (optional - for sending emails)
const nodemailer = require('nodemailer');

// Create transporter - Configure with your email service
// For Gmail: Enable "Less secure app access" or use App Password
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email service not configured:', error.message);
    console.log('   Set EMAIL_USER and EMAIL_PASS in .env for email functionality');
  } else {
    console.log('✉️  Email service is ready');
  }
});

// ============== AUTH MIDDLEWARE ==============
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============== AUTH ROUTES ==============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, skills = [], bio = '', role = 'Developer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      bio,
      role,
      avatar: name.slice(0, 2).toUpperCase(),
      createdAt: new Date(),
      matchScore: Math.floor(Math.random() * 20) + 80,
      projectsJoined: 0,
      connectionsCount: 0,
      isOnline: true,
      lastActive: new Date(),
    };

    users.push(newUser);
    analyticsData.totalUsers++;

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last active
    user.lastActive = new Date();
    user.isOnline = true;

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Logout
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (user) {
    user.isOnline = false;
    user.lastActive = new Date();
  }
  res.json({ message: 'Logged out successfully' });
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// ============== USER ROUTES ==============

// Get all users (for matching)
app.get('/api/users', authenticateToken, (req, res) => {
  const usersWithoutPasswords = users
    .filter(u => u.id !== req.user.id)
    .map(({ password, ...user }) => user);
  res.json({ users: usersWithoutPasswords });
});

// Get user profile
app.get('/api/users/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// Update profile
app.put('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio, skills, role, avatar } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) users[userIndex].name = name;
    if (bio) users[userIndex].bio = bio;
    if (skills) users[userIndex].skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    if (role) users[userIndex].role = role;
    if (avatar) users[userIndex].avatar = avatar;

    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json({ message: 'Profile updated', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Change password
app.put('/api/users/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(12);
    users[userIndex].password = await bcrypt.hash(newPassword, salt);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
});

// ============== NOTIFICATIONS ROUTES ==============

// Get notifications
app.get('/api/notifications', authenticateToken, (req, res) => {
  const userNotifications = notifications.filter(n => n.userId === req.user.id);
  res.json({ notifications: userNotifications });
});

// Mark notification as read
app.put('/api/notifications/:id/read', authenticateToken, (req, res) => {
  const notificationIndex = notifications.findIndex(
    n => n.id === parseInt(req.params.id) && n.userId === req.user.id
  );
  if (notificationIndex !== -1) {
    notifications[notificationIndex].read = true;
  }
  res.json({ message: 'Notification marked as read' });
});

// Create notification (internal helper)
const createNotification = (userId, type, title, message) => {
  const notification = {
    id: notifications.length + 1,
    userId,
    type,
    title,
    message,
    read: false,
    createdAt: new Date(),
  };
  notifications.push(notification);
  return notification;
};

// ============== ANALYTICS ROUTES ==============

// Get analytics
app.get('/api/analytics', authenticateToken, (req, res) => {
  const userProjects = projects.filter(p => p.members.includes(req.user.id));

  res.json({
    analytics: {
      ...analyticsData,
      totalUsers: users.length,
      totalProjects: projects.length,
      userProjects: userProjects.length,
      userConnections: users.find(u => u.id === req.user.id)?.connectionsCount || 0,
    },
    recentActivity: [
      { type: 'match', message: 'New developer match found', time: '2 hours ago' },
      { type: 'project', message: 'Project "AI Dashboard" updated', time: '5 hours ago' },
      { type: 'message', message: '3 new messages received', time: '1 day ago' },
    ],
    matchTrends: [
      { month: 'Jan', matches: 45 },
      { month: 'Feb', matches: 52 },
      { month: 'Mar', matches: 68 },
      { month: 'Apr', matches: 85 },
      { month: 'May', matches: 92 },
      { month: 'Jun', matches: 110 },
    ],
  });
});

// ============== PROJECT ROUTES ==============

// Get all projects
app.get('/api/projects', (req, res) => {
  res.json({ projects });
});

// Create project
app.post('/api/projects', authenticateToken, (req, res) => {
  const { title, description, details, skills, status, category } = req.body;

  const newProject = {
    id: projects.length + 1,
    title,
    description,
    details,
    skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
    status: status || 'active',
    category: category || 'Web Development',
    members: [req.user.id],
    createdBy: req.user.id,
    createdAt: new Date(),
  };

  projects.push(newProject);
  analyticsData.totalProjects++;

  // Create notification for user
  createNotification(req.user.id, 'project', 'Project Created', `Your project "${title}" has been created!`);

  res.status(201).json({ message: 'Project created', project: newProject });
});

// ============== MESSAGES ROUTES ==============

// Get messages
app.get('/api/messages/:recipientId', authenticateToken, (req, res) => {
  const recipientId = parseInt(req.params.recipientId);
  const conversation = messages.filter(
    m => (m.senderId === req.user.id && m.recipientId === recipientId) ||
      (m.senderId === recipientId && m.recipientId === req.user.id)
  );
  res.json({ messages: conversation });
});

// Send message
app.post('/api/messages', authenticateToken, (req, res) => {
  const { recipientId, content } = req.body;

  const newMessage = {
    id: messages.length + 1,
    senderId: req.user.id,
    recipientId,
    content,
    createdAt: new Date(),
    read: false,
  };

  messages.push(newMessage);

  // Create notification for recipient
  createNotification(recipientId, 'message', 'New Message', `You have a new message from ${req.user.name}`);

  res.status(201).json({ message: 'Message sent', data: newMessage });
});

// ============== NEWSLETTER ROUTES ==============

// Subscribe to newsletter
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name = '' } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if already subscribed
    const existingSubscriber = subscribers.find(s => s.email === email);
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Add subscriber
    const newSubscriber = {
      id: subscribers.length + 1,
      email,
      name,
      subscribedAt: new Date(),
      isActive: true,
    };
    subscribers.push(newSubscriber);

    // Send confirmation email
    try {
      const mailOptions = {
        from: `"DevMatch" <${process.env.EMAIL_USER || 'noreply@devmatch.io'}>`,
        to: email,
        subject: '🎉 Welcome to DevMatch Newsletter!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f17; margin: 0; padding: 40px 20px; }
              .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16162a); border-radius: 20px; padding: 40px; border: 1px solid rgba(99, 102, 241, 0.2); }
              .logo { text-align: center; margin-bottom: 30px; }
              .logo-text { font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; background-clip: text; color: transparent; }
              h1 { color: #ffffff; font-size: 24px; text-align: center; margin-bottom: 20px; }
              p { color: #a1a1aa; font-size: 16px; line-height: 1.7; margin-bottom: 20px; }
              .highlight { color: #818cf8; font-weight: 600; }
              .button { display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin: 20px 0; }
              .features { background: rgba(99, 102, 241, 0.1); border-radius: 12px; padding: 20px; margin: 20px 0; }
              .feature { color: #d1d5db; margin: 10px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
              .footer p { color: #71717a; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <span class="logo-text">DevMatch</span>
              </div>
              <h1>Welcome to the DevMatch Community! 🚀</h1>
              <p>Hi${name ? ` <span class="highlight">${name}</span>` : ''},</p>
              <p>Thank you for subscribing to the DevMatch newsletter! You're now part of a community of <span class="highlight">10,000+ developers</span> building amazing projects together.</p>
              
              <div class="features">
                <p style="color: #fff; font-weight: 600; margin-bottom: 15px;">What you'll receive:</p>
                <p class="feature">✨ Weekly developer matching insights</p>
                <p class="feature">📚 Curated learning resources & tutorials</p>
                <p class="feature">🔥 Hot project opportunities</p>
                <p class="feature">💡 Tips for successful collaboration</p>
              </div>
              
              <p style="text-align: center;">
                <a href="https://devmatch.io" class="button">Explore DevMatch</a>
              </p>
              
              <div class="footer">
                <p>You're receiving this because you subscribed at devmatch.io</p>
                <p>© ${new Date().getFullYear()} DevMatch. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Welcome email sent to ${email}`);
    } catch (emailError) {
      console.log('⚠️  Could not send welcome email:', emailError.message);
      // Continue anyway - subscription is still successful
    }

    res.status(201).json({
      message: 'Successfully subscribed to newsletter!',
      subscriber: { email, subscribedAt: newSubscriber.subscribedAt },
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Failed to subscribe' });
  }
});

// Unsubscribe from newsletter
app.post('/api/newsletter/unsubscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const subscriberIndex = subscribers.findIndex(s => s.email === email);
  if (subscriberIndex === -1) {
    return res.status(404).json({ message: 'Email not found' });
  }

  subscribers[subscriberIndex].isActive = false;

  res.json({ message: 'Successfully unsubscribed' });
});

// Get all subscribers (admin only - add auth in production)
app.get('/api/newsletter/subscribers', (req, res) => {
  const activeSubscribers = subscribers.filter(s => s.isActive);
  res.json({
    total: activeSubscribers.length,
    subscribers: activeSubscribers.map(s => ({ email: s.email, subscribedAt: s.subscribedAt })),
  });
});

// Send newsletter to all subscribers (admin only)
app.post('/api/newsletter/send', async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: 'Subject and content are required' });
    }

    const activeSubscribers = subscribers.filter(s => s.isActive);

    if (activeSubscribers.length === 0) {
      return res.status(400).json({ message: 'No active subscribers' });
    }

    let successCount = 0;
    let failCount = 0;

    for (const subscriber of activeSubscribers) {
      try {
        await transporter.sendMail({
          from: `"DevMatch Newsletter" <${process.env.EMAIL_USER || 'newsletter@devmatch.io'}>`,
          to: subscriber.email,
          subject: subject,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f17; margin: 0; padding: 40px 20px; }
                .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16162a); border-radius: 20px; padding: 40px; border: 1px solid rgba(99, 102, 241, 0.2); }
                .logo { text-align: center; margin-bottom: 30px; font-size: 24px; font-weight: bold; color: #818cf8; }
                .content { color: #d1d5db; font-size: 16px; line-height: 1.8; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
                .footer p { color: #71717a; font-size: 12px; }
                .footer a { color: #6366f1; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">DevMatch Newsletter</div>
                <div class="content">${content}</div>
                <div class="footer">
                  <p>You're receiving this because you subscribed to DevMatch newsletter.</p>
                  <p><a href="https://devmatch.io/unsubscribe?email=${subscriber.email}">Unsubscribe</a></p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        successCount++;
      } catch (error) {
        failCount++;
        console.log(`Failed to send to ${subscriber.email}:`, error.message);
      }
    }

    res.json({
      message: 'Newsletter sent',
      sent: successCount,
      failed: failCount,
      total: activeSubscribers.length,
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    res.status(500).json({ message: 'Failed to send newsletter' });
  }
});

// ============== HEALTH CHECK ==============
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevMatch API Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics endpoint: http://localhost:${PORT}/api/analytics`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
});
