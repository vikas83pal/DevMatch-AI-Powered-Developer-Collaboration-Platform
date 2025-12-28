/**
 * FEATURE 6: Team Collaboration
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();

let teams = [];
let collaborationNotes = [];
let hiringPipelines = [];

// Create team
router.post('/teams', (req, res) => {
    const { organizationId, name, description, members } = req.body;

    const team = {
        id: `team_${Date.now()}`,
        organizationId,
        name,
        description,
        members: members || [],
        settings: {
            defaultJobVisibility: 'team',
            requireApprovalForHire: false,
            approvers: []
        },
        createdAt: new Date()
    };

    teams.push(team);
    res.status(201).json({ success: true, data: team });
});

// Get teams
router.get('/teams/:organizationId', (req, res) => {
    const orgTeams = teams.filter(t => t.organizationId === req.params.organizationId);
    res.json({ success: true, data: orgTeams });
});

// Add team member
router.post('/teams/:teamId/members', (req, res) => {
    const { userId, role, permissions } = req.body;
    const team = teams.find(t => t.id === req.params.teamId);

    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    const existingMember = team.members.find(m => m.userId === userId);
    if (existingMember) {
        existingMember.role = role;
        existingMember.permissions = permissions;
    } else {
        team.members.push({ userId, role, permissions, joinedAt: new Date() });
    }

    res.json({ success: true, data: team });
});

// Remove team member
router.delete('/teams/:teamId/members/:userId', (req, res) => {
    const team = teams.find(t => t.id === req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    team.members = team.members.filter(m => m.userId !== req.params.userId);
    res.json({ success: true, message: 'Member removed' });
});

// Create collaboration note
router.post('/notes', (req, res) => {
    const { candidateId, jobId, authorId, content, type, mentions, visibility } = req.body;

    const note = {
        id: `note_${Date.now()}`,
        candidateId,
        jobId,
        authorId,
        content,
        type: type || 'note',
        mentions: mentions || [],
        visibility: visibility || 'team',
        isPinned: false,
        reactions: [],
        replies: [],
        createdAt: new Date()
    };

    collaborationNotes.push(note);
    res.status(201).json({ success: true, data: note });
});

// Get notes for candidate
router.get('/notes/candidate/:candidateId', (req, res) => {
    const notes = collaborationNotes
        .filter(n => n.candidateId === req.params.candidateId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: notes });
});

// Add reply to note
router.post('/notes/:noteId/replies', (req, res) => {
    const { authorId, content } = req.body;
    const note = collaborationNotes.find(n => n.id === req.params.noteId);

    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    note.replies.push({ id: `reply_${Date.now()}`, authorId, content, createdAt: new Date() });
    res.json({ success: true, data: note });
});

// Add reaction to note
router.post('/notes/:noteId/reactions', (req, res) => {
    const { userId, emoji } = req.body;
    const note = collaborationNotes.find(n => n.id === req.params.noteId);

    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    const existing = note.reactions.findIndex(r => r.userId === userId && r.emoji === emoji);
    if (existing >= 0) {
        note.reactions.splice(existing, 1);
    } else {
        note.reactions.push({ userId, emoji });
    }

    res.json({ success: true, data: note });
});

// Create/update hiring pipeline
router.post('/pipelines', (req, res) => {
    const { jobId, candidateId, stages } = req.body;

    let pipeline = hiringPipelines.find(p => p.jobId === jobId && p.candidateId === candidateId);

    if (pipeline) {
        pipeline.stages = stages;
        pipeline.updatedAt = new Date();
    } else {
        pipeline = {
            id: `pipe_${Date.now()}`,
            jobId,
            candidateId,
            currentStage: stages[0]?.name || 'Applied',
            stages: stages.map(s => ({
                name: s.name,
                enteredAt: null,
                exitedAt: null,
                status: 'pending',
                assignedTo: s.assignedTo,
                dueDate: s.dueDate
            })),
            scorecard: { overallScore: 0, scores: [] },
            decision: { status: 'pending' },
            createdAt: new Date()
        };
        hiringPipelines.push(pipeline);
    }

    res.json({ success: true, data: pipeline });
});

// Update pipeline stage
router.put('/pipelines/:pipelineId/stage', (req, res) => {
    const { stageName, status } = req.body;
    const pipeline = hiringPipelines.find(p => p.id === req.params.pipelineId);

    if (!pipeline) return res.status(404).json({ success: false, message: 'Pipeline not found' });

    const stage = pipeline.stages.find(s => s.name === stageName);
    if (stage) {
        if (status === 'in_progress' && !stage.enteredAt) {
            stage.enteredAt = new Date();
        } else if (status === 'completed') {
            stage.exitedAt = new Date();
        }
        stage.status = status;
        pipeline.currentStage = stageName;
    }

    res.json({ success: true, data: pipeline });
});

// Add scorecard rating
router.post('/pipelines/:pipelineId/scorecard', (req, res) => {
    const { criteria, score, weight } = req.body;
    const pipeline = hiringPipelines.find(p => p.id === req.params.pipelineId);

    if (!pipeline) return res.status(404).json({ success: false, message: 'Pipeline not found' });

    const existing = pipeline.scorecard.scores.findIndex(s => s.criteria === criteria);
    if (existing >= 0) {
        pipeline.scorecard.scores[existing] = { criteria, score, weight };
    } else {
        pipeline.scorecard.scores.push({ criteria, score, weight });
    }

    // Recalculate overall score
    const totalWeight = pipeline.scorecard.scores.reduce((sum, s) => sum + (s.weight || 1), 0);
    pipeline.scorecard.overallScore = pipeline.scorecard.scores.reduce(
        (sum, s) => sum + (s.score * (s.weight || 1)), 0
    ) / totalWeight;

    res.json({ success: true, data: pipeline });
});

// Make hiring decision
router.put('/pipelines/:pipelineId/decision', (req, res) => {
    const { status, reason, decidedBy } = req.body;
    const pipeline = hiringPipelines.find(p => p.id === req.params.pipelineId);

    if (!pipeline) return res.status(404).json({ success: false, message: 'Pipeline not found' });

    pipeline.decision = {
        status,
        reason,
        decidedBy,
        decidedAt: new Date()
    };

    res.json({ success: true, data: pipeline });
});

// Get pipeline
router.get('/pipelines/:pipelineId', (req, res) => {
    const pipeline = hiringPipelines.find(p => p.id === req.params.pipelineId);
    if (!pipeline) return res.status(404).json({ success: false, message: 'Pipeline not found' });
    res.json({ success: true, data: pipeline });
});

// Get pipelines for job
router.get('/pipelines/job/:jobId', (req, res) => {
    const pipelines = hiringPipelines.filter(p => p.jobId === req.params.jobId);
    res.json({ success: true, data: pipelines });
});

module.exports = router;
