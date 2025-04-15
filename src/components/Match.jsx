import React, { useState } from 'react';
import { FiUser, FiUsers, FiMessageSquare, FiGitBranch, FiStar, FiFilter, FiSearch } from 'react-icons/fi';

const Match = () => {
  const [developers, setDevelopers] = useState([
    
      {
        "id": 1,
        "name": "Alex Chen",
        "role": "Frontend Developer",
        "skills": ["React", "TypeScript", "UI/UX"],
        "matchScore": 92,
        "availability": "Full-time",
        "rate": "$75/hour"
      },
      {
        "id": 2,
        "name": "Sam Rodriguez",
        "role": "Backend Engineer",
        "skills": ["Node.js", "Python", "AWS"],
        "matchScore": 87,
        "availability": "Part-time",
        "rate": "$90/hour"
      },
      {
        "id": 3,
        "name": "Taylor Smith",
        "role": "Full Stack Developer",
        "skills": ["React", "GraphQL", "Docker"],
        "matchScore": 95,
        "availability": "Full-time",
        "rate": "$110/hour"
      },
      {
        "id": 4,
        "name": "Jordan Lee",
        "role": "Frontend Developer",
        "skills": ["React", "JavaScript", "CSS"],
        "matchScore": 89,
        "availability": "Full-time",
        "rate": "$70/hour"
      },
      {
        "id": 5,
        "name": "Taylor Brown",
        "role": "Backend Engineer",
        "skills": ["Node.js", "MongoDB", "Express"],
        "matchScore": 85,
        "availability": "Part-time",
        "rate": "$80/hour"
      },
      {
        "id": 6,
        "name": "Chris Wilson",
        "role": "Full Stack Developer",
        "skills": ["React", "Node.js", "GraphQL"],
        "matchScore": 93,
        "availability": "Full-time",
        "rate": "$100/hour"
      },
      {
        "id": 7,
        "name": "Jamie Garcia",
        "role": "Frontend Developer",
        "skills": ["Vue.js", "TypeScript", "UI/UX"],
        "matchScore": 88,
        "availability": "Full-time",
        "rate": "$72/hour"
      },
      {
        "id": 8,
        "name": "Morgan Davis",
        "role": "Backend Engineer",
        "skills": ["Python", "Django", "PostgreSQL"],
        "matchScore": 90,
        "availability": "Part-time",
        "rate": "$85/hour"
      },
      {
        "id": 9,
        "name": "Taylor White",
        "role": "Full Stack Developer",
        "skills": ["Angular", "Node.js", "Docker"],
        "matchScore": 94,
        "availability": "Full-time",
        "rate": "$105/hour"
      },
      {
        "id": 10,
        "name": "Alex Green",
        "role": "Frontend Developer",
        "skills": ["React", "Redux", "JavaScript"],
        "matchScore": 91,
        "availability": "Full-time",
        "rate": "$78/hour"
      },
      {
        "id": 11,
        "name": "Sam Blue",
        "role": "Backend Engineer",
        "skills": ["Node.js", "AWS", "Kubernetes"],
        "matchScore": 86,
        "availability": "Part-time",
        "rate": "$88/hour"
      },
      {
        "id": 12,
        "name": "Jordan Black",
        "role": "Full Stack Developer",
        "skills": ["React", "Node.js", "GraphQL"],
        "matchScore": 96,
        "availability": "Full-time",
        "rate": "$115/hour"
      },
      {
        "id": 13,
        "name": "Chris Brown",
        "role": "Frontend Developer",
        "skills": ["React", "TypeScript", "UI/UX"],
        "matchScore": 90,
        "availability": "Full-time",
        "rate": "$74/hour"
      },
      {
        "id": 14,
        "name": "Jamie White",
        "role": "Backend Engineer",
        "skills": ["Python", "Flask", "PostgreSQL"],
        "matchScore": 89,
        "availability": "Part-time",
        "rate": "$82/hour"
      },
      {
        "id": 15,
        "name": "Morgan Black",
        "role": "Full Stack Developer",
        "skills": ["React", "Node.js", "Docker"],
        "matchScore": 92,
        "availability": "Full-time",
        "rate": "$98/hour"
      },
      {
        "id": 16,
        "name": "Taylor Green",
        "role": "Frontend Developer",
        "skills": ["Vue.js", "JavaScript", "CSS"],
        "matchScore": 87,
        "availability": "Full-time",
        "rate": "$68/hour"
      },
      {
        "id": 17,
        "name": "Alex White",
        "role": "Backend Engineer",
        "skills": ["Node.js", "MongoDB", "Express"],
        "matchScore": 84,
        "availability": "Part-time",
        "rate": "$78/hour"
      },
      {
        "id": 18,
        "name": "Sam Green",
        "role": "Full Stack Developer",
        "skills": ["React", "Node.js", "GraphQL"],
        "matchScore": 95,
        "availability": "Full-time",
        "rate": "$110/hour"
      },
      {
        "id": 19,
        "name": "Jordan Blue",
        "role": "Frontend Developer",
        "skills": ["React", "Redux", "JavaScript"],
        "matchScore": 89,
        "availability": "Full-time",
        "rate": "$76/hour"
      },
      {
        "id": 20,
        "name": "Chris Green",
        "role": "Backend Engineer",
        "skills": ["Python", "Django", "AWS"],
        "matchScore": 88,
        "availability": "Part-time",
        "rate": "$84/hour"
      }
    

  ]);

  const [filters, setFilters] = useState({
    role: '',
    availability: '',
    minScore: 80,
  });

  const filteredDevelopers = developers.filter((dev) => {
    return (
      dev.matchScore >= filters.minScore &&
      (filters.role === '' || dev.role.includes(filters.role)) &&
      (filters.availability === '' || dev.availability === filters.availability)
    );
  });

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

        {/* Match Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All Roles</option>
                <option>Frontend Developer</option>
                <option>Backend Engineer</option>
                <option>Full Stack Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Any Availability</option>
                <option>Full-time</option>
                <option>Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Minimum Match: {filters.minScore}%
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={filters.minScore}
                onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((dev) => (
            <div
              key={dev.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-400/50 transition duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-white font-bold mr-4">
                    {dev.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{dev.name}</h3>
                    <p className="text-indigo-300 text-sm">{dev.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="text-white font-bold">{dev.matchScore}%</span>
                </div>
              </div>

              <div className="mb-4">
                {dev.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-indigo-900/30 text-indigo-300 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{dev.availability}</span>
                <span>{dev.rate}</span>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                  <FiMessageSquare className="inline mr-2" /> Message
                </button>
                <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
                  <FiUser className="inline mr-2" /> Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No developers match your current filters. Try adjusting your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
