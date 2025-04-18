import React, { useState } from 'react';
import { FiGitBranch, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

const Project = () => {
  const [projects, setProjects] = useState([
    {
      "id": 1,
      "title": "E-commerce Platform",
      "description": "Full-stack online store with React and Node.js",
      "skills": ["React", "Node.js", "MongoDB"],
      "members": 3,
      "status": "active"
    },
    {
      "id": 2,
      "title": "Portfolio Builder",
      "description": "AI-powered portfolio generator for developers",
      "skills": ["Next.js", "Tailwind", "OpenAI API"],
      "members": 2,
      "status": "recruiting"
    },
    {
      "id": 3,
      "title": "Task Manager",
      "description": "Collaborative project management tool",
      "skills": ["TypeScript", "Firebase", "React"],
      "members": 4,
      "status": "active"
    },
    {
      "id": 4,
      "title": "Social Media App",
      "description": "A platform for connecting with friends and sharing updates",
      "skills": ["React Native", "Node.js", "PostgreSQL"],
      "members": 5,
      "status": "active"
    },
    {
      "id": 5,
      "title": "Blog CMS",
      "description": "Content management system for blogging",
      "skills": ["WordPress", "PHP", "MySQL"],
      "members": 3,
      "status": "completed"
    },
    {
      "id": 6,
      "title": "Weather App",
      "description": "Real-time weather updates and forecasts",
      "skills": ["Vue.js", "API Integration", "CSS"],
      "members": 2,
      "status": "active"
    },
    {
      "id": 7,
      "title": "Chat Application",
      "description": "Real-time messaging platform",
      "skills": ["Socket.io", "React", "Node.js"],
      "members": 4,
      "status": "active"
    },
    {
      "id": 8,
      "title": "Fitness Tracker",
      "description": "Track workouts and monitor progress",
      "skills": ["React Native", "Firebase", "GraphQL"],
      "members": 3,
      "status": "recruiting"
    },
    {
      "id": 9,
      "title": "Online Learning Platform",
      "description": "E-learning platform with video courses",
      "skills": ["Angular", "Node.js", "MongoDB"],
      "members": 6,
      "status": "active"
    },
    {
      "id": 10,
      "title": "Expense Tracker",
      "description": "Track and manage personal expenses",
      "skills": ["React", "Redux", "Firebase"],
      "members": 2,
      "status": "completed"
    },
    {
      "id": 11,
      "title": "Travel Booking App",
      "description": "Book flights, hotels, and rental cars",
      "skills": ["React", "Node.js", "Stripe API"],
      "members": 5,
      "status": "active"
    },
    {
      "id": 12,
      "title": "Food Delivery App",
      "description": "Order food from local restaurants",
      "skills": ["Flutter", "Firebase", "Google Maps API"],
      "members": 4,
      "status": "active"
    },
    {
      "id": 13,
      "title": "Job Portal",
      "description": "Find and apply for jobs",
      "skills": ["React", "Node.js", "MongoDB"],
      "members": 3,
      "status": "recruiting"
    },
    {
      "id": 14,
      "title": "Event Management System",
      "description": "Plan and manage events",
      "skills": ["Laravel", "MySQL", "Bootstrap"],
      "members": 4,
      "status": "active"
    },
    {
      "id": 15,
      "title": "E-book Reader",
      "description": "Read and manage e-books",
      "skills": ["React Native", "Redux", "Firebase"],
      "members": 2,
      "status": "completed"
    },
    {
      "id": 16,
      "title": "Music Streaming App",
      "description": "Stream and download music",
      "skills": ["React", "Node.js", "AWS S3"],
      "members": 5,
      "status": "active"
    },
    {
      "id": 17,
      "title": "AI Chatbot",
      "description": "AI-powered chatbot for customer support",
      "skills": ["Python", "TensorFlow", "Flask"],
      "members": 3,
      "status": "active"
    },
    {
      "id": 18,
      "title": "Online Quiz App",
      "description": "Take quizzes and track scores",
      "skills": ["React", "Firebase", "TypeScript"],
      "members": 2,
      "status": "completed"
    },
    {
      "id": 19,
      "title": "Stock Market Tracker",
      "description": "Track stock prices and trends",
      "skills": ["React", "Node.js", "D3.js"],
      "members": 4,
      "status": "active"
    },
    {
      "id": 20,
      "title": "Recipe App",
      "description": "Find and share recipes",
      "skills": ["Vue.js", "Firebase", "CSS"],
      "members": 3,
      "status": "recruiting"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            
            <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
              <FiPlus />
              <span className="hidden md:inline">New Project</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
            All Projects
          </button>
          <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg text-sm flex items-center">
            <FiFilter className="mr-2" />
            Filters
          </button>
          <span className="text-gray-400 text-sm hidden md:block">
            Showing {filteredProjects.length} projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-400/50 transition duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'active' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-blue-900/30 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                {project.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-indigo-900/30 text-indigo-300 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{project.members} members</span>
                <button className="text-indigo-400 hover:text-indigo-300">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No projects found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;