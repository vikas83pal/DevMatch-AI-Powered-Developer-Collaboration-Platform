import React, { useState, useEffect } from 'react';
import './CandidateFilter.css';

const CandidateFilter = ({ onFilterChange, onSearch }) => {
  const [filters, setFilters] = useState({
    skills: [],
    minSkillLevel: '',
    minExperience: '',
    remotePreference: '',
    availabilityStatus: '',
    salaryMin: '',
    salaryMax: '',
    verifiedOnly: false,
    query: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const remoteOptions = ['remote', 'hybrid', 'onsite', 'flexible'];
  const availabilityOptions = ['actively_looking', 'open_to_offers', 'not_looking'];

  const popularSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Go'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const addSkill = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      const newSkills = [...filters.skills, skill];
      handleFilterChange('skills', newSkills);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    const newSkills = filters.skills.filter(s => s !== skill);
    handleFilterChange('skills', newSkills);
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      skills: [],
      minSkillLevel: '',
      minExperience: '',
      remotePreference: '',
      availabilityStatus: '',
      salaryMin: '',
      salaryMax: '',
      verifiedOnly: false,
      query: ''
    };
    setFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  };

  return (
    <div className="candidate-filter">
      {/* Search Bar */}
      <div className="filter-search-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search candidates by name, skills, or role..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 4h18M3 12h18M3 20h18" />
          </svg>
          Filters
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="filter-expanded">
          {/* Skills Filter */}
          <div className="filter-section">
            <h4>Skills</h4>
            <div className="skill-input-wrapper">
              <input
                type="text"
                placeholder="Add skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill(skillInput)}
              />
              <button onClick={() => addSkill(skillInput)}>Add</button>
            </div>
            <div className="popular-skills">
              {popularSkills.map(skill => (
                <button
                  key={skill}
                  className={`skill-tag ${filters.skills.includes(skill) ? 'active' : ''}`}
                  onClick={() => filters.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
            {filters.skills.length > 0 && (
              <div className="selected-skills">
                <span>Selected:</span>
                {filters.skills.map(skill => (
                  <span key={skill} className="selected-skill">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skill Level */}
          <div className="filter-section">
            <h4>Minimum Skill Level</h4>
            <div className="level-options">
              {skillLevels.map(level => (
                <button
                  key={level}
                  className={`level-btn ${filters.minSkillLevel === level ? 'active' : ''}`}
                  onClick={() => handleFilterChange('minSkillLevel', filters.minSkillLevel === level ? '' : level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="filter-section">
            <h4>Minimum Experience (Years)</h4>
            <input
              type="range"
              min="0"
              max="15"
              value={filters.minExperience || 0}
              onChange={(e) => handleFilterChange('minExperience', e.target.value)}
            />
            <span className="range-value">{filters.minExperience || 0}+ years</span>
          </div>

          {/* Remote Preference */}
          <div className="filter-section">
            <h4>Work Preference</h4>
            <div className="option-buttons">
              {remoteOptions.map(option => (
                <button
                  key={option}
                  className={`option-btn ${filters.remotePreference === option ? 'active' : ''}`}
                  onClick={() => handleFilterChange('remotePreference', filters.remotePreference === option ? '' : option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="filter-section">
            <h4>Availability Status</h4>
            <select
              value={filters.availabilityStatus}
              onChange={(e) => handleFilterChange('availabilityStatus', e.target.value)}
            >
              <option value="">All</option>
              {availabilityOptions.map(option => (
                <option key={option} value={option}>
                  {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Range */}
          <div className="filter-section">
            <h4>Salary Range (USD)</h4>
            <div className="salary-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.salaryMin}
                onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.salaryMax}
                onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
              />
            </div>
          </div>

          {/* Verified Only */}
          <div className="filter-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
              />
              <span className="checkmark"></span>
              Verified skills only
            </label>
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <button className="clear-btn" onClick={clearFilters}>
              Clear All
            </button>
            <button className="apply-btn" onClick={handleSearch}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateFilter;
