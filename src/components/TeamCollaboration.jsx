import React, { useState, useEffect } from 'react';
import './TeamCollaboration.css';

const TeamCollaboration = ({ candidateId, jobId, currentUser }) => {
  const [notes, setNotes] = useState([]);
  const [pipeline, setPipeline] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState('note');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');

  const noteTypes = [
    { id: 'note', label: 'Note', icon: '📝' },
    { id: 'question', label: 'Question', icon: '❓' },
    { id: 'feedback', label: 'Feedback', icon: '💬' },
    { id: 'decision', label: 'Decision', icon: '✅' }
  ];

  const emojis = ['👍', '👎', '❤️', '🎉', '🤔', '👀'];

  useEffect(() => {
    fetchNotes();
    fetchPipeline();
  }, [candidateId]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/collaboration/notes/candidate/${candidateId}`);
      const data = await response.json();
      if (data.success) {
        setNotes(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const fetchPipeline = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/collaboration/pipelines/job/${jobId}`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        const candidatePipeline = data.data.find(p => p.candidateId === candidateId);
        setPipeline(candidatePipeline);
      }
    } catch (error) {
      console.error('Failed to fetch pipeline:', error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/collaboration/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          jobId,
          authorId: currentUser?.id || 'user_1',
          content: newNote,
          type: noteType,
          visibility: 'team'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setNotes([data.data, ...notes]);
        setNewNote('');
      }
    } catch (error) {
      console.error('Failed to add note:', error);
    }
    setLoading(false);
  };

  const addReaction = async (noteId, emoji) => {
    try {
      const response = await fetch(`http://localhost:5000/api/collaboration/notes/${noteId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || 'user_1',
          emoji
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setNotes(notes.map(n => n.id === noteId ? data.data : n));
      }
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  const updateScore = async (criteria, score) => {
    if (!pipeline) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/collaboration/pipelines/${pipeline.id}/scorecard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria, score, weight: 1 })
      });
      
      const data = await response.json();
      if (data.success) {
        setPipeline(data.data);
      }
    } catch (error) {
      console.error('Failed to update score:', error);
    }
  };

  const makeDecision = async (status) => {
    if (!pipeline) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/collaboration/pipelines/${pipeline.id}/decision`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          decidedBy: currentUser?.id || 'user_1'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setPipeline(data.data);
      }
    } catch (error) {
      console.error('Failed to make decision:', error);
    }
  };

  const scoringCriteria = [
    { id: 'technical', label: 'Technical Skills' },
    { id: 'communication', label: 'Communication' },
    { id: 'problem_solving', label: 'Problem Solving' },
    { id: 'culture_fit', label: 'Culture Fit' },
    { id: 'experience', label: 'Experience' }
  ];

  return (
    <div className="team-collaboration">
      {/* Tabs */}
      <div className="collab-tabs">
        <button 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📝 Notes & Discussion
        </button>
        <button 
          className={`tab ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
        >
          📊 Scorecard
        </button>
        <button 
          className={`tab ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          🔄 Pipeline
        </button>
      </div>

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="notes-section">
          {/* Add Note */}
          <div className="add-note-form">
            <div className="note-type-selector">
              {noteTypes.map(type => (
                <button
                  key={type.id}
                  className={`type-btn ${noteType === type.id ? 'active' : ''}`}
                  onClick={() => setNoteType(type.id)}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your thoughts, ask a question, or provide feedback..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <div className="note-actions">
              <button 
                className="submit-note" 
                onClick={addNote}
                disabled={loading || !newNote.trim()}
              >
                {loading ? 'Posting...' : 'Post Note'}
              </button>
            </div>
          </div>

          {/* Notes List */}
          <div className="notes-list">
            {notes.length === 0 ? (
              <div className="no-notes">
                <span>💭</span>
                <p>No notes yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              notes.map(note => (
                <div key={note.id} className={`note-card ${note.type}`}>
                  <div className="note-header">
                    <div className="note-author">
                      <span className="author-avatar">
                        {note.authorId?.slice(-2).toUpperCase() || 'U1'}
                      </span>
                      <div className="author-info">
                        <span className="author-name">{note.authorId}</span>
                        <span className="note-time">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="note-type-badge">
                      {noteTypes.find(t => t.id === note.type)?.icon}
                    </span>
                  </div>
                  
                  <div className="note-content">{note.content}</div>
                  
                  <div className="note-footer">
                    <div className="reactions">
                      {emojis.map(emoji => {
                        const count = note.reactions?.filter(r => r.emoji === emoji).length || 0;
                        const hasReacted = note.reactions?.some(
                          r => r.emoji === emoji && r.userId === (currentUser?.id || 'user_1')
                        );
                        return (
                          <button
                            key={emoji}
                            className={`reaction-btn ${hasReacted ? 'active' : ''}`}
                            onClick={() => addReaction(note.id, emoji)}
                          >
                            {emoji} {count > 0 && <span>{count}</span>}
                          </button>
                        );
                      })}
                    </div>
                    <button className="reply-btn">Reply</button>
                  </div>

                  {note.replies?.length > 0 && (
                    <div className="replies">
                      {note.replies.map(reply => (
                        <div key={reply.id} className="reply">
                          <span className="reply-author">{reply.authorId}</span>
                          <span className="reply-content">{reply.content}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Scorecard Tab */}
      {activeTab === 'scorecard' && (
        <div className="scorecard-section">
          <div className="overall-score">
            <div className="score-ring">
              <span className="score-value">
                {pipeline?.scorecard?.overallScore?.toFixed(1) || '0.0'}
              </span>
              <span className="score-label">Overall</span>
            </div>
          </div>

          <div className="criteria-list">
            {scoringCriteria.map(criteria => {
              const score = pipeline?.scorecard?.scores?.find(s => s.criteria === criteria.id)?.score || 0;
              return (
                <div key={criteria.id} className="criteria-item">
                  <span className="criteria-label">{criteria.label}</span>
                  <div className="score-buttons">
                    {[1, 2, 3, 4, 5].map(value => (
                      <button
                        key={value}
                        className={`score-btn ${score === value ? 'active' : ''}`}
                        onClick={() => updateScore(criteria.id, value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <span className="score-display">{score}/5</span>
                </div>
              );
            })}
          </div>

          <div className="decision-section">
            <h4>Hiring Decision</h4>
            <div className="decision-buttons">
              <button 
                className={`decision-btn hire ${pipeline?.decision?.status === 'hired' ? 'active' : ''}`}
                onClick={() => makeDecision('hired')}
              >
                ✅ Hire
              </button>
              <button 
                className={`decision-btn hold ${pipeline?.decision?.status === 'on_hold' ? 'active' : ''}`}
                onClick={() => makeDecision('on_hold')}
              >
                ⏸️ On Hold
              </button>
              <button 
                className={`decision-btn reject ${pipeline?.decision?.status === 'rejected' ? 'active' : ''}`}
                onClick={() => makeDecision('rejected')}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="pipeline-section">
          <div className="pipeline-stages">
            {(pipeline?.stages || [
              { name: 'Applied', status: 'completed' },
              { name: 'Phone Screen', status: 'completed' },
              { name: 'Technical Interview', status: 'in_progress' },
              { name: 'Final Round', status: 'pending' },
              { name: 'Offer', status: 'pending' }
            ]).map((stage, index) => (
              <div 
                key={stage.name} 
                className={`pipeline-stage ${stage.status}`}
              >
                <div className="stage-circle">
                  {stage.status === 'completed' ? '✓' : index + 1}
                </div>
                <div className="stage-info">
                  <span className="stage-name">{stage.name}</span>
                  <span className="stage-status">
                    {stage.status.replace('_', ' ')}
                  </span>
                </div>
                {index < (pipeline?.stages?.length || 4) && (
                  <div className={`stage-connector ${stage.status === 'completed' ? 'filled' : ''}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCollaboration;
