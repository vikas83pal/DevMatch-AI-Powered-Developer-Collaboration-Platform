import React from "react";
import { useParams } from "react-router-dom";

const projectData = {
1: {
    title: "E-commerce Platform",
    description: "Full-stack online store with React and Node.js",
    skills: ["React", "Node.js", "MongoDB"],
    members: 3,
    status: "active",
    details: `
      This project is a full-fledged e-commerce solution with product catalog, 
      cart, payments, and admin dashboard. Technologies include React, Node.js, and MongoDB.
    `,
  },
  2: {
    title: "Portfolio Builder",
    description: "AI-powered portfolio generator for developers",
    skills: ["Next.js", "Tailwind", "OpenAI API"],
    members: 2,
    status: "recruiting",
    details: `
      An AI-based platform that helps developers create professional portfolios in minutes. 
      Uses Next.js, Tailwind, and OpenAI API integration.
    `,
  },
  3: {
    title: "Chat App",
    description: "Real-time chat app with WebSockets",
    skills: ["React", "Socket.io", "Firebase"],
    members: 4,
    status: "active",
    details: `
      A cross-platform real-time chat application supporting group chats, media sharing, 
      and online presence indicators. Built with React, Socket.io, and Firebase.
    `,
  },
  4: {
    title: "Brain Tumor Detection",
    description: "Medical imaging project using Deep Learning",
    skills: ["Python", "TensorFlow", "Deep Learning"],
    members: 5,
    status: "recruiting",
    details: `
      This project applies Convolutional Neural Networks (CNNs) for detecting brain tumors 
      in MRI scans. Trained with TensorFlow/Keras, evaluated with accuracy and recall metrics.
    `,
  },
  5: {
    title: "Stock Price Predictor",
    description: "Predict stock prices with ML models",
    skills: ["Python", "LSTM", "Pandas"],
    members: 3,
    status: "active",
    details: `
      Time-series forecasting using LSTMs and ARIMA models to predict stock market trends 
      with visualization dashboards built in React.
    `,
  },
  6: {
    title: "Fake News Detection",
    description: "ML model to detect fake news articles",
    skills: ["Python", "BERT", "NLP"],
    members: 3,
    status: "active",
    details: `
      Uses NLP techniques and transformer models (BERT) to classify news as real or fake. 
      Includes dataset preprocessing, feature extraction, and model deployment via Flask.
    `,
  },
  7: {
    title: "AI Resume Screener",
    description: "HR automation using AI",
    skills: ["Python", "spaCy", "React"],
    members: 4,
    status: "recruiting",
    details: `
      Automates resume shortlisting with NLP and keyword extraction. Built with Python, spaCy, 
      and integrated with a web dashboard.
    `,
  },
  8: {
    title: "Blockchain Voting System",
    description: "Secure decentralized voting platform",
    skills: ["Solidity", "Ethereum", "React"],
    members: 5,
    status: "active",
    details: `
      Implements blockchain smart contracts on Ethereum to create a tamper-proof voting system. 
      Includes wallet authentication and results dashboard.
    `,
  },
  9: {
    title: "IoT Smart Home System",
    description: "IoT-based home automation",
    skills: ["Arduino", "Raspberry Pi", "MQTT"],
    members: 6,
    status: "active",
    details: `
      Controls lighting, appliances, and security cameras using IoT devices. Integrates with mobile 
      app and cloud storage for automation.
    `,
  },
  10: {
    title: "Autonomous Drone Navigation",
    description: "AI-powered drone path planning",
    skills: ["Python", "OpenCV", "Reinforcement Learning"],
    members: 4,
    status: "recruiting",
    details: `
      Uses computer vision and reinforcement learning for obstacle avoidance in drones. Built with ROS 
      and OpenCV.
    `,
  },
  11: {
    title: "Sentiment Analysis Dashboard",
    description: "Social media sentiment tracker",
    skills: ["Python", "NLP", "Plotly"],
    members: 3,
    status: "active",
    details: `
      Analyzes Twitter data with NLP to monitor public sentiment about brands and events. Built with 
      Python and Plotly Dash.
    `,
  },
  12: {
    title: "AI Code Reviewer",
    description: "Automated code quality analysis",
    skills: ["OpenAI API", "Node.js", "GitHub Actions"],
    members: 3,
    status: "recruiting",
    details: `
      Uses GPT models to analyze code quality, suggest improvements, and detect vulnerabilities. 
      Integrated with GitHub Actions.
    `,
  },
  13: {
    title: "Smart Traffic Management",
    description: "AI-based traffic optimization",
    skills: ["Python", "OpenCV", "TensorFlow"],
    members: 5,
    status: "active",
    details: `
      Processes live traffic feeds to optimize signal timings and reduce congestion using 
      ML-based prediction.
    `,
  },
  14: {
    title: "Cybersecurity Intrusion Detection",
    description: "AI-powered IDS system",
    skills: ["Python", "Scikit-learn", "TensorFlow"],
    members: 4,
    status: "active",
    details: `
      Detects abnormal network patterns with deep learning anomaly detection models, trained on NSL-KDD dataset.
    `,
  },
  15: {
    title: "AI Music Generator",
    description: "Deep Learning music composer",
    skills: ["Python", "TensorFlow", "Flask"],
    members: 2,
    status: "recruiting",
    details: `
      Generates new melodies using LSTMs trained on MIDI datasets. Deployed with a web interface for 
      users to generate songs.
    `,
  },
  16: {
    title: "Healthcare Chatbot",
    description: "AI-powered medical assistant",
    skills: ["Dialogflow", "React", "Firebase"],
    members: 5,
    status: "active",
    details: `
      Provides basic health advice, symptom checking, and appointment booking using NLP models 
      integrated with Dialogflow.
    `,
  },
  17: {
    title: "Augmented Reality Furniture App",
    description: "AR-based shopping experience",
    skills: ["React Native", "ARKit", "Three.js"],
    members: 3,
    status: "active",
    details: `
      Allows users to visualize furniture in their rooms using ARKit/ARCore with a React Native frontend.
    `,
  },
  18: {
    title: "AI-Powered Fraud Detection",
    description: "Banking fraud prevention system",
    skills: ["Python", "PyTorch", "Big Data"],
    members: 4,
    status: "active",
    details: `
      Analyzes transactions in real time with anomaly detection ML models to flag fraudulent activity.
    `,
  },
  19: {
    title: "Voice Recognition Assistant",
    description: "Speech-to-text AI assistant",
    skills: ["Python", "DeepSpeech", "NLP"],
    members: 3,
    status: "recruiting",
    details: `
      Implements voice-controlled assistant with DeepSpeech and NLP integration for task automation.
    `,
  },
  20: {
    title: "Cloud File Sharing Platform",
    description: "Decentralized cloud storage",
    skills: ["IPFS", "React", "Node.js"],
    members: 5,
    status: "active",
    details: `
      Implements peer-to-peer file storage using IPFS with user authentication and encryption.
    `,
  },
  21: {
    title: "AI-Powered Interview Platform",
    description: "Mock interviews with AI feedback",
    skills: ["React", "OpenAI API", "Node.js"],
    members: 3,
    status: "active",
    details: `
      Conducts mock interviews and provides AI-driven analysis on communication, coding, and problem-solving.
    `,
  },
  22: {
    title: "Self-Driving Car Simulation",
    description: "Reinforcement Learning in action",
    skills: ["Unity", "C#", "Reinforcement Learning"],
    members: 6,
    status: "recruiting",
    details: `
      Simulates autonomous driving in Unity with deep reinforcement learning for path planning 
      and decision-making.
    `,
  },
  23: {
    title: "AI Fashion Recommender",
    description: "Personalized clothing suggestions",
    skills: ["Python", "TensorFlow", "React"],
    members: 4,
    status: "active",
    details: `
      Uses CNNs and collaborative filtering to suggest clothing items based on user style preferences.
    `,
  },
  24: {
    title: "Online Code Collaboration Tool",
    description: "Real-time collaborative IDE",
    skills: ["React", "Node.js", "WebRTC"],
    members: 5,
    status: "active",
    details: `
      Implements a cloud-based collaborative coding platform with real-time editing, compiling, 
      and debugging features.
    `,
  },
  25: {
    title: "AI-Powered Video Summarizer",
    description: "Condenses long videos into highlights",
    skills: ["Python", "OpenCV", "Transformers"],
    members: 3,
    status: "recruiting",
    details: `
      Extracts key frames and generates summaries from long videos using CNN + NLP models.
    `,
  },
  26: {
    title: "IoT Smart Agriculture",
    description: "Precision farming with IoT sensors",
    skills: ["IoT", "Python", "Cloud"],
    members: 6,
    status: "active",
    details: `
      Uses soil sensors, weather APIs, and ML predictions for irrigation and crop yield optimization.
    `,
  },
  27: {
    title: "AI Cybersecurity Assistant",
    description: "Threat detection & response AI",
    skills: ["Python", "ELK Stack", "ML"],
    members: 5,
    status: "active",
    details: `
      Analyzes logs and alerts for cyberattacks, providing AI-driven insights to SOC teams.
    `,
  },
};


const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];

  if (!project) {
    return <div className="text-center text-gray-400">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-6 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <p className="text-gray-400">Status: {project.status}</p>
        <p className="text-gray-400">Members: {project.members}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Skills:</h3>
          <div className="flex flex-wrap">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Project Details:
          </h3>
          <p className="text-gray-300 whitespace-pre-line">{project.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
