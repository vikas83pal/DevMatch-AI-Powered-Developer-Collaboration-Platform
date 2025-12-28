/**
 * DevMatch API Service
 * Centralized API client for all feature endpoints
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Helper for making requests
const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
};

// ============== PROJECTS API ==============
export const projectAPI = {
    // Get all projects
    getAll: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value);
            }
        });
        const queryString = params.toString();
        return request(`/projects${queryString ? '?' + queryString : ''}`);
    },

    // Get project by ID
    getById: (id) => request(`/projects/${id}`),

    // Create new project
    create: (projectData) => request('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
    }),

    // Update project
    update: (id, projectData) => request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
    }),

    // Delete project
    delete: (id) => request(`/projects/${id}`, {
        method: 'DELETE',
    }),

    // Join project
    join: (id) => request(`/projects/${id}/join`, {
        method: 'POST',
    }),

    // Leave project
    leave: (id) => request(`/projects/${id}/leave`, {
        method: 'POST',
    }),

    // Star/unstar project
    star: (id) => request(`/projects/${id}/star`, {
        method: 'POST',
    }),
};

// ============== CANDIDATES API ==============
export const candidatesAPI = {
    // Get candidates with filters
    getAll: (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, Array.isArray(value) ? value.join(',') : value);
            }
        });
        return request(`/candidates?${params.toString()}`);
    },

    // Get candidate by ID
    getById: (id) => request(`/candidates/${id}`),

    // Match candidates to job requirements
    match: (requirements) => request('/candidates/match', {
        method: 'POST',
        body: JSON.stringify(requirements),
    }),

    // Get candidate analytics
    getAnalytics: (id) => request(`/candidates/${id}/analytics`),

    // Create/update candidate profile
    save: (candidateData) => request('/candidates', {
        method: 'POST',
        body: JSON.stringify(candidateData),
    }),

    // Get trending skills
    getTrendingSkills: () => request('/candidates/skills/trending'),
};

// ============== INTERVIEWS API ==============
export const interviewsAPI = {
    // Create interview
    create: (interviewData) => request('/interviews', {
        method: 'POST',
        body: JSON.stringify(interviewData),
    }),

    // Get all interviews
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return request(`/interviews?${params.toString()}`);
    },

    // Get interview by ID
    getById: (id) => request(`/interviews/${id}`),

    // Confirm interview slot
    confirm: (id, slotIndex) => request(`/interviews/${id}/confirm`, {
        method: 'PUT',
        body: JSON.stringify({ slotIndex }),
    }),

    // Reschedule interview
    reschedule: (id, data) => request(`/interviews/${id}/reschedule`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    // Cancel interview
    cancel: (id, reason) => request(`/interviews/${id}/cancel`, {
        method: 'PUT',
        body: JSON.stringify({ reason }),
    }),

    // Submit feedback
    submitFeedback: (id, feedback) => request(`/interviews/${id}/feedback`, {
        method: 'POST',
        body: JSON.stringify(feedback),
    }),

    // Get email templates
    getTemplates: () => request('/interviews/templates/all'),

    // Create template
    createTemplate: (template) => request('/interviews/templates', {
        method: 'POST',
        body: JSON.stringify(template),
    }),

    // Get communication history
    getCommunications: (candidateId) => request(`/interviews/communications/${candidateId}`),

    // Send custom communication
    sendCommunication: (data) => request('/interviews/communications/send', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
};

// ============== MOBILE API ==============
export const mobileAPI = {
    // Register device
    registerDevice: (deviceData) => request('/mobile/devices/register', {
        method: 'POST',
        body: JSON.stringify(deviceData),
    }),

    // Unregister device
    unregisterDevice: (deviceId) => request(`/mobile/devices/${deviceId}`, {
        method: 'DELETE',
    }),

    // Get user devices
    getUserDevices: (userId) => request(`/mobile/devices/user/${userId}`),

    // Update preferences
    updatePreferences: (preferences) => request('/mobile/preferences', {
        method: 'PUT',
        body: JSON.stringify(preferences),
    }),

    // Get preferences
    getPreferences: (userId) => request(`/mobile/preferences/${userId}`),

    // Send notification
    sendNotification: (data) => request('/mobile/notifications/send', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Broadcast notification
    broadcast: (data) => request('/mobile/notifications/broadcast', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Get notification history
    getHistory: (userId, page = 1) => request(`/mobile/notifications/history/${userId}?page=${page}`),

    // Get mobile config
    getConfig: () => request('/mobile/config'),

    // Sync data
    sync: (syncData) => request('/mobile/sync', {
        method: 'POST',
        body: JSON.stringify(syncData),
    }),
};

// ============== ATS API ==============
export const atsAPI = {
    // Get providers
    getProviders: () => request('/ats/providers'),

    // Create integration
    create: (integrationData) => request('/ats/integrations', {
        method: 'POST',
        body: JSON.stringify(integrationData),
    }),

    // Get integrations
    getAll: (organizationId) => request(`/ats/integrations/${organizationId}`),

    // Update integration
    update: (id, data) => request(`/ats/integrations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    // Delete integration
    delete: (id) => request(`/ats/integrations/${id}`, {
        method: 'DELETE',
    }),

    // Trigger sync
    sync: (id, options = {}) => request(`/ats/integrations/${id}/sync`, {
        method: 'POST',
        body: JSON.stringify(options),
    }),

    // Push candidate to ATS
    pushCandidate: (id, candidateData) => request(`/ats/integrations/${id}/push-candidate`, {
        method: 'POST',
        body: JSON.stringify(candidateData),
    }),

    // Get sync logs
    getLogs: (id, page = 1) => request(`/ats/integrations/${id}/logs?page=${page}`),

    // Test connection
    test: (id) => request(`/ats/integrations/${id}/test`, {
        method: 'POST',
    }),
};

// ============== PROCTORING API ==============
export const proctoringAPI = {
    // Get config
    getConfig: (organizationId) => request(`/proctoring/config/${organizationId}`),

    // Update config
    updateConfig: (organizationId, config) => request(`/proctoring/config/${organizationId}`, {
        method: 'PUT',
        body: JSON.stringify(config),
    }),

    // Create session
    createSession: (sessionData) => request('/proctoring/sessions', {
        method: 'POST',
        body: JSON.stringify(sessionData),
    }),

    // Environment check
    environmentCheck: (sessionId, data) => request(`/proctoring/sessions/${sessionId}/environment-check`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    // Start session
    startSession: (sessionId) => request(`/proctoring/sessions/${sessionId}/start`, {
        method: 'PUT',
    }),

    // Report violation
    reportViolation: (sessionId, violation) => request(`/proctoring/sessions/${sessionId}/violations`, {
        method: 'POST',
        body: JSON.stringify(violation),
    }),

    // Upload snapshot
    uploadSnapshot: (sessionId, snapshot) => request(`/proctoring/sessions/${sessionId}/snapshots`, {
        method: 'POST',
        body: JSON.stringify(snapshot),
    }),

    // Complete session
    completeSession: (sessionId) => request(`/proctoring/sessions/${sessionId}/complete`, {
        method: 'PUT',
    }),

    // Get session
    getSession: (sessionId) => request(`/proctoring/sessions/${sessionId}`),

    // Review session
    reviewSession: (sessionId, review) => request(`/proctoring/sessions/${sessionId}/review`, {
        method: 'PUT',
        body: JSON.stringify(review),
    }),

    // Get flagged sessions
    getFlagged: (organizationId) => request(`/proctoring/sessions/flagged/${organizationId}`),
};

// ============== COLLABORATION API ==============
export const collaborationAPI = {
    // Create team
    createTeam: (teamData) => request('/collaboration/teams', {
        method: 'POST',
        body: JSON.stringify(teamData),
    }),

    // Get teams
    getTeams: (organizationId) => request(`/collaboration/teams/${organizationId}`),

    // Add team member
    addMember: (teamId, memberData) => request(`/collaboration/teams/${teamId}/members`, {
        method: 'POST',
        body: JSON.stringify(memberData),
    }),

    // Remove team member
    removeMember: (teamId, userId) => request(`/collaboration/teams/${teamId}/members/${userId}`, {
        method: 'DELETE',
    }),

    // Create note
    createNote: (noteData) => request('/collaboration/notes', {
        method: 'POST',
        body: JSON.stringify(noteData),
    }),

    // Get notes for candidate
    getCandidateNotes: (candidateId) => request(`/collaboration/notes/candidate/${candidateId}`),

    // Add reply
    addReply: (noteId, reply) => request(`/collaboration/notes/${noteId}/replies`, {
        method: 'POST',
        body: JSON.stringify(reply),
    }),

    // Add reaction
    addReaction: (noteId, reaction) => request(`/collaboration/notes/${noteId}/reactions`, {
        method: 'POST',
        body: JSON.stringify(reaction),
    }),

    // Create/update pipeline
    savePipeline: (pipelineData) => request('/collaboration/pipelines', {
        method: 'POST',
        body: JSON.stringify(pipelineData),
    }),

    // Update stage
    updateStage: (pipelineId, stageData) => request(`/collaboration/pipelines/${pipelineId}/stage`, {
        method: 'PUT',
        body: JSON.stringify(stageData),
    }),

    // Add scorecard rating
    addScore: (pipelineId, score) => request(`/collaboration/pipelines/${pipelineId}/scorecard`, {
        method: 'POST',
        body: JSON.stringify(score),
    }),

    // Make decision
    makeDecision: (pipelineId, decision) => request(`/collaboration/pipelines/${pipelineId}/decision`, {
        method: 'PUT',
        body: JSON.stringify(decision),
    }),

    // Get pipeline
    getPipeline: (pipelineId) => request(`/collaboration/pipelines/${pipelineId}`),

    // Get job pipelines
    getJobPipelines: (jobId) => request(`/collaboration/pipelines/job/${jobId}`),
};

// ============== ASSESSMENTS API ==============
export const assessmentsAPI = {
    // Create assessment
    create: (assessmentData) => request('/assessments/assessments', {
        method: 'POST',
        body: JSON.stringify(assessmentData),
    }),

    // Get assessment
    getById: (id) => request(`/assessments/assessments/${id}`),

    // Get question bank
    getQuestions: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return request(`/assessments/questions?${params.toString()}`);
    },

    // Generate questions with AI
    generateQuestions: (params) => request('/assessments/questions/generate', {
        method: 'POST',
        body: JSON.stringify(params),
    }),

    // Submit assessment
    submit: (assessmentId, submissionData) => request(`/assessments/assessments/${assessmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(submissionData),
    }),

    // Get candidate results
    getResults: (candidateId) => request(`/assessments/results/${candidateId}`),

    // Get result details
    getResultDetails: (resultId) => request(`/assessments/results/detail/${resultId}`),

    // Compare candidates
    compare: (candidateIds, assessmentId) => request('/assessments/compare', {
        method: 'POST',
        body: JSON.stringify({ candidateIds, assessmentId }),
    }),

    // Get skill analytics
    getSkillAnalytics: () => request('/assessments/analytics/skills'),
};

// Export all APIs
export default {
    projects: projectAPI,
    candidates: candidatesAPI,
    interviews: interviewsAPI,
    mobile: mobileAPI,
    ats: atsAPI,
    proctoring: proctoringAPI,
    collaboration: collaborationAPI,
    assessments: assessmentsAPI,
};
