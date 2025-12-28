/**
 * FEATURE 2: Interview Scheduling & Candidate Communication
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();

// ============== IN-MEMORY DATA STORE ==============
let interviews = [];
let communicationLogs = [];
let emailTemplates = [];
let calendarIntegrations = [];

// Initialize sample data
const initializeData = () => {
    emailTemplates = [
        {
            id: 'tpl_1',
            name: 'Interview Invitation',
            type: 'interview_invite',
            subject: 'Interview Invitation for {{position}} at {{company}}',
            body: `Dear {{candidateName}},

We are excited to invite you for an interview for the {{position}} position at {{company}}.

Interview Details:
- Type: {{interviewType}}
- Duration: {{duration}} minutes
- Date: {{date}}
- Time: {{time}} ({{timezone}})

{{#if meetingLink}}
Join the meeting: {{meetingLink}}
{{/if}}

Please confirm your availability by clicking the link below:
{{confirmationLink}}

If you have any questions, please don't hesitate to reach out.

Best regards,
{{recruiterName}}
{{company}} Talent Team`,
            variables: ['candidateName', 'position', 'company', 'interviewType', 'duration', 'date', 'time', 'timezone', 'meetingLink', 'confirmationLink', 'recruiterName'],
            isActive: true
        },
        {
            id: 'tpl_2',
            name: 'Interview Reminder',
            type: 'interview_reminder',
            subject: 'Reminder: Your interview is in {{hoursUntil}} hours',
            body: `Hi {{candidateName}},

This is a friendly reminder that your interview for {{position}} is scheduled for:

📅 {{date}} at {{time}} ({{timezone}})
⏱️ Duration: {{duration}} minutes

{{#if meetingLink}}
🔗 Join here: {{meetingLink}}
{{/if}}

Tips for your interview:
• Test your audio/video beforehand
• Find a quiet, well-lit space
• Have a copy of your resume ready

Good luck!

Best,
{{company}} Talent Team`,
            variables: ['candidateName', 'position', 'date', 'time', 'timezone', 'duration', 'meetingLink', 'hoursUntil', 'company'],
            isActive: true
        },
        {
            id: 'tpl_3',
            name: 'Interview Cancellation',
            type: 'cancellation',
            subject: 'Interview Cancelled - {{position}} at {{company}}',
            body: `Dear {{candidateName}},

We regret to inform you that the interview scheduled for {{date}} has been cancelled.

{{#if reason}}
Reason: {{reason}}
{{/if}}

{{#if rescheduleLink}}
We would like to reschedule. Please select a new time: {{rescheduleLink}}
{{/if}}

We apologize for any inconvenience.

Best regards,
{{recruiterName}}`,
            variables: ['candidateName', 'position', 'company', 'date', 'reason', 'rescheduleLink', 'recruiterName'],
            isActive: true
        }
    ];

    interviews = [
        {
            id: 'int_1',
            jobId: 'job_1',
            candidateId: 'cand_1',
            recruiterId: 'rec_1',
            type: 'technical',
            round: 1,
            scheduling: {
                status: 'scheduled',
                proposedSlots: [
                    { startTime: '2024-01-15T10:00:00Z', endTime: '2024-01-15T11:00:00Z', selected: true },
                    { startTime: '2024-01-15T14:00:00Z', endTime: '2024-01-15T15:00:00Z', selected: false }
                ],
                confirmedSlot: { startTime: '2024-01-15T10:00:00Z', endTime: '2024-01-15T11:00:00Z' },
                timezone: 'America/New_York',
                duration: 60,
                remindersSent: []
            },
            meeting: {
                platform: 'zoom',
                link: 'https://zoom.us/j/123456789',
                meetingId: '123456789',
                passcode: 'abc123'
            },
            interviewers: [
                { userId: 'user_10', name: 'John Smith', email: 'john.smith@company.com', role: 'Engineering Manager', isLead: true }
            ],
            feedback: [],
            createdAt: new Date()
        }
    ];
};

initializeData();

// ============== HELPER FUNCTIONS ==============

/**
 * Generate meeting link based on platform
 */
const generateMeetingLink = async (platform, interviewDetails) => {
    // In production, integrate with actual APIs (Zoom, Google Meet, Teams)
    const mockLinks = {
        zoom: `https://zoom.us/j/${Math.random().toString().slice(2, 12)}`,
        google_meet: `https://meet.google.com/${Math.random().toString(36).slice(2, 12)}`,
        teams: `https://teams.microsoft.com/l/meetup/${Math.random().toString(36).slice(2, 12)}`
    };

    return {
        link: mockLinks[platform] || mockLinks.zoom,
        meetingId: Math.random().toString().slice(2, 12),
        passcode: Math.random().toString(36).slice(2, 8)
    };
};

