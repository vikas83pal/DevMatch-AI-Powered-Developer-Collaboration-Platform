/**
 * DevMatch Advanced Features - Database Schema Definitions
 * These schemas can be used with MongoDB (Mongoose) or adapted for SQL databases
 */

// ============== FEATURE 1: ADVANCED FILTERING & CANDIDATE ANALYTICS ==============

const CandidateProfileSchema = {
  id: 'string', // Primary key
  userId: 'string', // Reference to User
  
  // Basic Info
  name: 'string',
  email: 'string',
  phone: 'string',
  location: {
    city: 'string',
    country: 'string',
    timezone: 'string',
    remotePreference: 'enum: remote, hybrid, onsite, flexible'
  },
  
  // Professional Info
  skills: [{
    name: 'string',
    level: 'enum: beginner, intermediate, advanced, expert',
    yearsOfExperience: 'number',
    verified: 'boolean',
    verifiedAt: 'date',
    endorsements: 'number'
  }],
  
  experience: [{
    company: 'string',
    role: 'string',
    startDate: 'date',
    endDate: 'date',
    current: 'boolean',
    description: 'string',
    technologies: ['string']
  }],
  
  education: [{
    institution: 'string',
    degree: 'string',
    field: 'string',
    graduationYear: 'number',
    gpa: 'number'
  }],
  
  // Availability & Preferences
  availability: {
    status: 'enum: actively_looking, open_to_offers, not_looking',
    startDate: 'date',
    hoursPerWeek: 'number',
    preferredRoles: ['string'],
    salaryExpectation: {
      min: 'number',
      max: 'number',
      currency: 'string'
    }
  },
  
  // Analytics & Scoring
  analytics: {
    profileCompleteness: 'number', // 0-100
    matchScore: 'number',
    responseRate: 'number',
    averageResponseTime: 'number', // in hours
    interviewSuccessRate: 'number',
    profileViews: 'number',
    lastActiveAt: 'date'
  },
  
  // Social Links
  socialLinks: {
    github: 'string',
    linkedin: 'string',
    portfolio: 'string',
    twitter: 'string'
  },
  
  createdAt: 'date',
  updatedAt: 'date'
};

const CandidateAnalyticsSchema = {
  id: 'string',
  candidateId: 'string',
  date: 'date',
  
  // Daily Metrics
  metrics: {
    profileViews: 'number',
    searchAppearances: 'number',
    matchesReceived: 'number',
    messagesReceived: 'number',
    interviewInvites: 'number',
    applicationsSent: 'number',
    applicationsViewed: 'number'
  },
  
  // Source tracking
  viewSources: [{
    source: 'string',
    count: 'number'
  }],
  
  createdAt: 'date'
};

// ============== FEATURE 2: INTERVIEW SCHEDULING & COMMUNICATION ==============

const InterviewSchema = {
  id: 'string',
  jobId: 'string',
  candidateId: 'string',
  recruiterId: 'string',
  
  // Interview Details
  type: 'enum: phone_screen, technical, behavioral, system_design, pair_programming, final',
  round: 'number',
  
  // Scheduling
  scheduling: {
    status: 'enum: pending, scheduled, confirmed, completed, cancelled, rescheduled, no_show',
    proposedSlots: [{
      startTime: 'date',
      endTime: 'date',
      selected: 'boolean'
    }],
    confirmedSlot: {
      startTime: 'date',
      endTime: 'date'
    },
    timezone: 'string',
    duration: 'number', // in minutes
    remindersSent: ['date']
  },
  
  // Meeting Details
  meeting: {
    platform: 'enum: zoom, google_meet, teams, in_person, phone',
    link: 'string',
    meetingId: 'string',
    passcode: 'string',
    location: 'string' // For in-person
  },
  
  // Interviewers
  interviewers: [{
    userId: 'string',
    name: 'string',
    email: 'string',
    role: 'string',
    isLead: 'boolean'
  }],
  
  // Feedback
  feedback: [{
    interviewerId: 'string',
    rating: 'number', // 1-5
    recommendation: 'enum: strong_yes, yes, neutral, no, strong_no',
    technicalScore: 'number',
    communicationScore: 'number',
    problemSolvingScore: 'number',
    cultureFitScore: 'number',
    notes: 'string',
    strengths: ['string'],
    weaknesses: ['string'],
    submittedAt: 'date'
  }],
  
  // Recording & Notes
  recordingUrl: 'string',
  transcriptUrl: 'string',
  aiSummary: 'string',
  
  createdAt: 'date',
  updatedAt: 'date'
};

