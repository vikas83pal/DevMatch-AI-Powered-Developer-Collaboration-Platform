/**
 * FEATURE 1: Advanced Filtering & Candidate Analytics
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();

// ============== IN-MEMORY DATA STORE ==============
let candidates = [];
let candidateAnalytics = [];

// Sample candidate data for demonstration
const initializeCandidates = () => {
    candidates = [
        {
            id: '1',
            userId: 'user_1',
            name: 'Sarah Chen',
            email: 'sarah.chen@email.com',
            phone: '+1-555-0101',
            location: {
                city: 'San Francisco',
                country: 'USA',
                timezone: 'America/Los_Angeles',
                remotePreference: 'remote'
            },
            skills: [
                { name: 'React', level: 'expert', yearsOfExperience: 5, verified: true, endorsements: 45 },
                { name: 'Node.js', level: 'advanced', yearsOfExperience: 4, verified: true, endorsements: 32 },
                { name: 'TypeScript', level: 'advanced', yearsOfExperience: 3, verified: false, endorsements: 18 },
                { name: 'Python', level: 'intermediate', yearsOfExperience: 2, verified: true, endorsements: 12 }
            ],
            experience: [
                {
                    company: 'TechCorp',
                    role: 'Senior Frontend Developer',
                    startDate: '2021-01-01',
                    endDate: null,
                    current: true,
                    description: 'Leading frontend architecture for enterprise SaaS platform',
                    technologies: ['React', 'TypeScript', 'GraphQL']
                }
            ],
            education: [
                { institution: 'Stanford University', degree: 'BS', field: 'Computer Science', graduationYear: 2018, gpa: 3.8 }
            ],
            availability: {
                status: 'open_to_offers',
                startDate: '2024-02-01',
                hoursPerWeek: 40,
                preferredRoles: ['Senior Frontend Developer', 'Full Stack Developer'],
                salaryExpectation: { min: 150000, max: 200000, currency: 'USD' }
            },
            analytics: {
                profileCompleteness: 95,
                matchScore: 92,
                responseRate: 88,
                averageResponseTime: 4,
                interviewSuccessRate: 75,
                profileViews: 234,
                lastActiveAt: new Date()
            },
            socialLinks: {
                github: 'https://github.com/sarahchen',
                linkedin: 'https://linkedin.com/in/sarahchen',
                portfolio: 'https://sarahchen.dev'
            },
            createdAt: new Date('2023-06-15'),
            updatedAt: new Date()
        },
        {
            id: '2',
            userId: 'user_2',
            name: 'Marcus Johnson',
            email: 'marcus.j@email.com',
            phone: '+1-555-0102',
            location: {
                city: 'New York',
                country: 'USA',
                timezone: 'America/New_York',
                remotePreference: 'hybrid'
            },
            skills: [
                { name: 'Python', level: 'expert', yearsOfExperience: 7, verified: true, endorsements: 67 },
                { name: 'Machine Learning', level: 'advanced', yearsOfExperience: 5, verified: true, endorsements: 45 },
                { name: 'TensorFlow', level: 'advanced', yearsOfExperience: 4, verified: true, endorsements: 38 },
                { name: 'AWS', level: 'intermediate', yearsOfExperience: 3, verified: false, endorsements: 22 }
            ],
            experience: [
                {
                    company: 'AI Solutions Inc',
                    role: 'Machine Learning Engineer',
                    startDate: '2020-03-01',
                    endDate: null,
                    current: true,
                    description: 'Building and deploying ML models at scale',
                    technologies: ['Python', 'TensorFlow', 'Kubernetes', 'AWS']
                }
            ],
            education: [
                { institution: 'MIT', degree: 'MS', field: 'Artificial Intelligence', graduationYear: 2019, gpa: 3.9 }
            ],
            availability: {
                status: 'actively_looking',
                startDate: '2024-01-15',
                hoursPerWeek: 40,
                preferredRoles: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
                salaryExpectation: { min: 180000, max: 250000, currency: 'USD' }
            },
            analytics: {
                profileCompleteness: 100,
                matchScore: 96,
                responseRate: 92,
                averageResponseTime: 2,
                interviewSuccessRate: 80,
                profileViews: 456,
                lastActiveAt: new Date()
            },
            socialLinks: {
                github: 'https://github.com/marcusj',
                linkedin: 'https://linkedin.com/in/marcusjohnson'
            },
            createdAt: new Date('2023-04-20'),
            updatedAt: new Date()
        }
    ];
};

initializeCandidates();

// ============== HELPER FUNCTIONS ==============

/**
 * Calculate match score between candidate and job requirements
 */
