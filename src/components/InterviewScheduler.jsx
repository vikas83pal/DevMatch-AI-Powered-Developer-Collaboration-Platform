import React, { useState, useEffect } from 'react';
import './InterviewScheduler.css';

const InterviewScheduler = ({ candidateId, jobId, onSchedule, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'technical',
    duration: 60,
    platform: 'zoom',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    interviewers: [],
    proposedSlots: []
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const interviewTypes = [
    { id: 'phone_screen', label: 'Phone Screen', icon: '📞', duration: 30 },
    { id: 'technical', label: 'Technical Interview', icon: '💻', duration: 60 },
    { id: 'behavioral', label: 'Behavioral Interview', icon: '🗣️', duration: 45 },
    { id: 'system_design', label: 'System Design', icon: '🏗️', duration: 60 },
    { id: 'pair_programming', label: 'Pair Programming', icon: '👥', duration: 90 },
    { id: 'final', label: 'Final Round', icon: '🎯', duration: 60 }
  ];

  const platforms = [
    { id: 'zoom', label: 'Zoom', icon: '📹' },
    { id: 'google_meet', label: 'Google Meet', icon: '🎥' },
    { id: 'teams', label: 'Microsoft Teams', icon: '💼' },
    { id: 'in_person', label: 'In Person', icon: '🏢' },
    { id: 'phone', label: 'Phone Call', icon: '📱' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const addTimeSlot = () => {
    if (selectedDate && selectedTime) {
      const startTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const endTime = new Date(startTime.getTime() + formData.duration * 60000);
      
      const newSlot = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        display: `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
      
      if (!formData.proposedSlots.find(s => s.startTime === newSlot.startTime)) {
        setFormData({
          ...formData,
          proposedSlots: [...formData.proposedSlots, newSlot]
        });
      }
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const removeSlot = (index) => {
    setFormData({
      ...formData,
      proposedSlots: formData.proposedSlots.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          candidateId,
          ...formData,
          sendInvite: true
        })
      });
      
      const data = await response.json();
      if (data.success) {
        onSchedule?.(data.data);
        onClose?.();
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error);
    }
    setLoading(false);
  };

  return (
    <div className="interview-scheduler-overlay">
      <div className="interview-scheduler">
        {/* Header */}
        <div className="scheduler-header">
          <h2>Schedule Interview</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3].map(s => (
            <div key={s} className={`step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
              <span className="step-number">{s}</span>
              <span className="step-label">
                {s === 1 ? 'Interview Type' : s === 2 ? 'Time Slots' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Interview Type */}
        {step === 1 && (
          <div className="scheduler-step">
            <h3>Select Interview Type</h3>
            <div className="type-grid">
              {interviewTypes.map(type => (
                <button
                  key={type.id}
                  className={`type-card ${formData.type === type.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, type: type.id, duration: type.duration })}
                >
                  <span className="type-icon">{type.icon}</span>
                  <span className="type-label">{type.label}</span>
                  <span className="type-duration">{type.duration} min</span>
                </button>
              ))}
            </div>

            <h3>Select Platform</h3>
            <div className="platform-grid">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  className={`platform-card ${formData.platform === platform.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, platform: platform.id })}
                >
                  <span className="platform-icon">{platform.icon}</span>
                  <span className="platform-label">{platform.label}</span>
                </button>
              ))}
            </div>

            <div className="duration-selector">
              <label>Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                min={15}
                max={180}
                step={15}
              />
            </div>
          </div>
        )}

        {/* Step 2: Time Slots */}
        {step === 2 && (
          <div className="scheduler-step">
            <h3>Propose Time Slots</h3>
            <p className="step-description">Add multiple time slots for the candidate to choose from.</p>

            <div className="slot-picker">
              <div className="date-picker">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="time-picker">
                <label>Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <button className="add-slot-btn" onClick={addTimeSlot}>
                + Add Slot
              </button>
            </div>

            <div className="proposed-slots">
              <h4>Proposed Slots ({formData.proposedSlots.length})</h4>
              {formData.proposedSlots.length === 0 ? (
                <p className="no-slots">No time slots added yet</p>
              ) : (
                <div className="slots-list">
                  {formData.proposedSlots.map((slot, index) => (
                    <div key={index} className="slot-item">
                      <span className="slot-datetime">{slot.display}</span>
                      <span className="slot-duration">{formData.duration} min</span>
                      <button className="remove-slot" onClick={() => removeSlot(index)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="timezone-info">
              <span>Timezone: {formData.timezone}</span>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="scheduler-step">
            <h3>Review & Confirm</h3>
            
            <div className="review-card">
              <div className="review-item">
                <span className="review-label">Interview Type</span>
                <span className="review-value">
                  {interviewTypes.find(t => t.id === formData.type)?.icon}{' '}
                  {interviewTypes.find(t => t.id === formData.type)?.label}
                </span>
              </div>
              
              <div className="review-item">
                <span className="review-label">Platform</span>
                <span className="review-value">
                  {platforms.find(p => p.id === formData.platform)?.icon}{' '}
                  {platforms.find(p => p.id === formData.platform)?.label}
                </span>
              </div>
              
              <div className="review-item">
                <span className="review-label">Duration</span>
                <span className="review-value">{formData.duration} minutes</span>
              </div>
              
              <div className="review-item full-width">
                <span className="review-label">Proposed Time Slots</span>
                <div className="review-slots">
                  {formData.proposedSlots.map((slot, index) => (
                    <span key={index} className="review-slot">{slot.display}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="notification-preview">
              <h4>📧 Invitation Email Preview</h4>
              <div className="email-preview">
                <p><strong>Subject:</strong> Interview Invitation - {interviewTypes.find(t => t.id === formData.type)?.label}</p>
                <p>Dear Candidate,</p>
                <p>We are excited to invite you for an interview!</p>
                <p>Please select your preferred time slot from the options provided.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="scheduler-footer">
          {step > 1 && (
            <button className="back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}
          <div className="footer-spacer"></div>
          {step < 3 ? (
            <button 
              className="next-btn" 
              onClick={() => setStep(step + 1)}
              disabled={step === 2 && formData.proposedSlots.length === 0}
            >
              Next →
            </button>
          ) : (
            <button 
              className="submit-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Scheduling...' : '📅 Schedule Interview'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