const CommunicationLogSchema = {
  id: 'string',
  candidateId: 'string',
  recruiterId: 'string',
  jobId: 'string',
  
  type: 'enum: email, sms, in_app, call',
  direction: 'enum: inbound, outbound',
  
  content: {
    subject: 'string',
    body: 'string',
    templateUsed: 'string'
  },
  
  status: 'enum: sent, delivered, read, replied, bounced, failed',
  
  metadata: {
    openedAt: 'date',
    clickedLinks: ['string'],
    repliedAt: 'date'
  },
  
  createdAt: 'date'
};

const EmailTemplateSchema = {
  id: 'string',
  name: 'string',
  type: 'enum: interview_invite, interview_reminder, rejection, offer, follow_up, custom',
  subject: 'string',
  body: 'string', // Supports {{variable}} placeholders
  variables: ['string'],
  isActive: 'boolean',
  createdBy: 'string',
  createdAt: 'date',
  updatedAt: 'date'
};

// ============== FEATURE 3: NATIVE MOBILE SUPPORT ==============

const DeviceRegistrationSchema = {
  id: 'string',
  userId: 'string',
  
  device: {
    type: 'enum: ios, android, web',
    token: 'string', // FCM/APNs token
    model: 'string',
    osVersion: 'string',
    appVersion: 'string'
  },
  
  preferences: {
    pushEnabled: 'boolean',
    emailEnabled: 'boolean',
    smsEnabled: 'boolean',
    quietHoursStart: 'string', // "22:00"
    quietHoursEnd: 'string', // "08:00"
    notifyNewMatch: 'boolean',
    notifyMessages: 'boolean',
    notifyInterviews: 'boolean'
  },
  
  lastActive: 'date',
  createdAt: 'date',
  updatedAt: 'date'
};

const PushNotificationLogSchema = {
  id: 'string',
  userId: 'string',
  deviceId: 'string',
  
  notification: {
    title: 'string',
    body: 'string',
    data: 'object',
    category: 'enum: match, message, interview, system'
  },
  
  status: 'enum: pending, sent, delivered, opened, failed',
  sentAt: 'date',
  deliveredAt: 'date',
  openedAt: 'date',
  error: 'string'
};

// ============== FEATURE 4: ATS/HR INTEGRATIONS ==============

const ATSIntegrationSchema = {
  id: 'string',
  organizationId: 'string',
  
  provider: 'enum: greenhouse, lever, workday, bamboohr, ashby, custom',
  
  credentials: {
    apiKey: 'string', // Encrypted
    apiSecret: 'string', // Encrypted
    webhookSecret: 'string',
    accessToken: 'string', // Encrypted
    refreshToken: 'string', // Encrypted
    tokenExpiresAt: 'date'
  },
  
  config: {
    syncEnabled: 'boolean',
    syncFrequency: 'enum: realtime, hourly, daily',
    lastSyncAt: 'date',
    syncJobs: 'boolean',
    syncCandidates: 'boolean',
    syncInterviews: 'boolean',
    autoCreateCandidates: 'boolean'
  },
  
  mappings: {
    stageMapping: 'object', // Map DevMatch stages to ATS stages
    fieldMapping: 'object' // Map DevMatch fields to ATS fields
  },
  
  status: 'enum: active, paused, error, disconnected',
  errorMessage: 'string',
  
  createdAt: 'date',
  updatedAt: 'date'
};

const ATSSyncLogSchema = {
  id: 'string',
  integrationId: 'string',
  
  syncType: 'enum: full, incremental, webhook',
  direction: 'enum: inbound, outbound',
  entity: 'enum: job, candidate, interview, application',
  
  records: {
    total: 'number',
    created: 'number',
    updated: 'number',
    failed: 'number'
  },
  
  errors: [{
    recordId: 'string',
    error: 'string'
  }],
  
  startedAt: 'date',
  completedAt: 'date',
  status: 'enum: running, completed, failed'
};

