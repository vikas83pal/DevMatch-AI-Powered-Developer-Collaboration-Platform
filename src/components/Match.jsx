import React, { useState } from "react";
import { FiUsers, FiFilter, FiSearch, FiX, FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";




// Simulated AI response
const getAIResponse = async (userMessage, dev) => {
  await new Promise((res) => setTimeout(res, 900));
  const msg = userMessage.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) {
    return `Hi! I'm ${dev.name}, a ${dev.role}. How can I help you today?`;
  }
  if (msg.includes("skills")) {
    return `My main skills are: ${dev.skills.join(", ")}.`;
  }
  if (msg.includes("available") || msg.includes("availability")) {
    return `I'm currently available for ${dev.availability} work.`;
  }
  if (msg.includes("experience")) {
    return `I have strong experience as a ${dev.role}. Ask me about my projects!`;
  }
  return `Thanks for your message! I am ${dev.name}, a ${dev.role}. Feel free to ask me about my experience, skills, or availability.`;
};

const Match = () => {
  const [developers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      skills: ["React", "JavaScript", "CSS"],
      availability: "Full-time",
      matchScore: 95,
      bio: "Frontend developer passionate about creating smooth, accessible UIs.",
      projects: [
        { title: "E-Commerce Store", description: "React-based store with Stripe payments." },
        { title: "Portfolio Website", description: "Personal site showcasing skills." },
      ],
      contacts: {
        email: "alice@example.com",
        github: "https://github.com/alice",
        linkedin: "https://linkedin.com/in/alice",
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB"],
      availability: "Part-time",
      matchScore: 88,
      bio: "Backend engineer experienced in scalable APIs and databases.",
      projects: [
        { title: "Task Manager API", description: "REST API with JWT auth." },
        { title: "Blog Platform", description: "Full backend for blogging system." },
      ],
      contacts: {
        email: "bob@example.com",
        github: "https://github.com/bobsmith",
        linkedin: "https://linkedin.com/in/bobsmith",
      },
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Full-stack Developer",
      skills: ["React", "Node.js", "GraphQL"],
      availability: "Full-time",
      matchScore: 92,
      bio: "Full-stack developer with expertise in GraphQL and modern stacks.",
      projects: [
        { title: "Chat App", description: "Real-time chat with WebSockets." },
        { title: "Recipe Finder", description: "GraphQL-powered recipe search app." },
      ],
      contacts: {
        email: "charlie@example.com",
        github: "https://github.com/charliebrown",
        linkedin: "https://linkedin.com/in/charliebrown",
      },
    },
    {
      id: 4,
      name: "Diana Prince",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      availability: "Contract",
      matchScore: 89,
      bio: "Creative UI/UX designer with a knack for user-centered design.",
      projects: [
        { title: "Banking Dashboard", description: "UI/UX design for finance app." },
        { title: "Travel Planner", description: "User flow and design prototypes." },
      ],
      contacts: {
        email: "diana@example.com",
        linkedin: "https://linkedin.com/in/dianaprince",
      },
    },
  ]);

  const [filters, setFilters] = useState({
    role: "",
    availability: "",
    minScore: 80,
  });

  // const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const filteredDevelopers = developers.filter((dev) => {
    return (
      dev.matchScore >= filters.minScore &&
      (filters.role === "" || dev.role.includes(filters.role)) &&
      (filters.availability === "" || dev.availability === filters.availability)
    );
  });



  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleProfileClick = (developer) => {
    setSelectedDeveloper(developer);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            <FiUsers className="inline mr-2 text-indigo-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Developer Matches
            </span>
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full-stack Developer">Full-stack Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="">All Availability</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <input
              type="number"
              name="minScore"
              value={filters.minScore}
              onChange={handleFilterChange}
              placeholder="Min Match Score"
              className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Developers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((dev) => (
            <div
              key={dev.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-400/50 transition duration-300"
            >
              <h3
                className="text-xl font-semibold text-white cursor-pointer"
                onClick={() => handleProfileClick(dev)}
              >
                {dev.name}
              </h3>
              <p className="text-gray-300">{dev.role}</p>
              <p className="text-gray-400">Skills: {dev.skills.join(", ")}</p>
              <p className="text-gray-400">Availability: {dev.availability}</p>
              <p className="text-gray-400">Match Score: {dev.matchScore}</p>
              
            </div>
          ))}
        </div>

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No developers match your current filters. Try adjusting your
            criteria.
          </div>
        )}
      </div>

      {/* Developer Details Modal */}
      {selectedDeveloper && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl max-w-2xl w-full text-white relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedDeveloper(null)}
            >
              <FiX size={22} />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedDeveloper.name}</h2>
            <p className="text-indigo-400 mb-2">{selectedDeveloper.role}</p>
            <p className="mb-4">{selectedDeveloper.bio}</p>
            <p className="text-gray-300">
              <strong>Skills:</strong> {selectedDeveloper.skills.join(", ")}
            </p>
            <p className="text-gray-300">
              <strong>Availability:</strong> {selectedDeveloper.availability}
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Match Score:</strong> {selectedDeveloper.matchScore}
            </p>

            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              {selectedDeveloper.projects.map((proj, idx) => (
                <li key={idx}>
                  <strong>{proj.title}:</strong> {proj.description}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <div className="flex space-x-4">
              {selectedDeveloper.contacts.email && (
                <a
                  href={`mailto:${selectedDeveloper.contacts.email}`}
                  className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  <FiMail />
                </a>
              )}
              {selectedDeveloper.contacts.github && (
                <a
                  href={selectedDeveloper.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <FiGithub />
                </a>
              )}
              {selectedDeveloper.contacts.linkedin && (
                <a
                  href={selectedDeveloper.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <FiLinkedin />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      {activeChat && (
        <ChatBox
          activeChat={activeChat}
          chatMessages={chatMessages}
          userMessage={userMessage}
          aiLoading={aiLoading}
          setUserMessage={setUserMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Match;
