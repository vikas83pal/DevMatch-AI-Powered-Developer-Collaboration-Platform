import React, { useState, useEffect } from 'react';
import './AIAssessment.css';

const AIAssessment = ({ assessmentId, candidateId, onComplete }) => {
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [codeValue, setCodeValue] = useState('');

  useEffect(() => {
    loadAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && status === 'in_progress') {
      const timer = setTimeout(() => setTimeRemaining(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, status]);

  const loadAssessment = async () => {
    // Mock assessment data
    const mockAssessment = {
      id: assessmentId || 'asmt_1',
      title: 'Full Stack Developer Assessment',
      description: 'Evaluate your technical skills across frontend, backend, and system design.',
      config: { duration: 60, passingScore: 70 },
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          difficulty: 'medium',
          points: 25,
          content: {
            question: 'What is the time complexity of binary search?',
            options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
            correctAnswer: 1
          }
        },
        {
          id: 'q2',
          type: 'mcq',
          difficulty: 'medium',
          points: 25,
          content: {
            question: 'Which React hook is used for side effects?',
            options: ['useState', 'useEffect', 'useContext', 'useReducer'],
            correctAnswer: 1
          }
        },
        {
          id: 'q3',
          type: 'coding',
          difficulty: 'medium',
          points: 100,
          content: {
            title: 'Two Sum',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
            starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
            testCases: [
              { input: '[2,7,11,15], 9', output: '[0,1]' },
              { input: '[3,2,4], 6', output: '[1,2]' }
            ],
            language: 'javascript'
          }
        },
        {
          id: 'q4',
          type: 'essay',
          difficulty: 'medium',
          points: 50,
          content: {
            question: 'Describe how you would design a URL shortening service like bit.ly. Include database design, API endpoints, and scalability considerations.',
            minWords: 150,
            maxWords: 500
          }
        }
      ],
      skillsTested: ['JavaScript', 'React', 'Algorithms', 'System Design']
    };

    setAssessment(mockAssessment);
    setTimeRemaining(mockAssessment.config.duration * 60);
    setCodeValue(mockAssessment.questions.find(q => q.type === 'coding')?.content.starterCode || '');
    setStatus('ready');
  };

  const startAssessment = () => {
    setStatus('in_progress');
  };

  const handleMCQAnswer = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleCodeAnswer = (questionId, code) => {
    setCodeValue(code);
    setAnswers({ ...answers, [questionId]: code });
  };

  const handleEssayAnswer = (questionId, text) => {
    setAnswers({ ...answers, [questionId]: text });
  };

  const nextQuestion = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      const nextQ = assessment.questions[currentQuestion + 1];
      if (nextQ.type === 'coding') {
        setCodeValue(answers[nextQ.id] || nextQ.content.starterCode);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(c => c - 1);
      const prevQ = assessment.questions[currentQuestion - 1];
      if (prevQ.type === 'coding') {
        setCodeValue(answers[prevQ.id] || prevQ.content.starterCode);
      }
    }
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, response]) => ({
        questionId,
        response,
        timeSpent: 60 // Mock time spent
      }));

      const response = await fetch(`http://localhost:5000/api/assessments/assessments/${assessment.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          answers: formattedAnswers
        })
      });

      const data = await response.json();
      
      // Use mock result if API fails
      const mockResult = {
        scores: {
          total: 175,
          percentage: 87.5,
          passed: true,
          bySkill: [
            { skill: 'JavaScript', level: 'advanced', confidence: 85 },
            { skill: 'React', level: 'advanced', confidence: 90 },
            { skill: 'Algorithms', level: 'intermediate', confidence: 75 },
            { skill: 'System Design', level: 'advanced', confidence: 82 }
          ]
        },
        predictions: {
          jobSuccessProbability: 89,
          retentionProbability: 85,
          performanceLevel: 'above_average',
          strengthAreas: ['Frontend Development', 'React Ecosystem', 'Code Quality'],
          improvementAreas: ['Algorithm Optimization', 'Database Design'],
          recommendedRole: 'Senior Frontend Developer',
          confidence: 87
        },
        behavioralInsights: {
          problemSolvingStyle: 'Analytical & Methodical',
          communicationStyle: 'Clear & Detailed',
          workPreferences: ['Remote', 'Collaborative', 'Agile'],
          teamFit: 88
        }
      };

      setResult(data.success ? data.data : mockResult);
      setStatus('completed');
      onComplete?.(data.success ? data.data : mockResult);
    } catch (error) {
      console.error('Submit failed:', error);
      setStatus('completed');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / assessment?.questions.length) * 100;
  };

  if (status === 'loading') {
    return (
      <div className="ai-assessment loading">
        <div className="loader"></div>
        <p>Loading assessment...</p>
      </div>
    );
  }

  if (status === 'ready') {
    return (
      <div className="ai-assessment">
        <div className="assessment-intro">
          <div className="intro-icon">📝</div>
          <h1>{assessment.title}</h1>
          <p className="intro-description">{assessment.description}</p>
          
          <div className="assessment-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{assessment.config.duration} minutes</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📊</span>
              <span>{assessment.questions.length} questions</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">✅</span>
              <span>{assessment.config.passingScore}% to pass</span>
            </div>
          </div>

          <div className="skills-tested">
            <h4>Skills Tested</h4>
            <div className="skill-tags">
              {assessment.skillsTested.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="assessment-rules">
            <h4>Before You Begin</h4>
            <ul>
              <li>Ensure you have a stable internet connection</li>
              <li>The timer starts once you begin</li>
              <li>You can navigate between questions</li>
              <li>AI will evaluate your responses in real-time</li>
            </ul>
          </div>

          <button className="start-btn" onClick={startAssessment}>
            🚀 Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (status === 'completed' && result) {
    return (
      <div className="ai-assessment">
        <div className="assessment-results">
          <div className="result-header">
            <div className={`result-badge ${result.scores.passed ? 'passed' : 'failed'}`}>
              {result.scores.passed ? '🎉 Passed!' : '📚 Keep Practicing'}
            </div>
            <h1>Assessment Complete</h1>
          </div>

          <div className="score-overview">
            <div className="main-score">
              <div className="score-circle">
                <span className="score-value">{result.scores.percentage}%</span>
                <span className="score-label">Overall Score</span>
              </div>
            </div>

            <div className="prediction-cards">
              <div className="prediction-card">
                <span className="prediction-value">{result.predictions.jobSuccessProbability}%</span>
                <span className="prediction-label">Job Success Probability</span>
              </div>
              <div className="prediction-card">
                <span className="prediction-value">{result.predictions.retentionProbability}%</span>
                <span className="prediction-label">Retention Probability</span>
              </div>
              <div className="prediction-card">
                <span className="prediction-value">{result.behavioralInsights.teamFit}%</span>
                <span className="prediction-label">Team Fit Score</span>
              </div>
            </div>
          </div>

          <div className="skills-breakdown">
            <h3>Skills Assessment</h3>
            <div className="skill-bars">
              {result.scores.bySkill.map(skill => (
                <div key={skill.skill} className="skill-bar-item">
                  <div className="skill-bar-header">
                    <span className="skill-name">{skill.skill}</span>
                    <span className={`skill-level ${skill.level}`}>{skill.level}</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-bar-fill" 
                      style={{ width: `${skill.confidence}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="insights-grid">
            <div className="insight-card strengths">
              <h4>💪 Strengths</h4>
              <ul>
                {result.predictions.strengthAreas.map(area => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="insight-card improvements">
              <h4>📈 Areas to Improve</h4>
              <ul>
                {result.predictions.improvementAreas.map(area => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div className="insight-card behavioral">
              <h4>🧠 Behavioral Insights</h4>
              <div className="behavioral-items">
                <div className="behavioral-item">
                  <span className="label">Problem Solving:</span>
                  <span className="value">{result.behavioralInsights.problemSolvingStyle}</span>
                </div>
                <div className="behavioral-item">
                  <span className="label">Communication:</span>
                  <span className="value">{result.behavioralInsights.communicationStyle}</span>
                </div>
              </div>
            </div>

            <div className="insight-card recommendation">
              <h4>🎯 AI Recommendation</h4>
              <p className="recommended-role">{result.predictions.recommendedRole}</p>
              <p className="confidence">Confidence: {result.predictions.confidence}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = assessment?.questions[currentQuestion];

  return (
    <div className="ai-assessment in-progress">
      {/* Header */}
      <div className="assessment-header">
        <div className="timer">
          <span className={`time ${timeRemaining < 300 ? 'warning' : ''}`}>
            ⏱️ {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }} />
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className="question-container">
        <div className="question-header">
          <span className={`difficulty ${question.difficulty}`}>
            {question.difficulty}
          </span>
          <span className="points">{question.points} points</span>
        </div>

        {question.type === 'mcq' && (
          <div className="mcq-question">
            <h2>{question.content.question}</h2>
            <div className="options">
              {question.content.options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${answers[question.id] === index ? 'selected' : ''}`}
                  onClick={() => handleMCQAnswer(question.id, index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {question.type === 'coding' && (
          <div className="coding-question">
            <h2>{question.content.title}</h2>
            <p className="code-description">{question.content.description}</p>
            
            <div className="code-editor">
              <div className="editor-header">
                <span>{question.content.language}</span>
              </div>
              <textarea
                className="code-textarea"
                value={codeValue}
                onChange={(e) => handleCodeAnswer(question.id, e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="test-cases">
              <h4>Test Cases</h4>
              {question.content.testCases.map((tc, i) => (
                <div key={i} className="test-case">
                  <span>Input: {tc.input}</span>
                  <span>Expected: {tc.output}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {question.type === 'essay' && (
          <div className="essay-question">
            <h2>{question.content.question}</h2>
            <textarea
              className="essay-textarea"
              value={answers[question.id] || ''}
              onChange={(e) => handleEssayAnswer(question.id, e.target.value)}
              placeholder="Write your answer here..."
            />
            <div className="word-count">
              Words: {(answers[question.id] || '').split(/\s+/).filter(w => w).length} / {question.content.minWords}-{question.content.maxWords}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="question-navigation">
        <button 
          className="nav-btn prev" 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        
        <div className="question-dots">
          {assessment.questions.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentQuestion ? 'active' : ''} ${answers[assessment.questions[i].id] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQuestion(i)}
            />
          ))}
        </div>

        {currentQuestion === assessment.questions.length - 1 ? (
          <button className="nav-btn submit" onClick={handleSubmit}>
            Submit Assessment
          </button>
        ) : (
          <button className="nav-btn next" onClick={nextQuestion}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default AIAssessment;