// ============== FEATURE 5: PROCTORING & ANTI-CHEATING ==============

const AssessmentSessionSchema = {
  id: 'string',
  assessmentId: 'string',
  candidateId: 'string',
  
  // Session Info
  status: 'enum: not_started, in_progress, completed, terminated, under_review',
  startedAt: 'date',
  completedAt: 'date',
  duration: 'number', // in seconds
  
  // Environment Check
  environmentCheck: {
    browserInfo: 'string',
    screenResolution: 'string',
    webcamEnabled: 'boolean',
    microphoneEnabled: 'boolean',
    screenShareEnabled: 'boolean',
    multipleMonitors: 'boolean',
    virtualMachine: 'boolean',
    passedAt: 'date'
  },
  
  // Proctoring Data
  proctoring: {
    enabled: 'boolean',
    mode: 'enum: none, basic, standard, strict',
    webcamSnapshots: [{
      timestamp: 'date',
      imageUrl: 'string',
      faceDetected: 'boolean',
      multipleFaces: 'boolean',
      confidence: 'number'
    }],
    screenRecordingUrl: 'string'
  },
  
  // Violation Tracking
  violations: [{
    type: 'enum: tab_switch, copy_paste, right_click, fullscreen_exit, multiple_faces, no_face, suspicious_behavior, external_monitor',
    timestamp: 'date',
    details: 'string',
    severity: 'enum: low, medium, high, critical',
    screenshotUrl: 'string'
  }],
  
  // Risk Assessment
  riskScore: 'number', // 0-100
  riskFactors: ['string'],
  reviewStatus: 'enum: pending, approved, flagged, rejected',
  reviewedBy: 'string',
  reviewNotes: 'string',
  
  createdAt: 'date',
  updatedAt: 'date'
};

const ProctoringConfigSchema = {
  id: 'string',
  organizationId: 'string',
  
  settings: {
    mode: 'enum: none, basic, standard, strict',
    requireWebcam: 'boolean',
    requireScreenShare: 'boolean',
    allowCopyPaste: 'boolean',
    allowRightClick: 'boolean',
    blockTabSwitch: 'boolean',
    snapshotInterval: 'number', // seconds
    maxViolations: 'number',
    autoTerminateOnViolation: 'boolean'
  },
  
  // AI Proctoring
  aiProctoring: {
    enabled: 'boolean',
    faceDetection: 'boolean',
    gazeTracking: 'boolean',
    voiceDetection: 'boolean',
    objectDetection: 'boolean' // Detect phones, books, etc.
  },
  
  createdAt: 'date',
  updatedAt: 'date'
};

// ============== FEATURE 6: TEAM COLLABORATION ==============

const TeamSchema = {
  id: 'string',
  organizationId: 'string',
  name: 'string',
  description: 'string',
  
  members: [{
    userId: 'string',
    role: 'enum: owner, admin, recruiter, hiring_manager, interviewer, viewer',
    permissions: ['string'],
    joinedAt: 'date'
  }],
  
  settings: {
    defaultJobVisibility: 'enum: team, organization, public',
    requireApprovalForHire: 'boolean',
    approvers: ['string']
  },
  
  createdAt: 'date',
  updatedAt: 'date'
};

const CollaborationNoteSchema = {
  id: 'string',
  candidateId: 'string',
  jobId: 'string',
  
  authorId: 'string',
  content: 'string',
  type: 'enum: note, question, feedback, decision',
  
  mentions: ['string'], // User IDs
  attachments: [{
    name: 'string',
    url: 'string',
    type: 'string'
  }],
  
  visibility: 'enum: private, team, all_interviewers',
  isPinned: 'boolean',
  
  reactions: [{
    userId: 'string',
    emoji: 'string'
  }],
  
  replies: [{
    authorId: 'string',
    content: 'string',
    createdAt: 'date'
  }],
  
  createdAt: 'date',
  updatedAt: 'date'
};