const calculateMatchScore = (candidate, requirements) => {
    let score = 0;
    let totalWeight = 0;

    // Skill matching (weight: 40%)
    if (requirements.skills && requirements.skills.length > 0) {
        const skillWeight = 40;
        let skillScore = 0;
        requirements.skills.forEach(reqSkill => {
            const candidateSkill = candidate.skills.find(
                s => s.name.toLowerCase() === reqSkill.name.toLowerCase()
            );
            if (candidateSkill) {
                const levelScore = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 };
                skillScore += levelScore[candidateSkill.level] || 0;
            }
        });
        score += (skillScore / (requirements.skills.length * 100)) * skillWeight;
        totalWeight += skillWeight;
    }

    // Experience matching (weight: 25%)
    if (requirements.minExperience) {
        const expWeight = 25;
        const totalExp = candidate.skills.reduce((sum, s) => sum + s.yearsOfExperience, 0) / candidate.skills.length;
        const expScore = Math.min(totalExp / requirements.minExperience, 1) * 100;
        score += (expScore / 100) * expWeight;
        totalWeight += expWeight;
    }

    // Location matching (weight: 15%)
    if (requirements.location) {
        const locWeight = 15;
        let locScore = 0;
        if (requirements.remote && candidate.location.remotePreference === 'remote') {
            locScore = 100;
        } else if (candidate.location.country === requirements.location.country) {
            locScore = candidate.location.city === requirements.location.city ? 100 : 70;
        }
        score += (locScore / 100) * locWeight;
        totalWeight += locWeight;
    }

    // Availability matching (weight: 10%)
    if (requirements.startDate) {
        const availWeight = 10;
        const candidateStart = new Date(candidate.availability.startDate);
        const requiredStart = new Date(requirements.startDate);
        const availScore = candidateStart <= requiredStart ? 100 : 50;
        score += (availScore / 100) * availWeight;
        totalWeight += availWeight;
    }

    // Salary matching (weight: 10%)
    if (requirements.salary) {
        const salaryWeight = 10;
        const candMin = candidate.availability.salaryExpectation.min;
        const candMax = candidate.availability.salaryExpectation.max;
        let salaryScore = 0;
        if (requirements.salary.max >= candMin && requirements.salary.min <= candMax) {
            salaryScore = 100;
        } else if (requirements.salary.max >= candMin * 0.9) {
            salaryScore = 70;
        }
        score += (salaryScore / 100) * salaryWeight;
        totalWeight += salaryWeight;
    }

    return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : candidate.analytics.matchScore;
};

/**
 * Apply filters to candidates
 */
const applyFilters = (candidatesList, filters) => {
    return candidatesList.filter(candidate => {
        // Skills filter
        if (filters.skills && filters.skills.length > 0) {
            const candidateSkillNames = candidate.skills.map(s => s.name.toLowerCase());
            const hasRequiredSkills = filters.skills.every(skill =>
                candidateSkillNames.includes(skill.toLowerCase())
            );
            if (!hasRequiredSkills) return false;
        }

        // Skill level filter
        if (filters.minSkillLevel) {
            const levelOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
            const hasMinLevel = candidate.skills.some(
                s => levelOrder[s.level] >= levelOrder[filters.minSkillLevel]
            );
            if (!hasMinLevel) return false;
        }

        // Experience filter
        if (filters.minExperience) {
            const maxExp = Math.max(...candidate.skills.map(s => s.yearsOfExperience));
            if (maxExp < filters.minExperience) return false;
        }

        // Location filter
        if (filters.location) {
            if (filters.location.country && candidate.location.country !== filters.location.country) {
                return false;
            }
            if (filters.location.city && candidate.location.city !== filters.location.city) {
                return false;
            }
        }

        // Remote preference filter
        if (filters.remotePreference) {
            if (candidate.location.remotePreference !== filters.remotePreference) return false;
        }

        // Availability status filter
        if (filters.availabilityStatus) {
            if (candidate.availability.status !== filters.availabilityStatus) return false;
        }

        // Salary range filter
        if (filters.salaryRange) {
            const candMin = candidate.availability.salaryExpectation.min;
            const candMax = candidate.availability.salaryExpectation.max;
            if (filters.salaryRange.min && candMax < filters.salaryRange.min) return false;
            if (filters.salaryRange.max && candMin > filters.salaryRange.max) return false;
        }

        // Verified skills only
        if (filters.verifiedOnly) {
            const hasVerifiedSkills = candidate.skills.some(s => s.verified);
            if (!hasVerifiedSkills) return false;
        }

        // Profile completeness
        if (filters.minProfileCompleteness) {
            if (candidate.analytics.profileCompleteness < filters.minProfileCompleteness) return false;
        }

        // Search query
        if (filters.query) {
            const query = filters.query.toLowerCase();
            const searchFields = [
                candidate.name,
                ...candidate.skills.map(s => s.name),
                candidate.location.city,
                ...candidate.experience.map(e => e.role),
                ...candidate.experience.map(e => e.company)
            ].map(f => (f || '').toLowerCase());

            const matchesQuery = searchFields.some(field => field.includes(query));
            if (!matchesQuery) return false;
        }

        return true;
    });
};

