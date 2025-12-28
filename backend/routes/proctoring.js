/**
 * FEATURE 5: Proctoring & Anti-Cheating
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();

let assessmentSessions = [];
let proctoringConfigs = [];

// Initialize default config
proctoringConfigs.push({
    id: 'default',
    organizationId: 'default',
    settings: {
        mode: 'standard',
        requireWebcam: true,
        requireScreenShare: true,
        allowCopyPaste: false,
        allowRightClick: false,
        blockTabSwitch: true,
        snapshotInterval: 30,
        maxViolations: 5,
        autoTerminateOnViolation: false
    },
    aiProctoring: {
        enabled: true,
        faceDetection: true,
        gazeTracking: false,
        voiceDetection: false,
        objectDetection: true
    }
});

// Get proctoring config
router.get('/config/:organizationId', (req, res) => {
    const config = proctoringConfigs.find(c => c.organizationId === req.params.organizationId)
        || proctoringConfigs.find(c => c.organizationId === 'default');
    res.json({ success: true, data: config });
});

// Update proctoring config
router.put('/config/:organizationId', (req, res) => {
    const { settings, aiProctoring } = req.body;
    let config = proctoringConfigs.find(c => c.organizationId === req.params.organizationId);

    if (!config) {
        config = { id: `cfg_${Date.now()}`, organizationId: req.params.organizationId };
        proctoringConfigs.push(config);
    }

    if (settings) config.settings = { ...config.settings, ...settings };
    if (aiProctoring) config.aiProctoring = { ...config.aiProctoring, ...aiProctoring };

    res.json({ success: true, data: config });
});

// Start assessment session
router.post('/sessions', (req, res) => {
    const { assessmentId, candidateId, config } = req.body;

    const session = {
        id: `sess_${Date.now()}`,
        assessmentId,
        candidateId,
        status: 'not_started',
        startedAt: null,
        completedAt: null,
        environmentCheck: {
            browserInfo: null,
            webcamEnabled: false,
            screenShareEnabled: false,
            passedAt: null
        },
        proctoring: {
            enabled: config?.mode !== 'none',
            mode: config?.mode || 'standard',
            webcamSnapshots: [],
            screenRecordingUrl: null
        },
        violations: [],
        riskScore: 0,
        reviewStatus: 'pending',
        createdAt: new Date()
    };

    assessmentSessions.push(session);
    res.status(201).json({ success: true, data: session });
});

// Environment check
router.put('/sessions/:sessionId/environment-check', (req, res) => {
    const { browserInfo, webcamEnabled, screenShareEnabled, screenResolution } = req.body;
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.environmentCheck = {
        browserInfo,
        screenResolution,
        webcamEnabled,
        screenShareEnabled,
        passedAt: webcamEnabled && screenShareEnabled ? new Date() : null
    };

    const passed = webcamEnabled && screenShareEnabled;
    res.json({ success: true, data: { passed, environmentCheck: session.environmentCheck } });
});

// Start session
router.put('/sessions/:sessionId/start', (req, res) => {
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    if (!session.environmentCheck.passedAt) {
        return res.status(400).json({ success: false, message: 'Environment check not passed' });
    }

    session.status = 'in_progress';
    session.startedAt = new Date();

    res.json({ success: true, data: session });
});

// Report violation
router.post('/sessions/:sessionId/violations', (req, res) => {
    const { type, details, severity, screenshotUrl } = req.body;
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    const violation = {
        id: `vio_${Date.now()}`,
        type,
        details,
        severity: severity || 'medium',
        screenshotUrl,
        timestamp: new Date()
    };

    session.violations.push(violation);

    // Update risk score
    const severityScores = { low: 5, medium: 15, high: 30, critical: 50 };
    session.riskScore = Math.min(100, session.riskScore + (severityScores[severity] || 15));

    // Check max violations
    const config = proctoringConfigs.find(c => c.organizationId === 'default');
    if (session.violations.length >= config.settings.maxViolations && config.settings.autoTerminateOnViolation) {
        session.status = 'terminated';
        session.completedAt = new Date();
    }

    res.json({
        success: true,
        data: {
            violation,
            totalViolations: session.violations.length,
            riskScore: session.riskScore,
            terminated: session.status === 'terminated'
        }
    });
});

// Upload webcam snapshot
router.post('/sessions/:sessionId/snapshots', (req, res) => {
    const { imageUrl, faceDetected, multipleFaces, confidence } = req.body;
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.proctoring.webcamSnapshots.push({
        timestamp: new Date(),
        imageUrl,
        faceDetected,
        multipleFaces,
        confidence
    });

    // Auto-flag violations
    if (!faceDetected) {
        session.violations.push({
            id: `vio_${Date.now()}`,
            type: 'no_face',
            details: 'No face detected in frame',
            severity: 'medium',
            timestamp: new Date()
        });
        session.riskScore = Math.min(100, session.riskScore + 10);
    } else if (multipleFaces) {
        session.violations.push({
            id: `vio_${Date.now()}`,
            type: 'multiple_faces',
            details: 'Multiple faces detected',
            severity: 'high',
            timestamp: new Date()
        });
        session.riskScore = Math.min(100, session.riskScore + 25);
    }

    res.json({ success: true, data: { snapshotCount: session.proctoring.webcamSnapshots.length } });
});

// Complete session
router.put('/sessions/:sessionId/complete', (req, res) => {
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.status = 'completed';
    session.completedAt = new Date();
    session.duration = (new Date(session.completedAt) - new Date(session.startedAt)) / 1000;

    // Determine review status based on risk score
    if (session.riskScore >= 50) {
        session.reviewStatus = 'flagged';
    } else if (session.riskScore >= 25) {
        session.reviewStatus = 'pending';
    } else {
        session.reviewStatus = 'approved';
    }

    res.json({ success: true, data: session });
});

// Get session
router.get('/sessions/:sessionId', (req, res) => {
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, data: session });
});

// Review session
router.put('/sessions/:sessionId/review', (req, res) => {
    const { status, reviewedBy, notes } = req.body;
    const session = assessmentSessions.find(s => s.id === req.params.sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    session.reviewStatus = status;
    session.reviewedBy = reviewedBy;
    session.reviewNotes = notes;
    session.reviewedAt = new Date();

    res.json({ success: true, data: session });
});

// Get flagged sessions
router.get('/sessions/flagged/:organizationId', (req, res) => {
    const flagged = assessmentSessions.filter(
        s => s.reviewStatus === 'flagged' || s.riskScore >= 50
    );
    res.json({ success: true, data: flagged });
});

module.exports = router;