/**
 * Send notification (email/push)
 */
const sendNotification = async (type, recipient, data) => {
    // In production, integrate with email service (SendGrid, SES) and push notification service
    console.log(`[Notification] Sending ${type} to ${recipient.email}:`, data.subject);

    communicationLogs.push({
        id: `comm_${Date.now()}`,
        candidateId: data.candidateId,
        recruiterId: data.recruiterId,
        type: 'email',
        direction: 'outbound',
        content: {
            subject: data.subject,
            body: data.body,
            templateUsed: data.templateId
        },
        status: 'sent',
        createdAt: new Date()
    });

    return { success: true, messageId: `msg_${Date.now()}` };
};

/**
 * Process template variables
 */
const processTemplate = (template, variables) => {
    let subject = template.subject;
    let body = template.body;

    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        subject = subject.replace(regex, variables[key] || '');
        body = body.replace(regex, variables[key] || '');
    });

    // Handle conditionals (simplified)
    body = body.replace(/{{#if \w+}}[\s\S]*?{{\/if}}/g, (match) => {
        const varMatch = match.match(/{{#if (\w+)}}/);
        if (varMatch && variables[varMatch[1]]) {
            return match.replace(/{{#if \w+}}/, '').replace(/{{\/if}}/, '');
        }
        return '';
    });

    return { subject, body };
};

// ============== API ROUTES ==============

/**
 * @route   POST /api/interviews
 * @desc    Create a new interview
 * @access  Private
 */
router.post('/', async (req, res) => {
    try {
        const {
            jobId,
            candidateId,
            recruiterId,
            type,
            round,
            proposedSlots,
            duration,
            timezone,
            platform,
            interviewers,
            sendInvite = true
        } = req.body;

        // Generate meeting link
        const meetingDetails = await generateMeetingLink(platform, { type, duration });

        const newInterview = {
            id: `int_${Date.now()}`,
            jobId,
            candidateId,
            recruiterId,
            type,
            round: round || 1,
            scheduling: {
                status: 'pending',
                proposedSlots: proposedSlots.map(slot => ({ ...slot, selected: false })),
                confirmedSlot: null,
                timezone,
                duration,
                remindersSent: []
            },
            meeting: {
                platform,
                ...meetingDetails
            },
            interviewers: interviewers || [],
            feedback: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        interviews.push(newInterview);

        // Send interview invitation
        if (sendInvite) {
            const template = emailTemplates.find(t => t.type === 'interview_invite');
            if (template) {
                const { subject, body } = processTemplate(template, {
                    candidateName: 'Candidate', // Would fetch from candidate data
                    position: 'Software Engineer',
                    company: 'DevMatch',
                    interviewType: type,
                    duration: duration.toString(),
                    timezone,
                    meetingLink: meetingDetails.link,
                    recruiterName: 'Recruiting Team'
                });

                await sendNotification('email', { email: 'candidate@example.com' }, {
                    subject,
                    body,
                    candidateId,
                    recruiterId,
                    templateId: template.id
                });
            }
        }

        res.status(201).json({
            success: true,
            message: 'Interview created successfully',
            data: newInterview
        });
    } catch (error) {
        console.error('Error creating interview:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/interviews
 * @desc    Get all interviews with filtering
 * @access  Private
 */
router.get('/', (req, res) => {
    try {
        const { candidateId, recruiterId, jobId, status, type, startDate, endDate } = req.query;

        let filteredInterviews = [...interviews];

        if (candidateId) {
            filteredInterviews = filteredInterviews.filter(i => i.candidateId === candidateId);
        }
        if (recruiterId) {
            filteredInterviews = filteredInterviews.filter(i => i.recruiterId === recruiterId);
        }
        if (jobId) {
            filteredInterviews = filteredInterviews.filter(i => i.jobId === jobId);
        }
        if (status) {
            filteredInterviews = filteredInterviews.filter(i => i.scheduling.status === status);
        }
        if (type) {
            filteredInterviews = filteredInterviews.filter(i => i.type === type);
        }
        if (startDate) {
            const start = new Date(startDate);
            filteredInterviews = filteredInterviews.filter(i =>
                i.scheduling.confirmedSlot && new Date(i.scheduling.confirmedSlot.startTime) >= start
            );
        }
        if (endDate) {
            const end = new Date(endDate);
            filteredInterviews = filteredInterviews.filter(i =>
                i.scheduling.confirmedSlot && new Date(i.scheduling.confirmedSlot.startTime) <= end
            );
        }

        res.json({
            success: true,
            data: {
                interviews: filteredInterviews,
                total: filteredInterviews.length
            }
        });
    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/interviews/:id
 * @desc    Get interview by ID
 * @access  Private
 */
router.get('/:id', (req, res) => {
    try {
        const interview = interviews.find(i => i.id === req.params.id);

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        res.json({
            success: true,
            data: interview
        });
    } catch (error) {
        console.error('Error fetching interview:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/interviews/:id/confirm
 * @desc    Confirm interview slot
 * @access  Private
 */
router.put('/:id/confirm', async (req, res) => {
    try {
        const { slotIndex, sendConfirmation = true } = req.body;
        const interviewIndex = interviews.findIndex(i => i.id === req.params.id);

        if (interviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        const interview = interviews[interviewIndex];
        const selectedSlot = interview.scheduling.proposedSlots[slotIndex];

        if (!selectedSlot) {
            return res.status(400).json({ success: false, message: 'Invalid slot index' });
        }

        // Update interview
        interview.scheduling.status = 'confirmed';
        interview.scheduling.confirmedSlot = selectedSlot;
        interview.scheduling.proposedSlots[slotIndex].selected = true;
        interview.updatedAt = new Date();

        // Send confirmation
        if (sendConfirmation) {
            await sendNotification('email', { email: 'candidate@example.com' }, {
                subject: 'Interview Confirmed',
                body: `Your interview has been confirmed for ${new Date(selectedSlot.startTime).toLocaleString()}`,
                candidateId: interview.candidateId,
                recruiterId: interview.recruiterId
            });
        }

        res.json({
            success: true,
            message: 'Interview confirmed',
            data: interview
        });
    } catch (error) {
        console.error('Error confirming interview:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/interviews/:id/reschedule
 * @desc    Reschedule interview
 * @access  Private
 */
router.put('/:id/reschedule', async (req, res) => {
    try {
        const { newSlots, reason, notifyCandidate = true } = req.body;
        const interviewIndex = interviews.findIndex(i => i.id === req.params.id);

        if (interviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        const interview = interviews[interviewIndex];

        // Update interview
        interview.scheduling.status = 'rescheduled';
        interview.scheduling.proposedSlots = newSlots.map(slot => ({ ...slot, selected: false }));
        interview.scheduling.confirmedSlot = null;
        interview.updatedAt = new Date();

        // Notify candidate
        if (notifyCandidate) {
            await sendNotification('email', { email: 'candidate@example.com' }, {
                subject: 'Interview Rescheduled',
                body: `Your interview has been rescheduled. Reason: ${reason}. Please select a new time.`,
                candidateId: interview.candidateId,
                recruiterId: interview.recruiterId
            });
        }

        res.json({
            success: true,
            message: 'Interview rescheduled',
            data: interview
        });
    } catch (error) {
        console.error('Error rescheduling interview:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/interviews/:id/cancel
 * @desc    Cancel interview
 * @access  Private
 */
router.put('/:id/cancel', async (req, res) => {
    try {
        const { reason, notifyAll = true } = req.body;
        const interviewIndex = interviews.findIndex(i => i.id === req.params.id);

        if (interviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        const interview = interviews[interviewIndex];
        interview.scheduling.status = 'cancelled';
        interview.cancellationReason = reason;
        interview.updatedAt = new Date();

        // Notify all parties
        if (notifyAll) {
            const template = emailTemplates.find(t => t.type === 'cancellation');
            if (template) {
                const { subject, body } = processTemplate(template, {
                    candidateName: 'Candidate',
                    position: 'Software Engineer',
                    company: 'DevMatch',
                    date: interview.scheduling.confirmedSlot?.startTime,
                    reason,
                    recruiterName: 'Recruiting Team'
                });

                await sendNotification('email', { email: 'candidate@example.com' }, {
                    subject,
                    body,
                    candidateId: interview.candidateId,
                    recruiterId: interview.recruiterId,
                    templateId: template.id
                });
            }
        }

        res.json({
            success: true,
            message: 'Interview cancelled',
            data: interview
        });
    } catch (error) {
        console.error('Error cancelling interview:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/interviews/:id/feedback
 * @desc    Submit interview feedback
 * @access  Private
 */
router.post('/:id/feedback', (req, res) => {
    try {
        const {
            interviewerId,
            rating,
            recommendation,
            technicalScore,
            communicationScore,
            problemSolvingScore,
            cultureFitScore,
            notes,
            strengths,
            weaknesses
        } = req.body;

        const interviewIndex = interviews.findIndex(i => i.id === req.params.id);

        if (interviewIndex === -1) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        const feedback = {
            interviewerId,
            rating,
            recommendation,
            technicalScore,
            communicationScore,
            problemSolvingScore,
            cultureFitScore,
            notes,
            strengths: strengths || [],
            weaknesses: weaknesses || [],
            submittedAt: new Date()
        };

        interviews[interviewIndex].feedback.push(feedback);
        interviews[interviewIndex].updatedAt = new Date();

        // Check if all interviewers have submitted feedback
        const allFeedbackSubmitted = interviews[interviewIndex].interviewers.every(
            interviewer => interviews[interviewIndex].feedback.some(f => f.interviewerId === interviewer.userId)
        );

        if (allFeedbackSubmitted) {
            interviews[interviewIndex].scheduling.status = 'completed';
        }

        res.json({
            success: true,
            message: 'Feedback submitted',
            data: {
                feedback,
                allFeedbackSubmitted
            }
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/interviews/send-reminders
 * @desc    Send reminders for upcoming interviews
 * @access  Private (Cron job)
 */
router.post('/send-reminders', async (req, res) => {
    try {
        const { hoursBeforeInterview = 24 } = req.body;
        const now = new Date();
        const reminderThreshold = new Date(now.getTime() + hoursBeforeInterview * 60 * 60 * 1000);

        const upcomingInterviews = interviews.filter(interview => {
            if (interview.scheduling.status !== 'confirmed') return false;
            if (!interview.scheduling.confirmedSlot) return false;

            const interviewTime = new Date(interview.scheduling.confirmedSlot.startTime);
            return interviewTime <= reminderThreshold && interviewTime > now;
        });

        const remindersSent = [];

        for (const interview of upcomingInterviews) {
            // Check if reminder already sent
            const alreadySent = interview.scheduling.remindersSent.some(r => {
                const sentTime = new Date(r);
                return (reminderThreshold - sentTime) < 3600000; // Within 1 hour
            });

            if (!alreadySent) {
                const template = emailTemplates.find(t => t.type === 'interview_reminder');
                if (template) {
                    const { subject, body } = processTemplate(template, {
                        candidateName: 'Candidate',
                        position: 'Software Engineer',
                        date: new Date(interview.scheduling.confirmedSlot.startTime).toLocaleDateString(),
                        time: new Date(interview.scheduling.confirmedSlot.startTime).toLocaleTimeString(),
                        timezone: interview.scheduling.timezone,
                        duration: interview.scheduling.duration.toString(),
                        meetingLink: interview.meeting.link,
                        hoursUntil: hoursBeforeInterview.toString(),
                        company: 'DevMatch'
                    });

                    await sendNotification('email', { email: 'candidate@example.com' }, {
                        subject,
                        body,
                        candidateId: interview.candidateId,
                        recruiterId: interview.recruiterId,
                        templateId: template.id
                    });

                    interview.scheduling.remindersSent.push(new Date());
                    remindersSent.push(interview.id);
                }
            }
        }

        res.json({
            success: true,
            message: `Sent ${remindersSent.length} reminders`,
            data: { interviewIds: remindersSent }
        });
    } catch (error) {
        console.error('Error sending reminders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/interviews/templates
 * @desc    Get all email templates
 * @access  Private
 */
router.get('/templates/all', (req, res) => {
    try {
        res.json({
            success: true,
            data: emailTemplates
        });
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/interviews/templates
 * @desc    Create email template
 * @access  Private
 */
router.post('/templates', (req, res) => {
    try {
        const { name, type, subject, body, variables } = req.body;

        const newTemplate = {
            id: `tpl_${Date.now()}`,
            name,
            type,
            subject,
            body,
            variables: variables || [],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        emailTemplates.push(newTemplate);

        res.status(201).json({
            success: true,
            message: 'Template created',
            data: newTemplate
        });
    } catch (error) {
        console.error('Error creating template:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/interviews/communications/:candidateId
 * @desc    Get communication history for a candidate
 * @access  Private
 */
router.get('/communications/:candidateId', (req, res) => {
    try {
        const candidateLogs = communicationLogs.filter(
            log => log.candidateId === req.params.candidateId
        );

        res.json({
            success: true,
            data: candidateLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        });
    } catch (error) {
        console.error('Error fetching communications:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/interviews/communications/send
 * @desc    Send custom communication
 * @access  Private
 */
router.post('/communications/send', async (req, res) => {
    try {
        const { candidateId, recruiterId, type, subject, body, templateId } = req.body;

        let finalSubject = subject;
        let finalBody = body;

        // If using template
        if (templateId) {
            const template = emailTemplates.find(t => t.id === templateId);
            if (template) {
                const processed = processTemplate(template, req.body.variables || {});
                finalSubject = processed.subject;
                finalBody = processed.body;
            }
        }

        const result = await sendNotification(type || 'email', { email: 'candidate@example.com' }, {
            subject: finalSubject,
            body: finalBody,
            candidateId,
            recruiterId,
            templateId
        });

        res.json({
            success: true,
            message: 'Communication sent',
            data: result
        });
    } catch (error) {
        console.error('Error sending communication:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
