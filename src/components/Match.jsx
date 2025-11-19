import React, { useState, useEffect } from "react";
import { FiUsers, FiFilter, FiSearch, FiX, FiMail, FiGithub, FiLinkedin, FiSend, FiStar, FiMessageCircle, FiCheck, FiArrowRight, FiTarget } from "react-icons/fi";




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
      experience: "5 years",
      hourlyRate: "$50-60/hr",
      timezone: "EST",
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
      experience: "7 years",
      hourlyRate: "$60-75/hr",
      timezone: "PST",
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
      experience: "6 years",
      hourlyRate: "$65-80/hr",
      timezone: "CST",
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
      experience: "4 years",
      hourlyRate: "$45-55/hr",
      timezone: "EST",
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

  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("devmatch_filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          role: "",
          availability: "",
          minScore: 80,
          searchTerm: "",
        };
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const savedChats = localStorage.getItem("devmatch_chats");
    return savedChats ? JSON.parse(savedChats) : {};
  });

  const [userMessage, setUserMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("devmatch_favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [sortBy, setSortBy] = useState(() => {
    const savedSort = localStorage.getItem("devmatch_sort");
    return savedSort || "match";
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devmatch_filters", JSON.stringify(filters));
  }, [filters]);

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devmatch_chats", JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devmatch_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save sort preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("devmatch_sort", sortBy);
  }, [sortBy]);

  const filteredDevelopers = developers
    .filter((dev) => {
      return (
        dev.matchScore >= filters.minScore &&
        (filters.role === "" || dev.role.toLowerCase().includes(filters.role.toLowerCase())) &&
        (filters.availability === "" || dev.availability === filters.availability) &&
        (filters.searchTerm === "" || 
          dev.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          dev.skills.some(s => s.toLowerCase().includes(filters.searchTerm.toLowerCase())))
      );
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.matchScore - a.matchScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleProfileClick = (developer) => {
    setSelectedDeveloper(developer);
  };

  const toggleFavorite = (devId) => {
    setFavorites((prev) =>
      prev.includes(devId) ? prev.filter((id) => id !== devId) : [...prev, devId]
    );
  };

  const isFavorite = (devId) => favorites.includes(devId);

  const handleSendMessage = async (dev) => {
    if (!userMessage.trim()) return;

    setChatMessages((prev) => ({
      ...prev,
      [dev.id]: [
        ...(prev[dev.id] || []),
        { sender: "user", text: userMessage, timestamp: new Date() },
      ],
    }));

    setUserMessage("");
    setAiLoading(true);

    const aiResponse = await getAIResponse(userMessage, dev);

    setChatMessages((prev) => ({
      ...prev,
      [dev.id]: [
        ...(prev[dev.id] || []),
        { sender: "dev", text: aiResponse, timestamp: new Date() },
      ],
    }));

    setAiLoading(false);
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all saved data? This includes chats, favorites, and filter preferences.")) {
      localStorage.removeItem("devmatch_filters");
      localStorage.removeItem("devmatch_chats");
      localStorage.removeItem("devmatch_favorites");
      localStorage.removeItem("devmatch_sort");
      
      // Reset state
      setFilters({
        role: "",
        availability: "",
        minScore: 80,
        searchTerm: "",
      });
      setChatMessages({});
      setFavorites([]);
      setSortBy("match");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <FiTarget className="text-white w-8 h-8" />
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Find Your Match
                </span>
              </h1>
              <p className="text-gray-400 text-lg">Discover talented developers with 95%+ accuracy matching</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-400">{filteredDevelopers.length}</div>
              <p className="text-gray-400">Available Matches</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 p-4 rounded-lg border border-indigo-400/30 backdrop-blur">
              <p className="text-indigo-300 text-sm font-semibold">Active Developers</p>
              <p className="text-2xl font-bold text-white">{developers.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-4 rounded-lg border border-purple-400/30 backdrop-blur">
              <p className="text-purple-300 text-sm font-semibold">Your Matches</p>
              <p className="text-2xl font-bold text-white">{filteredDevelopers.length}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 p-4 rounded-lg border border-pink-400/30 backdrop-blur">
              <p className="text-pink-300 text-sm font-semibold">Avg. Match Score</p>
              <p className="text-2xl font-bold text-white">91%</p>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Advanced Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Search by name or skills..."
                  className="w-full bg-gray-800/50 text-white rounded-lg pl-10 pr-4 py-2.5 border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/50 text-white rounded-lg px-3 py-2.5 border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
              >
                <option value="">All Roles</option>
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend Developer</option>
                <option value="Full-stack">Full-stack Developer</option>
                <option value="Designer">UI/UX Designer</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <select
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/50 text-white rounded-lg px-3 py-2.5 border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
              >
                <option value="">All Availability</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-800/50 text-white rounded-lg px-3 py-2.5 border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
              >
                <option value="match">Best Match</option>
                <option value="name">By Name</option>
              </select>
            </div>
          </div>

          {/* Score Slider */}
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Minimum Match Score</label>
              <span className="text-indigo-400 font-semibold">{filters.minScore}%</span>
            </div>
            <input
              type="range"
              name="minScore"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        {/* Developers Grid */}
        {filteredDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((dev) => (
              <div
                key={dev.id}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
                onClick={() => handleProfileClick(dev)}
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dev.id);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-indigo-600 transition"
                >
                  <FiStar
                    className={`w-5 h-5 ${
                      isFavorite(dev.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Match Score Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <FiCheck className="w-4 h-4" />
                  {dev.matchScore}% Match
                </div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition">
                    {dev.name}
                  </h3>
                  <p className="text-indigo-300 font-semibold text-sm mb-3">{dev.role}</p>

                  {/* Experience & Rate */}
                  <div className="flex justify-between text-xs text-gray-400 mb-3 pb-3 border-b border-gray-700/30">
                    <span>📅 {dev.experience}</span>
                    <span>💰 {dev.hourlyRate}</span>
                    <span>🌍 {dev.timezone}</span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-semibold">SKILLS</p>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-900/40 text-indigo-200 text-xs px-3 py-1 rounded-full border border-indigo-700/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">{dev.bio}</p>

                  {/* Availability Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 font-medium">Availability</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      dev.availability === "Full-time"
                        ? "bg-green-500/20 text-green-300"
                        : dev.availability === "Part-time"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {dev.availability}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveChat(dev);
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                    >
                      <FiMessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium border border-white/20 flex items-center justify-center gap-2 transition">
                      <FiArrowRight className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur">
              <FiSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Matches Found</h3>
              <p className="text-gray-400">Try adjusting your filters to find more developers</p>
            </div>
          </div>
        )}
      </div>

      {/* Developer Details Modal - Responsive */}
      {selectedDeveloper && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl text-white relative border-0 md:border border-white/10 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition z-10"
              onClick={() => setSelectedDeveloper(null)}
            >
              <FiX size={22} />
            </button>

            {/* Mobile Header Bar */}
            <div className="md:hidden flex justify-center py-2 sticky top-0 bg-gradient-to-b from-gray-900 to-transparent">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>

            <div className="p-6 md:p-8">
              {/* Header with Avatar */}
              <div className="mb-6 pb-6 border-b border-gray-700/50">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                    {selectedDeveloper.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold">{selectedDeveloper.name}</h2>
                    <p className="text-indigo-300 text-lg font-semibold">{selectedDeveloper.role}</p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      <span className="text-xs bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/30">
                        ⭐ {selectedDeveloper.matchScore}% Match
                      </span>
                      <span className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full border border-purple-400/30">
                        📅 {selectedDeveloper.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-indigo-400">About</h3>
                <p className="text-gray-300 leading-relaxed">{selectedDeveloper.bio}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDeveloper.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-900/40 text-indigo-200 px-4 py-2 rounded-full text-sm border border-indigo-700/30 hover:border-indigo-600 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 pb-6 border-b border-gray-700/50">
                <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 p-3 md:p-4 rounded-lg border border-indigo-400/30">
                  <p className="text-xs text-gray-400 mb-1">Availability</p>
                  <p className={`font-bold text-sm md:text-base ${
                    selectedDeveloper.availability === "Full-time"
                      ? "text-green-400"
                      : selectedDeveloper.availability === "Part-time"
                      ? "text-blue-400"
                      : "text-purple-400"
                  }`}>
                    {selectedDeveloper.availability}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 p-3 md:p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-xs text-gray-400 mb-1">Hourly Rate</p>
                  <p className="font-bold text-sm md:text-base text-yellow-400">{selectedDeveloper.hourlyRate}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 p-3 md:p-4 rounded-lg border border-pink-400/30">
                  <p className="text-xs text-gray-400 mb-1">Timezone</p>
                  <p className="font-bold text-sm md:text-base text-pink-400">🌍 {selectedDeveloper.timezone}</p>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Featured Projects</h3>
                <div className="space-y-3">
                  {selectedDeveloper.projects.map((proj, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-indigo-400/30 transition">
                      <h4 className="font-semibold text-indigo-300 mb-1 text-sm md:text-base">{proj.title}</h4>
                      <p className="text-sm text-gray-400">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedDeveloper.contacts.email && (
                    <a
                      href={`mailto:${selectedDeveloper.contacts.email}`}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 md:py-3 rounded-lg font-medium transition text-sm md:text-base"
                    >
                      <FiMail className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden md:inline">Email</span>
                    </a>
                  )}
                  {selectedDeveloper.contacts.github && (
                    <a
                      href={selectedDeveloper.contacts.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 md:py-3 rounded-lg font-medium transition text-sm md:text-base"
                    >
                      <FiGithub className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden md:inline">GitHub</span>
                    </a>
                  )}
                  {selectedDeveloper.contacts.linkedin && (
                    <a
                      href={selectedDeveloper.contacts.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 rounded-lg font-medium transition text-sm md:text-base"
                    >
                      <FiLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden md:inline">LinkedIn</span>
                    </a>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      setActiveChat(selectedDeveloper);
                      setSelectedDeveloper(null);
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold border-0 transition flex items-center justify-center gap-2"
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    Start Chat
                  </button>
                  <button 
                    onClick={() => setSelectedDeveloper(null)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold border border-white/20 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {activeChat && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full md:max-w-xl md:rounded-2xl rounded-t-3xl text-white relative border-0 md:border border-white/10 h-[90vh] md:h-auto md:max-h-[80vh] flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700/30 sticky top-0 bg-gradient-to-b from-gray-900 to-transparent flex-shrink-0">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold flex-shrink-0">
                  {activeChat.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm md:text-base truncate">{activeChat.name}</h3>
                  <p className="text-xs text-indigo-300">{activeChat.role}</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
                onClick={() => setActiveChat(null)}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {(chatMessages[activeChat.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-sm px-4 py-3 rounded-lg text-sm md:text-base ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
                        : "bg-white/10 text-gray-200 border border-white/20 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 border border-white/20 px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 md:p-6 border-t border-gray-700/30 bg-gradient-to-t from-gray-900 to-transparent flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(activeChat);
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-2 md:py-3 border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition text-sm md:text-base"
                />
                <button
                  onClick={() => handleSendMessage(activeChat)}
                  disabled={aiLoading || !userMessage.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <FiSend className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden md:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Match;
