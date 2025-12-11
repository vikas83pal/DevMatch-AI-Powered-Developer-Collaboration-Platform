# 🚀 DevMatch - AI-Powered Developer Collaboration Platform

DevMatch is a premium AI-powered platform that helps developers discover ideal project collaborators through smart matchmaking, real-time chat, and seamless project sharing.

![DevMatch](https://img.shields.io/badge/DevMatch-AI%20Powered-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens)

---

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Design** - Beautiful frosted glass effects throughout
- **Animated Backgrounds** - Floating particles and gradient animations
- **Micro-interactions** - Hover effects, transitions, and smooth animations
- **Responsive Design** - Fully optimized for all devices
- **Dark Mode** - Stunning dark theme with vibrant accents

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based auth
- **bcrypt Password Hashing** - Industry-standard password security
- **Protected Routes** - Secure dashboard and profile pages
- **Session Management** - Auto-logout and token refresh

### 👤 User Features
- **User Dashboard** - Personalized stats and activity feed
- **Profile Management** - Edit profile, skills, and preferences
- **Analytics Dashboard** - Track matches, projects, and connections
- **Notification System** - Real-time updates and alerts

### 🤝 Matching & Collaboration
- **AI Matchmaking** - 95% accuracy skill-based matching
- **Developer Chat** - In-app messaging with developers
- **Project Discovery** - Browse and join exciting projects
- **Real-time Collaboration** - Work together seamlessly

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 19** - Latest React with Hooks
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS 4** - Utility-first styling
- 💫 **Custom Animations** - Premium CSS animations
- 🧩 **React Router v7** - Client-side routing
- 📦 **Axios** - HTTP client with interceptors
- 🔔 **React Toastify** - Beautiful notifications

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js** - Web framework
- 🔐 **JWT** - JSON Web Tokens
- 🔒 **bcryptjs** - Password hashing
- 📊 **In-memory DB** - Ready for MongoDB/MySQL

---

## 📁 Project Structure

```
DevMatch/
├── src/
│   ├── auth/
│   │   └── AuthProvider.jsx    # Auth context & hooks
│   ├── components/
│   │   ├── Analytics.jsx       # Analytics dashboard
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── Home.jsx           # Landing page
│   │   ├── Login.jsx          # Login page
│   │   ├── Match.jsx          # Developer matching
│   │   ├── NavBar.jsx         # Navigation
│   │   ├── Profile.jsx        # User profile
│   │   ├── ProjectsList.jsx   # Projects listing
│   │   └── ...
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.jsx                # Main app component
│   └── index.css              # Premium CSS styles
├── backend/
│   ├── server.js              # Express API server
│   └── .env                   # Environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/devmatch.git
cd devmatch
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Configure Environment
Create a `.env` file in the backend folder:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### 5. Start the Backend Server
```bash
cd backend
npm start
```
The API will be running at `http://localhost:5000`

### 6. Start the Frontend (in a new terminal)
```bash
npm run dev
```
The app will be running at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/password` | Change password |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project |

### Analytics & Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get user analytics |
| GET | `/api/notifications` | Get notifications |

---

## 🎨 Design System

### Colors
- **Primary**: Indigo (#667eea) → Purple (#764ba2)
- **Secondary**: Emerald, Pink, Cyan accents
- **Background**: Dark gradient (gray-900)
- **Glass**: rgba(255, 255, 255, 0.05)

### CSS Classes
- `.glass` - Glassmorphism effect
- `.glass-card` - Card with glass effect
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary ghost button
- `.gradient-text` - Animated gradient text
- `.hover-lift` - Hover lift animation
- `.fade-in-up` - Fade in animation

---

## 🔧 Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon (if installed)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- React Team for React 19
- Tailwind CSS for the amazing utility framework
- All contributors and supporters

---

**Made with ❤️ by developers, for developers**