// ============== API ROUTES ==============

/**
 * @route   GET /api/candidates
 * @desc    Get all candidates with advanced filtering
 * @access  Private
 * 
 * Query Parameters:
 * - skills: comma-separated list of required skills
 * - minSkillLevel: beginner | intermediate | advanced | expert
 * - minExperience: minimum years of experience
 * - location: { country, city }
 * - remotePreference: remote | hybrid | onsite | flexible
 * - availabilityStatus: actively_looking | open_to_offers | not_looking
 * - salaryMin: minimum salary
 * - salaryMax: maximum salary
 * - verifiedOnly: boolean
 * - minProfileCompleteness: 0-100
 * - query: search query
 * - sortBy: matchScore | experience | profileViews | responseRate
 * - sortOrder: asc | desc
 * - page: page number
 * - limit: items per page
 */
router.get('/', (req, res) => {
    try {
        const {
            skills,
            minSkillLevel,
            minExperience,
            country,
            city,
            remotePreference,
            availabilityStatus,
            salaryMin,
            salaryMax,
            verifiedOnly,
            minProfileCompleteness,
            query,
            sortBy = 'matchScore',
            sortOrder = 'desc',
            page = 1,
            limit = 20
        } = req.query;

        // Build filters object
        const filters = {
            skills: skills ? skills.split(',').map(s => s.trim()) : null,
            minSkillLevel,
            minExperience: minExperience ? parseInt(minExperience) : null,
            location: country || city ? { country, city } : null,
            remotePreference,
            availabilityStatus,
            salaryRange: salaryMin || salaryMax ? {
                min: salaryMin ? parseInt(salaryMin) : null,
                max: salaryMax ? parseInt(salaryMax) : null
            } : null,
            verifiedOnly: verifiedOnly === 'true',
            minProfileCompleteness: minProfileCompleteness ? parseInt(minProfileCompleteness) : null,
            query
        };

        // Apply filters
        let filteredCandidates = applyFilters(candidates, filters);

        // Sort
        const sortMultiplier = sortOrder === 'asc' ? 1 : -1;
        filteredCandidates.sort((a, b) => {
            switch (sortBy) {
                case 'matchScore':
                    return (a.analytics.matchScore - b.analytics.matchScore) * sortMultiplier;
                case 'experience':
                    const aExp = Math.max(...a.skills.map(s => s.yearsOfExperience));
                    const bExp = Math.max(...b.skills.map(s => s.yearsOfExperience));
                    return (aExp - bExp) * sortMultiplier;
                case 'profileViews':
                    return (a.analytics.profileViews - b.analytics.profileViews) * sortMultiplier;
                case 'responseRate':
                    return (a.analytics.responseRate - b.analytics.responseRate) * sortMultiplier;
                default:
                    return 0;
            }
        });

        // Paginate
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedCandidates = filteredCandidates.slice(startIndex, endIndex);

        // Response
        res.json({
            success: true,
            data: {
                candidates: paginatedCandidates,
                pagination: {
                    total: filteredCandidates.length,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(filteredCandidates.length / parseInt(limit))
                },
                filters: filters
            }
        });
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/candidates/:id
 * @desc    Get candidate by ID with full profile
 * @access  Private
 */
router.get('/:id', (req, res) => {
    try {
        const candidate = candidates.find(c => c.id === req.params.id);

        if (!candidate) {
            return res.status(404).json({ success: false, message: 'Candidate not found' });
        }

        // Increment profile views
        candidate.analytics.profileViews++;

        res.json({
            success: true,
            data: candidate
        });
    } catch (error) {
        console.error('Error fetching candidate:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/candidates/match
 * @desc    Find matching candidates for job requirements
 * @access  Private
 * 
 * Request Body:
 * {
 *   skills: [{ name: string, level: string, required: boolean }],
 *   minExperience: number,
 *   location: { country: string, city: string },
 *   remote: boolean,
 *   startDate: string,
 *   salary: { min: number, max: number },
 *   limit: number
 * }
 */
router.post('/match', (req, res) => {
    try {
        const requirements = req.body;

        // Calculate match scores for all candidates
        const matchedCandidates = candidates
            .filter(c => c.availability.status !== 'not_looking')
            .map(candidate => ({
                ...candidate,
                matchScore: calculateMatchScore(candidate, requirements)
            }))
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, requirements.limit || 20);

        res.json({
            success: true,
            data: {
                matches: matchedCandidates,
                totalCandidates: candidates.length,
                matchingCandidates: matchedCandidates.length
            }
        });
    } catch (error) {
        console.error('Error matching candidates:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/candidates/:id/analytics
 * @desc    Get detailed analytics for a candidate
 * @access  Private
 */
router.get('/:id/analytics', (req, res) => {
    try {
        const candidate = candidates.find(c => c.id === req.params.id);

        if (!candidate) {
            return res.status(404).json({ success: false, message: 'Candidate not found' });
        }

        // Generate analytics data
        const analytics = {
            overview: candidate.analytics,
            trends: {
                profileViews: [
                    { date: '2024-01-01', views: 45 },
                    { date: '2024-01-08', views: 62 },
                    { date: '2024-01-15', views: 78 },
                    { date: '2024-01-22', views: 95 },
                    { date: '2024-01-29', views: 112 }
                ],
                searchAppearances: [
                    { date: '2024-01-01', appearances: 234 },
                    { date: '2024-01-08', appearances: 312 },
                    { date: '2024-01-15', appearances: 289 },
                    { date: '2024-01-22', appearances: 356 },
                    { date: '2024-01-29', appearances: 401 }
                ]
            },
            skillDemand: candidate.skills.map(skill => ({
                skill: skill.name,
                demandScore: Math.floor(Math.random() * 40) + 60,
                marketTrend: Math.random() > 0.5 ? 'increasing' : 'stable'
            })),
            competitorAnalysis: {
                averageMatchScore: 75,
                candidateRank: Math.floor(Math.random() * 50) + 1,
                totalInMarket: 500
            },
            recommendations: [
                'Add more projects to showcase your React expertise',
                'Complete AWS certification to boost your profile',
                'Update your availability status for better visibility'
            ]
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/candidates
 * @desc    Create or update candidate profile
 * @access  Private
 */
router.post('/', (req, res) => {
    try {
        const candidateData = req.body;

        const existingIndex = candidates.findIndex(c => c.userId === candidateData.userId);

        if (existingIndex >= 0) {
            // Update existing
            candidates[existingIndex] = {
                ...candidates[existingIndex],
                ...candidateData,
                updatedAt: new Date()
            };

            res.json({
                success: true,
                message: 'Candidate profile updated',
                data: candidates[existingIndex]
            });
        } else {
            // Create new
            const newCandidate = {
                id: `cand_${Date.now()}`,
                ...candidateData,
                analytics: {
                    profileCompleteness: 0,
                    matchScore: 0,
                    responseRate: 0,
                    averageResponseTime: 0,
                    interviewSuccessRate: 0,
                    profileViews: 0,
                    lastActiveAt: new Date()
                },
                createdAt: new Date(),
                updatedAt: new Date()
            };

            candidates.push(newCandidate);

            res.status(201).json({
                success: true,
                message: 'Candidate profile created',
                data: newCandidate
            });
        }
    } catch (error) {
        console.error('Error saving candidate:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/candidates/skills/trending
 * @desc    Get trending skills in the market
 * @access  Private
 */
router.get('/skills/trending', (req, res) => {
    try {
        const trendingSkills = [
            { name: 'React', demand: 95, growth: '+15%', avgSalary: 145000 },
            { name: 'Python', demand: 92, growth: '+12%', avgSalary: 140000 },
            { name: 'TypeScript', demand: 88, growth: '+25%', avgSalary: 135000 },
            { name: 'Kubernetes', demand: 85, growth: '+30%', avgSalary: 155000 },
            { name: 'Machine Learning', demand: 82, growth: '+20%', avgSalary: 165000 },
            { name: 'Go', demand: 78, growth: '+35%', avgSalary: 150000 },
            { name: 'Rust', demand: 72, growth: '+45%', avgSalary: 160000 },
            { name: 'AWS', demand: 90, growth: '+10%', avgSalary: 145000 }
        ];

        res.json({
            success: true,
            data: trendingSkills
        });
    } catch (error) {
        console.error('Error fetching trending skills:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
