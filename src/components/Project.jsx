import React, { useState } from "react";
import { FiGitBranch, FiPlus, FiSearch, FiX, FiUsers, FiMail, FiMessageSquare } from "react-icons/fi";

const Project = () => {
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
    },
    {
      id: 4,
      title: "Task Manager",
      description: "Kanban-style productivity tool",
      details:
        "A Trello-like task manager for teams with drag-and-drop boards, real-time updates, and team collaboration features.",
      skills: ["Vue.js", "Express", "MongoDB"],
      members: 5,
      status: "recruiting",
    },
    {
      id: 5,
      title: "Crypto Tracker",
      description: "Live cryptocurrency prices and charts",
      details:
        "A dashboard to monitor cryptocurrency prices, historical trends, and news. Built using React, Chart.js, and external APIs.",
      skills: ["React", "Chart.js", "REST APIs"],
      members: 3,
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    details: "",
    skills: "",
    members: "",
    status: "active",
  });

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
    });
    setIsModalOpen(false);
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
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
              onClick={() => openProjectDetails(project)}
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-200"
              >
                <FiX size={20} />
              </button>
            </div>

            <p className="text-gray-300 mb-4">{selectedProject.details}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-gray-400">👥 {selectedProject.members} team members</p>
            <p className="mt-2">
              Status:{" "}
              <span
                className={`$${
                  selectedProject.status === "active"
                    ? "text-green-400"
                    : "text-blue-400"
                }`}
              >
                {selectedProject.status}
              </span>
            </p>

            {/* Communication Options */}
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
              <div className="flex gap-3">
                <a
                  href={`mailto:vikas83pal@gmail.com?subject=Inquiry about ${selectedProject.title}`}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiMail /> Mail
                </a>
                <a
                  href="https://discord.gg/BsGRPKfg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiMessageSquare /> Discord
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
