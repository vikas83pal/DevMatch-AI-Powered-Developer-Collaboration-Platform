/**
 * FEATURE 7: AI-Driven Predictive Assessments
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();

let assessments = [];
let assessmentResults = [];

// Sample questions
const questionBank = {
    coding: [
        {
            id: 'q1',
            type: 'coding',
            difficulty: 'medium',
            points: 100,
            content: {
                title: 'Two Sum',
                description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
                starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
                testCases: [
                    { input: '[[2,7,11,15], 9]', expected: '[0,1]' },
                    { input: '[[3,2,4], 6]', expected: '[1,2]' }
                ],
                language: 'javascript'
            }
        },
        {
            id: 'q2',
            type: 'coding',
            difficulty: 'hard',
            points: 150,
            content: {
                title: 'LRU Cache',
                description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
                starterCode: 'class LRUCache {\n  constructor(capacity) {\n  }\n  get(key) {\n  }\n  put(key, value) {\n  }\n}',
                testCases: [],
                language: 'javascript'
            }
        }
    ],
    mcq: [
        {
            id: 'q3',
            type: 'mcq',
            difficulty: 'easy',
            points: 25,
            content: {
                question: 'What is the time complexity of binary search?',
                options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                correctAnswer: 1
            }
        }
    ],
    behavioral: [
        {
            id: 'q4',
            type: 'essay',
            difficulty: 'medium',
            points: 50,
            content: {
                question: 'Describe a challenging project you worked on and how you overcame obstacles.',
                minWords: 100,
                maxWords: 500
            }
        }
    ]
};

// Create assessment
router.post('/assessments', (req, res) => {
    const { title, description, type, duration, passingScore, questions, skillsTested, aiConfig } = req.body;

    const assessment = {
        id: `asmt_${Date.now()}`,
        title,
        description,
        type: type || 'mixed',
        config: {
            duration: duration || 60,
            passingScore: passingScore || 70,
            randomizeQuestions: true,
            showResults: true,
            allowRetake: false,
            maxAttempts: 1
        },
        questions: questions || [],
        skillsTested: skillsTested || [],
        aiConfig: {
            autoGrade: aiConfig?.autoGrade !== false,
            generateFeedback: aiConfig?.generateFeedback !== false,
            predictSuccess: aiConfig?.predictSuccess !== false,
            adaptiveDifficulty: aiConfig?.adaptiveDifficulty || false
        },
        createdAt: new Date()
    };

    assessments.push(assessment);
    res.status(201).json({ success: true, data: assessment });
});

// Get assessment
router.get('/assessments/:id', (req, res) => {
    const assessment = assessments.find(a => a.id === req.params.id);
    if (!assessment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: assessment });
});

// Get question bank
router.get('/questions', (req, res) => {
    const { type, difficulty } = req.query;
    let questions = Object.values(questionBank).flat();

    if (type) questions = questions.filter(q => q.type === type);
    if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);

    res.json({ success: true, data: questions });
});

// AI-generate questions
router.post('/questions/generate', async (req, res) => {
    const { skill, difficulty, count } = req.body;

    // Mock AI question generation
    const generated = Array(count || 3).fill(null).map((_, i) => ({
        id: `gen_${Date.now()}_${i}`,
        type: 'coding',
        difficulty: difficulty || 'medium',
        points: 100,
        content: {
            title: `${skill} Challenge ${i + 1}`,
            description: `AI-generated ${skill} problem focusing on ${difficulty} difficulty concepts.`,
            starterCode: `// Implement your solution\nfunction solve(input) {\n  \n}`,
            testCases: []
        },
        aiGenerated: true,
        skill
    }));

    res.json({ success: true, data: generated });
});

// Submit assessment
router.post('/assessments/:id/submit', async (req, res) => {
    const { candidateId, sessionId, answers } = req.body;
    const assessment = assessments.find(a => a.id === req.params.id);

    if (!assessment) return res.status(404).json({ success: false, message: 'Not found' });

    // Grade answers
    const gradedAnswers = answers.map(answer => {
        const question = assessment.questions.find(q => q.id === answer.questionId);
        let score = 0;
        let isCorrect = false;
        let aiEvaluation = null;

        if (question) {
            if (question.type === 'mcq') {
                isCorrect = answer.response === question.content.correctAnswer;
                score = isCorrect ? question.points : 0;
            } else if (question.type === 'coding') {
                // AI code evaluation (mock)
                aiEvaluation = {
                    score: Math.floor(Math.random() * 40) + 60,
                    feedback: 'Code structure is good. Consider edge cases.',
                    codeQuality: Math.floor(Math.random() * 20) + 80,
                    efficiency: Math.floor(Math.random() * 30) + 70,
                    correctness: Math.floor(Math.random() * 20) + 75
                };
                score = (aiEvaluation.score / 100) * question.points;
                isCorrect = aiEvaluation.correctness >= 70;
            } else {
                // Essay/behavioral - AI scoring
                aiEvaluation = {
                    score: Math.floor(Math.random() * 30) + 70,
                    feedback: 'Good response with clear examples.',
                    clarity: Math.floor(Math.random() * 20) + 80,
                    relevance: Math.floor(Math.random() * 20) + 75
                };
                score = (aiEvaluation.score / 100) * question.points;
            }
        }

        return {
            questionId: answer.questionId,
            response: answer.response,
            isCorrect,
            score,
            timeSpent: answer.timeSpent || 0,
            aiEvaluation
        };
    });

    // Calculate scores
    const totalScore = gradedAnswers.reduce((sum, a) => sum + a.score, 0);
    const maxScore = assessment.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // AI predictions
    const predictions = {
        jobSuccessProbability: Math.min(95, percentage + Math.random() * 10),
        retentionProbability: Math.min(90, percentage * 0.9 + Math.random() * 15),
        performanceLevel: percentage >= 85 ? 'exceptional' : percentage >= 70 ? 'above_average' : percentage >= 50 ? 'average' : 'below_average',
        strengthAreas: ['Problem Solving', 'Code Quality'],
        improvementAreas: ['Time Complexity', 'Edge Cases'],
        recommendedRole: percentage >= 80 ? 'Senior Developer' : 'Developer',
        confidence: Math.min(95, 70 + Math.random() * 20)
    };

    // Behavioral insights
    const behavioralInsights = {
        problemSolvingStyle: 'Analytical',
        communicationStyle: 'Detailed',
        workPreferences: ['Remote', 'Collaborative'],
        teamFit: Math.floor(Math.random() * 20) + 75
    };

    const result = {
        id: `result_${Date.now()}`,
        assessmentId: assessment.id,
        candidateId,
        sessionId,
        scores: {
            total: totalScore,
            percentage: Math.round(percentage),
            passed: percentage >= assessment.config.passingScore,
            bySection: [],
            bySkill: assessment.skillsTested.map(skill => ({
                skill,
                level: percentage >= 85 ? 'expert' : percentage >= 70 ? 'advanced' : percentage >= 50 ? 'intermediate' : 'beginner',
                confidence: Math.floor(Math.random() * 20) + 75
            }))
        },
        answers: gradedAnswers,
        predictions,
        behavioralInsights,
        completedAt: new Date()
    };

    assessmentResults.push(result);
    res.json({ success: true, data: result });
});

// Get results
router.get('/results/:candidateId', (req, res) => {
    const results = assessmentResults.filter(r => r.candidateId === req.params.candidateId);
    res.json({ success: true, data: results });
});

// Get result by ID
router.get('/results/detail/:resultId', (req, res) => {
    const result = assessmentResults.find(r => r.id === req.params.resultId);
    if (!result) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: result });
});

// Compare candidates
router.post('/compare', (req, res) => {
    const { candidateIds, assessmentId } = req.body;

    const candidateResults = candidateIds.map(candidateId => {
        const results = assessmentResults.filter(
            r => r.candidateId === candidateId && (!assessmentId || r.assessmentId === assessmentId)
        );

        const avgScore = results.length > 0
            ? results.reduce((sum, r) => sum + r.scores.percentage, 0) / results.length
            : 0;

        return {
            candidateId,
            assessmentsTaken: results.length,
            averageScore: Math.round(avgScore),
            predictions: results[0]?.predictions || null,
            rank: 0
        };
    });

    // Rank candidates
    candidateResults.sort((a, b) => b.averageScore - a.averageScore);
    candidateResults.forEach((c, i) => c.rank = i + 1);

    res.json({ success: true, data: candidateResults });
});

// Get skill analytics
router.get('/analytics/skills', (req, res) => {
    const skillStats = {};

    assessmentResults.forEach(result => {
        result.scores.bySkill?.forEach(skill => {
            if (!skillStats[skill.skill]) {
                skillStats[skill.skill] = { count: 0, totalLevel: 0, levels: [] };
            }
            const levelValue = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }[skill.level] || 2;
            skillStats[skill.skill].count++;
            skillStats[skill.skill].totalLevel += levelValue;
            skillStats[skill.skill].levels.push(skill.level);
        });
    });

    const analytics = Object.entries(skillStats).map(([skill, stats]) => ({
        skill,
        candidatesTested: stats.count,
        averageLevel: stats.totalLevel / stats.count,
        distribution: {
            beginner: stats.levels.filter(l => l === 'beginner').length,
            intermediate: stats.levels.filter(l => l === 'intermediate').length,
            advanced: stats.levels.filter(l => l === 'advanced').length,
            expert: stats.levels.filter(l => l === 'expert').length
        }
    }));

    res.json({ success: true, data: analytics });
});

module.exports = router;
