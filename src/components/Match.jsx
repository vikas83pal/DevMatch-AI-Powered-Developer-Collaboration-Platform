import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiFilter, FiSearch, FiSend } from 'react-icons/fi';
import ChatBox from './ChatBox';

// Simulated AI response (replace with real backend or LLM API later)
const getAIResponse = async (userMessage, dev) => {
  await new Promise((res) => setTimeout(res, 900));
  const msg = userMessage.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi')) {
    return `Hi! I'm ${dev.name}, a ${dev.role}. How can I help you today?`;
  }
  if (msg.includes('skills')) {
    return `My main skills are: ${dev.skills.join(', ')}.`;
  }
  if (msg.includes('available') || msg.includes('availability')) {
    return `I'm currently available for ${dev.availability} work.`;
  }
  if (msg.includes('experience')) {
    return `I have strong experience as a ${dev.role}. Ask me about my projects!`;
  }
  return `Thanks for your message! I am ${dev.name}, a ${dev.role}. Feel free to ask me about my experience, skills, or availability.`;
};

const Match = () => {
  const [developers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      skills: ['React', 'JavaScript', 'CSS'],
      availability: 'Full-time',
      matchScore: 95,
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Backend Developer',
      skills: ['Node.js', 'Express', 'MongoDB'],
      availability: 'Part-time',
      matchScore: 88,
    },
    {
      id: 3,
      name: 'Charlie Brown',
      role: 'Full-stack Developer',
      skills: ['React', 'Node.js', 'GraphQL'],
      availability: 'Full-time',
      matchScore: 92,
    },
  ]);

  const [filters, setFilters] = useState({
    role: '',
    availability: '',
    minScore: 80,
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  const filteredDevelopers = developers.filter((dev) => {
    return (
      dev.matchScore >= filters.minScore &&
      (filters.role === '' || dev.role.includes(filters.role)) &&
      (filters.availability === '' || dev.availability === filters.availability)
    );
  });

  const handleSendMessage = async () => {
    if (!userMessage.trim() || !activeChat) return;
    setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);
    setAiLoading(true);

    const aiReply = await getAIResponse(userMessage, activeChat);

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'ai', text: aiReply },
    ]);
    setAiLoading(false);
    setUserMessage('');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleProfileClick = (developerId) => {
    navigate(`/profile/${developerId}`);
  };

  const handleChatClick = (developer) => {
    setActiveChat(developer);
    setChatMessages([
      {
        sender: 'ai',
        text: `👋 Hello! I'm ${developer.name}, your AI-powered assistant. Ask me anything about my skills, experience, or availability!`,
      },
    ]);
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
          <div className="flex space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-4 pr-10 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none w-full"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
              <FiFilter className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
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
                onClick={() => handleProfileClick(dev.id)}
              >
                {dev.name}
              </h3>
              <p className="text-gray-300">{dev.role}</p>
              <p className="text-gray-400">Skills: {dev.skills.join(', ')}</p>
              <p className="text-gray-400">Availability: {dev.availability}</p>
              <p className="text-gray-400">Match Score: {dev.matchScore}</p>
              <button
                onClick={() => handleChatClick(dev)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Chat
              </button>
            </div>
          ))}
        </div>

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No developers match your current filters. Try adjusting your criteria.
          </div>
        )}
      </div>

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