const HiringPipelineSchema = {
  id: 'string',
  jobId: 'string',
  candidateId: 'string',
  
  currentStage: 'string',
  stages: [{
    name: 'string',
    enteredAt: 'date',
    exitedAt: 'date',
    status: 'enum: pending, in_progress, completed, skipped',
    assignedTo: 'string',
    dueDate: 'date'
  }],
  
  scorecard: {
    overallScore: 'number',
    scores: [{
      criteria: 'string',
      score: 'number',
      weight: 'number'
    }]
  },
  
  decision: {
    status: 'enum: pending, hired, rejected, withdrawn, on_hold',
    reason: 'string',
    decidedBy: 'string',
    decidedAt: 'date'
  },
  
  createdAt: 'date',
  updatedAt: 'date'
};

// ============== FEATURE 7: AI PREDICTIVE ASSESSMENTS ==============

const AssessmentSchema = {
  id: 'string',
  title: 'string',
  description: 'string',
  type: 'enum: coding, mcq, behavioral, system_design, mixed',
  
  // Configuration
  config: {
    duration: 'number', // minutes
    passingScore: 'number',
    randomizeQuestions: 'boolean',
    showResults: 'boolean',
    allowRetake: 'boolean',
    maxAttempts: 'number'
  },
  
  questions: [{
    id: 'string',
    type: 'enum: coding, mcq, short_answer, essay, video_response',
    difficulty: 'enum: easy, medium, hard',
    points: 'number',
    content: 'object', // Question-specific content
    aiGenerated: 'boolean'
  }],
  
  skillsTested: ['string'],
  
  aiConfig: {
    autoGrade: 'boolean',
    generateFeedback: 'boolean',
    predictSuccess: 'boolean',
    adaptiveDifficulty: 'boolean'
  },
  
  createdBy: 'string',
  createdAt: 'date',
  updatedAt: 'date'
};

const AssessmentResultSchema = {
  id: 'string',
  assessmentId: 'string',
  candidateId: 'string',
  sessionId: 'string',
  
  // Scores
  scores: {
    total: 'number',
    percentage: 'number',
    bySection: [{
      section: 'string',
      score: 'number',
      maxScore: 'number'
    }],
    bySkill: [{
      skill: 'string',
      level: 'enum: beginner, intermediate, advanced, expert',
      confidence: 'number'
    }]
  },
  
  // Answers
  answers: [{
    questionId: 'string',
    response: 'object',
    isCorrect: 'boolean',
    score: 'number',
    timeSpent: 'number',
    aiEvaluation: {
      score: 'number',
      feedback: 'string',
      codeQuality: 'number',
      efficiency: 'number',
      correctness: 'number'
    }
  }],
  
  // AI Predictions
  predictions: {
    jobSuccessProbability: 'number',
    retentionProbability: 'number',
    performanceLevel: 'enum: below_average, average, above_average, exceptional',
    strengthAreas: ['string'],
    improvementAreas: ['string'],
    recommendedRole: 'string',
    confidence: 'number'
  },
  
  // Behavioral Insights
  behavioralInsights: {
    problemSolvingStyle: 'string',
    communicationStyle: 'string',
    workPreferences: ['string'],
    teamFit: 'number'
  },
  
  completedAt: 'date',
  createdAt: 'date'
};

const AIModelConfigSchema = {
  id: 'string',
  organizationId: 'string',
  
  // Model Settings
  codeEvaluation: {
    model: 'string',
    weights: {
      correctness: 'number',
      efficiency: 'number',
      codeQuality: 'number',
      bestPractices: 'number'
    }
  },
  
  predictionModel: {
    enabled: 'boolean',
    trainingDataSize: 'number',
    accuracy: 'number',
    lastTrainedAt: 'date',
    features: ['string']
  },
  
  createdAt: 'date',
  updatedAt: 'date'
};

module.exports = {
  CandidateProfileSchema,
  CandidateAnalyticsSchema,
  InterviewSchema,
  CommunicationLogSchema,
  EmailTemplateSchema,
  DeviceRegistrationSchema,
  PushNotificationLogSchema,
  ATSIntegrationSchema,
  ATSSyncLogSchema,
  AssessmentSessionSchema,
  ProctoringConfigSchema,
  TeamSchema,
  CollaborationNoteSchema,
  HiringPipelineSchema,
  AssessmentSchema,
  AssessmentResultSchema,
  AIModelConfigSchema
};
