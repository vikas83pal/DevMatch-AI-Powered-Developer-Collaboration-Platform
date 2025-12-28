import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AssessmentProctor.css';

const AssessmentProctor = ({ 
  assessmentId, 
  candidateId, 
  config = {},
  onViolation,
  onComplete,
  children 
}) => {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('initializing');
  const [violations, setViolations] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [environmentCheck, setEnvironmentCheck] = useState({
    webcam: false,
    screenShare: false,
    fullscreen: false
  });

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const snapshotIntervalRef = useRef(null);
  const lastTabSwitchRef = useRef(Date.now());

  const proctoringConfig = {
    mode: config.mode || 'standard',
    requireWebcam: config.requireWebcam !== false,
    requireScreenShare: config.requireScreenShare !== false,
    snapshotInterval: config.snapshotInterval || 30,
    maxViolations: config.maxViolations || 5,
    ...config
  };

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/proctoring/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId,
            candidateId,
            config: proctoringConfig
          })
        });
        const data = await response.json();
        if (data.success) {
          setSession(data.data);
          setStatus('environment_check');
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();
    return () => cleanup();
  }, [assessmentId, candidateId]);

  // Cleanup function
  const cleanup = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (snapshotIntervalRef.current) {
      clearInterval(snapshotIntervalRef.current);
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('copy', handleCopyPaste);
    document.removeEventListener('paste', handleCopyPaste);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  };

  // Handle visibility change (tab switch)
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && status === 'in_progress') {
      const now = Date.now();
      if (now - lastTabSwitchRef.current > 3000) {
        reportViolation('tab_switch', 'Candidate switched to another tab', 'high');
        lastTabSwitchRef.current = now;
      }
    }
  }, [status]);

  // Handle right-click
  const handleContextMenu = useCallback((e) => {
    if (status === 'in_progress' && !proctoringConfig.allowRightClick) {
      e.preventDefault();
      reportViolation('right_click', 'Right-click attempted', 'low');
    }
  }, [status]);

  // Handle copy/paste
  const handleCopyPaste = useCallback((e) => {
    if (status === 'in_progress' && !proctoringConfig.allowCopyPaste) {
      e.preventDefault();
      reportViolation('copy_paste', `${e.type} attempted`, 'medium');
    }
  }, [status]);

  // Handle fullscreen change
  const handleFullscreenChange = useCallback(() => {
    if (status === 'in_progress' && !document.fullscreenElement) {
      reportViolation('fullscreen_exit', 'Exited fullscreen mode', 'medium');
      setEnvironmentCheck(prev => ({ ...prev, fullscreen: false }));
    }
  }, [status]);

  // Report violation
  const reportViolation = async (type, details, severity) => {
    const violation = { type, details, severity, timestamp: new Date() };
    setViolations(prev => [...prev, violation]);
    
    // Calculate risk score
    const severityScores = { low: 5, medium: 15, high: 30, critical: 50 };
    setRiskScore(prev => Math.min(100, prev + (severityScores[severity] || 15)));

    // Show warning
    setWarningMessage(getWarningMessage(type));
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 4000);

    // Report to server
    if (session) {
      try {
        await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/violations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, details, severity })
        });
      } catch (error) {
        console.error('Failed to report violation:', error);
      }
    }

    onViolation?.(violation);

    // Check max violations
    if (violations.length + 1 >= proctoringConfig.maxViolations) {
      terminateAssessment('Maximum violations exceeded');
    }
  };

  const getWarningMessage = (type) => {
    const messages = {
      tab_switch: '⚠️ Tab switching detected! Please stay on this page.',
      right_click: '⚠️ Right-click is disabled during the assessment.',
      copy_paste: '⚠️ Copy/paste is disabled during the assessment.',
      fullscreen_exit: '⚠️ Please return to fullscreen mode.',
      no_face: '⚠️ Your face is not visible. Please stay in frame.',
      multiple_faces: '⚠️ Multiple faces detected. Only you should be visible.'
    };
    return messages[type] || '⚠️ Suspicious activity detected.';
  };

  // Start webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaStreamRef.current = stream;
      setEnvironmentCheck(prev => ({ ...prev, webcam: true }));
      return true;
    } catch (error) {
      console.error('Failed to start webcam:', error);
      return false;
    }
  };

  // Start screen share
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false
      });
      
      setEnvironmentCheck(prev => ({ ...prev, screenShare: true }));
      
      stream.getVideoTracks()[0].onended = () => {
        if (status === 'in_progress') {
          reportViolation('screen_share_stopped', 'Screen sharing stopped', 'high');
          setEnvironmentCheck(prev => ({ ...prev, screenShare: false }));
        }
      };
      
      return true;
    } catch (error) {
      console.error('Failed to start screen share:', error);
      return false;
    }
  };

  // Enter fullscreen
  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setEnvironmentCheck(prev => ({ ...prev, fullscreen: true }));
      return true;
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
      return false;
    }
  };

  // Complete environment check
  const completeEnvironmentCheck = async () => {
    if (session) {
      await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/environment-check`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          browserInfo: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          webcamEnabled: environmentCheck.webcam,
          screenShareEnabled: environmentCheck.screenShare
        })
      });
    }
  };

  // Start assessment
  const startAssessment = async () => {
    // Complete environment check
    await completeEnvironmentCheck();

    // Start session on server
    if (session) {
      await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/start`, {
        method: 'PUT'
      });
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Start snapshot interval
    if (proctoringConfig.requireWebcam) {
      snapshotIntervalRef.current = setInterval(() => {
        captureSnapshot();
      }, proctoringConfig.snapshotInterval * 1000);
    }

    setStatus('in_progress');
  };

  // Capture webcam snapshot
  const captureSnapshot = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imageUrl = canvas.toDataURL('image/jpeg', 0.7);
    
    // Mock face detection (in production, use AI service)
    const faceDetected = Math.random() > 0.1;
    const multipleFaces = Math.random() < 0.05;

    if (!faceDetected) {
      reportViolation('no_face', 'No face detected in frame', 'medium');
    } else if (multipleFaces) {
      reportViolation('multiple_faces', 'Multiple faces detected', 'high');
    }

    if (session) {
      await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/snapshots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          faceDetected,
          multipleFaces,
          confidence: 0.95
        })
      });
    }
  };

  // Terminate assessment
  const terminateAssessment = async (reason) => {
    cleanup();
    setStatus('terminated');
    
    if (session) {
      await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
    }
  };

  // Complete assessment
  const handleComplete = async () => {
    cleanup();
    setStatus('completed');
    
    if (session) {
      await fetch(`http://localhost:5000/api/proctoring/sessions/${session.id}/complete`, {
        method: 'PUT'
      });
    }
    
    onComplete?.({ violations, riskScore });
  };

  // Render environment check
  if (status === 'environment_check') {
    return (
      <div className="proctor-container">
        <div className="environment-check">
          <h2>🔒 Assessment Security Check</h2>
          <p>Please complete the following checks before starting:</p>

          <div className="check-items">
            <div className={`check-item ${environmentCheck.webcam ? 'passed' : ''}`}>
              <span className="check-icon">{environmentCheck.webcam ? '✅' : '📷'}</span>
              <div className="check-info">
                <h4>Webcam Access</h4>
                <p>Required for identity verification</p>
              </div>
              {!environmentCheck.webcam && (
                <button onClick={startWebcam}>Enable Webcam</button>
              )}
            </div>

            {proctoringConfig.requireScreenShare && (
              <div className={`check-item ${environmentCheck.screenShare ? 'passed' : ''}`}>
                <span className="check-icon">{environmentCheck.screenShare ? '✅' : '🖥️'}</span>
                <div className="check-info">
                  <h4>Screen Sharing</h4>
                  <p>Required for proctoring</p>
                </div>
                {!environmentCheck.screenShare && (
                  <button onClick={startScreenShare}>Share Screen</button>
                )}
              </div>
            )}

            <div className={`check-item ${environmentCheck.fullscreen ? 'passed' : ''}`}>
              <span className="check-icon">{environmentCheck.fullscreen ? '✅' : '⛶'}</span>
              <div className="check-info">
                <h4>Fullscreen Mode</h4>
                <p>Required for focused assessment</p>
              </div>
              {!environmentCheck.fullscreen && (
                <button onClick={enterFullscreen}>Enter Fullscreen</button>
              )}
            </div>
          </div>

          {environmentCheck.webcam && (
            <div className="webcam-preview">
              <video ref={videoRef} autoPlay muted playsInline />
              <span>Webcam Preview</span>
            </div>
          )}

          <div className="check-actions">
            <button 
              className="start-btn"
              disabled={!environmentCheck.webcam || (proctoringConfig.requireScreenShare && !environmentCheck.screenShare)}
              onClick={startAssessment}
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render terminated state
  if (status === 'terminated') {
    return (
      <div className="proctor-container">
        <div className="terminated-message">
          <span className="terminated-icon">🚫</span>
          <h2>Assessment Terminated</h2>
          <p>Your assessment has been terminated due to multiple violations.</p>
          <p>Violations: {violations.length}</p>
        </div>
      </div>
    );
  }

  // Render assessment with proctoring overlay
  return (
    <div className="proctor-container">
      {/* Warning toast */}
      {showWarning && (
        <div className="warning-toast">
          {warningMessage}
        </div>
      )}

      {/* Proctoring sidebar */}
      <div className="proctor-sidebar">
        <div className="webcam-container">
          <video ref={videoRef} autoPlay muted playsInline />
          <span className="recording-badge">● Recording</span>
        </div>

        <div className="proctor-stats">
          <div className="stat-item">
            <span className="stat-label">Risk Score</span>
            <div className="risk-bar">
              <div 
                className={`risk-fill ${riskScore > 50 ? 'high' : riskScore > 25 ? 'medium' : 'low'}`}
                style={{ width: `${riskScore}%` }}
              />
            </div>
            <span className="stat-value">{riskScore}%</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Violations</span>
            <span className="stat-value violations">{violations.length}/{proctoringConfig.maxViolations}</span>
          </div>
        </div>

        <div className="proctor-status">
          <span className={`status-badge ${status}`}>
            {status === 'in_progress' ? '🟢 Live Proctoring' : status}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="proctor-content">
        {children}
        
        <button className="submit-assessment-btn" onClick={handleComplete}>
          Submit Assessment
        </button>
      </div>
    </div>
  );
};

export default AssessmentProctor;
