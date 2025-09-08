import React, { useState } from "react";
import {
  FiGitBranch,
  FiPlus,
  FiSearch,
  FiX,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack online store with React and Node.js",
      details:
        "This project is a full-fledged e-commerce solution with product catalog, cart, payments, and admin dashboard. Technologies include React, Node.js, and MongoDB.",
      skills: ["React", "Node.js", "MongoDB"],
      members: 3,
      status: "active",
      domain: "Web Development",
    },
    {
      id: 2,
      title: "Portfolio Builder",
      description: "AI-powered portfolio generator for developers",
      details:
        "An AI-based platform that helps developers create professional portfolios in minutes using Next.js, Tailwind, and OpenAI API integration.",
      skills: ["Next.js", "Tailwind", "OpenAI API"],
      members: 2,
      status: "recruiting",
      domain: "AI/ML",
    },
    {
      id: 3,
      title: "Chat App",
      description: "Real-time chat app with WebSockets",
      details:
        "A cross-platform real-time chat application supporting group chats, media sharing, and online presence indicators. Built with React, Socket.io, and Firebase.",
      skills: ["React", "Socket.io", "Firebase"],
      members: 4,
      status: "active",
      domain: "Web Development",
    },
    {
      id: 4,
      title: "Brain Tumor Detection",
      description: "Medical imaging project using Deep Learning",
      details:
        "This project applies Convolutional Neural Networks (CNNs) for detecting brain tumors in MRI scans. Trained with TensorFlow/Keras, evaluated with accuracy and recall metrics.",
      skills: ["Python", "TensorFlow", "Deep Learning"],
      members: 5,
      status: "recruiting",
      domain: "Deep Learning",
    },
    {
      id: 5,
      title: "Stock Price Predictor",
      description: "Predict stock prices with ML models",
      details:
        "Time-series forecasting using LSTMs and ARIMA models to predict stock market trends with visualization dashboards built in React.",
      skills: ["Python", "LSTM", "Pandas"],
      members: 3,
      status: "active",
      domain: "Machine Learning",
    },
    {
    id: 6,
    title: "Fake News Detection",
    description: "ML model to detect fake news articles",
    details:
      "Uses NLP techniques and transformer models (BERT) to classify news as real or fake. Includes dataset preprocessing, feature extraction, and model deployment via Flask.",
    skills: ["Python", "BERT", "NLP"],
    members: 3,
    status: "active",
    domain: "Machine Learning",
  },
  {
    id: 7,
    title: "AI Resume Screener",
    description: "HR automation using AI",
    details:
      "Automates resume shortlisting with NLP and keyword extraction. Built with Python, spaCy, and integrated with a web dashboard.",
    skills: ["Python", "spaCy", "React"],
    members: 4,
    status: "recruiting",
    domain: "AI/ML",
  },
  {
    id: 8,
    title: "Blockchain Voting System",
    description: "Secure decentralized voting platform",
    details:
      "Implements blockchain smart contracts on Ethereum to create a tamper-proof voting system. Includes wallet authentication and results dashboard.",
    skills: ["Solidity", "Ethereum", "React"],
    members: 5,
    status: "active",
    domain: "Blockchain",
  },
  {
    id: 9,
    title: "IoT Smart Home System",
    description: "IoT-based home automation",
    details:
      "Controls lighting, appliances, and security cameras using IoT devices. Integrates with mobile app and cloud storage for automation.",
    skills: ["Arduino", "Raspberry Pi", "MQTT"],
    members: 6,
    status: "active",
    domain: "IoT",
  },
  {
    id: 10,
    title: "Autonomous Drone Navigation",
    description: "AI-powered drone path planning",
    details:
      "Uses computer vision and reinforcement learning for obstacle avoidance in drones. Built with ROS and OpenCV.",
    skills: ["Python", "OpenCV", "Reinforcement Learning"],
    members: 4,
    status: "recruiting",
    domain: "AI/Robotics",
  },
  {
    id: 11,
    title: "Sentiment Analysis Dashboard",
    description: "Social media sentiment tracker",
    details:
      "Analyzes Twitter data with NLP to monitor public sentiment about brands and events. Built with Python and Plotly Dash.",
    skills: ["Python", "NLP", "Plotly"],
    members: 3,
    status: "active",
    domain: "Machine Learning",
  },
  {
    id: 12,
    title: "AI Code Reviewer",
    description: "Automated code quality analysis",
    details:
      "Uses GPT models to analyze code quality, suggest improvements, and detect vulnerabilities. Integrated with GitHub Actions.",
    skills: ["OpenAI API", "Node.js", "GitHub Actions"],
    members: 3,
    status: "recruiting",
    domain: "AI/ML",
  },
  {
    id: 13,
    title: "Smart Traffic Management",
    description: "AI-based traffic optimization",
    details:
      "Processes live traffic feeds to optimize signal timings and reduce congestion using ML-based prediction.",
    skills: ["Python", "OpenCV", "TensorFlow"],
    members: 5,
    status: "active",
    domain: "AI/IoT",
  },
  {
    id: 14,
    title: "Cybersecurity Intrusion Detection",
    description: "AI-powered IDS system",
    details:
      "Detects abnormal network patterns with deep learning anomaly detection models, trained on NSL-KDD dataset.",
    skills: ["Python", "Scikit-learn", "TensorFlow"],
    members: 4,
    status: "active",
    domain: "Cybersecurity",
  },
  {
    id: 15,
    title: "AI Music Generator",
    description: "Deep Learning music composer",
    details:
      "Generates new melodies using LSTMs trained on MIDI datasets. Deployed with a web interface for users to generate songs.",
    skills: ["Python", "TensorFlow", "Flask"],
    members: 2,
    status: "recruiting",
    domain: "Deep Learning",
  },
  {
    id: 16,
    title: "Healthcare Chatbot",
    description: "AI-powered medical assistant",
    details:
      "Provides basic health advice, symptom checking, and appointment booking using NLP models integrated with Dialogflow.",
    skills: ["Dialogflow", "React", "Firebase"],
    members: 5,
    status: "active",
    domain: "AI/ML",
  },
  {
    id: 17,
    title: "Augmented Reality Furniture App",
    description: "AR-based shopping experience",
    details:
      "Allows users to visualize furniture in their rooms using ARKit/ARCore with a React Native frontend.",
    skills: ["React Native", "ARKit", "Three.js"],
    members: 3,
    status: "active",
    domain: "AR/VR",
  },
  {
    id: 18,
    title: "AI-Powered Fraud Detection",
    description: "Banking fraud prevention system",
    details:
      "Analyzes transactions in real time with anomaly detection ML models to flag fraudulent activity.",
    skills: ["Python", "PyTorch", "Big Data"],
    members: 4,
    status: "active",
    domain: "Machine Learning",
  },
  {
    id: 19,
    title: "Voice Recognition Assistant",
    description: "Speech-to-text AI assistant",
    details:
      "Implements voice-controlled assistant with DeepSpeech and NLP integration for task automation.",
    skills: ["Python", "DeepSpeech", "NLP"],
    members: 3,
    status: "recruiting",
    domain: "AI/ML",
  },
  {
    id: 20,
    title: "Cloud File Sharing Platform",
    description: "Decentralized cloud storage",
    details:
      "Implements peer-to-peer file storage using IPFS with user authentication and encryption.",
    skills: ["IPFS", "React", "Node.js"],
    members: 5,
    status: "active",
    domain: "Cloud/Blockchain",
  },
  {
    id: 21,
    title: "AI-Powered Interview Platform",
    description: "Mock interviews with AI feedback",
    details:
      "Conducts mock interviews and provides AI-driven analysis on communication, coding, and problem-solving.",
    skills: ["React", "OpenAI API", "Node.js"],
    members: 3,
    status: "active",
    domain: "AI/ML",
  },
  {
    id: 22,
    title: "Self-Driving Car Simulation",
    description: "Reinforcement Learning in action",
    details:
      "Simulates autonomous driving in Unity with deep reinforcement learning for path planning and decision-making.",
    skills: ["Unity", "C#", "Reinforcement Learning"],
    members: 6,
    status: "recruiting",
    domain: "AI/Robotics",
  },
  {
    id: 23,
    title: "AI Fashion Recommender",
    description: "Personalized clothing suggestions",
    details:
      "Uses CNNs and collaborative filtering to suggest clothing items based on user style preferences.",
    skills: ["Python", "TensorFlow", "React"],
    members: 4,
    status: "active",
    domain: "AI/ML",
  },
  {
    id: 24,
    title: "Online Code Collaboration Tool",
    description: "Real-time collaborative IDE",
    details:
      "Implements a cloud-based collaborative coding platform with real-time editing, compiling, and debugging features.",
    skills: ["React", "Node.js", "WebRTC"],
    members: 5,
    status: "active",
    domain: "Web Development",
  },
  {
    id: 25,
    title: "AI-Powered Video Summarizer",
    description: "Condenses long videos into highlights",
    details:
      "Extracts key frames and generates summaries from long videos using CNN + NLP models.",
    skills: ["Python", "OpenCV", "Transformers"],
    members: 3,
    status: "recruiting",
    domain: "Deep Learning",
  },
  {
    id: 26,
    title: "IoT Smart Agriculture",
    description: "Precision farming with IoT sensors",
    details:
      "Uses soil sensors, weather APIs, and ML predictions for irrigation and crop yield optimization.",
    skills: ["IoT", "Python", "Cloud"],
    members: 6,
    status: "active",
    domain: "IoT",
  },
  {
    id: 27,
    title: "AI Cybersecurity Assistant",
    description: "Threat detection & response AI",
    details:
      "Analyzes logs and alerts for cyberattacks, providing AI-driven insights to SOC teams.",
    skills: ["Python", "ELK Stack", "ML"],
    members: 5,
    status: "active",
    domain: "Cybersecurity",
  },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    details: "",
    skills: "",
    members: "",
    status: "active",
    domain: "Web Development",
  });

  const navigate = useNavigate();

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      project.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const newId = projects.length + 1;
    const formattedSkills = newProject.skills
      .split(",")
      .map((skill) => skill.trim());
    setProjects([
      ...projects,
      {
        ...newProject,
        id: newId,
        skills: formattedSkills,
        members: parseInt(newProject.members),
      },
    ]);
    setNewProject({
      title: "",
      description: "",
      details: "",
      skills: "",
      members: "",
      status: "active",
      domain: "Web Development",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            <FiGitBranch className="inline mr-2" />
            Projects
          </h1>
          <div className="flex space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FiPlus />
              <span className="hidden md:inline">New Project</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-400/50 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    project.status === "active"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FiUsers /> {project.members} members
                </span>
                <span className="text-indigo-400">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
              <textarea
                placeholder="Short Description"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Detailed Description"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.details}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    details: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Skills (comma-separated)"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.skills}
                onChange={(e) =>
                  setNewProject({ ...newProject, skills: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Number of Members"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.members}
                onChange={(e) =>
                  setNewProject({ ...newProject, members: e.target.value })
                }
              />
              <select
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.status}
                onChange={(e) =>
                  setNewProject({ ...newProject, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="recruiting">Recruiting</option>
              </select>
              <select
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                value={newProject.domain}
                onChange={(e) =>
                  setNewProject({ ...newProject, domain: e.target.value })
                }
              >
                <option>Web Development</option>
                <option>Machine Learning</option>
                <option>Deep Learning</option>
                <option>AI/ML</option>
              </select>
              <button
                onClick={handleAddProject}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
