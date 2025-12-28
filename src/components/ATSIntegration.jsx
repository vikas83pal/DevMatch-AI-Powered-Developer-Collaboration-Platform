import React, { useState, useEffect } from 'react';
import './ATSIntegration.css';

const ATSIntegration = ({ organizationId }) => {
  const [providers, setProviders] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [syncing, setSyncing] = useState({});
  const [syncLogs, setSyncLogs] = useState([]);

  useEffect(() => {
    fetchProviders();
    fetchIntegrations();
  }, [organizationId]);

  const fetchProviders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ats/providers');
      const data = await response.json();
      if (data.success) setProviders(data.data);
    } catch (error) {
      // Mock data
      setProviders([
        { id: 'greenhouse', name: 'Greenhouse', features: ['Job Sync', 'Candidate Sync', 'Webhooks'] },
        { id: 'lever', name: 'Lever', features: ['Job Sync', 'Candidate Sync', 'Stage Updates'] },
        { id: 'workday', name: 'Workday', features: ['HRIS Integration', 'Job Sync'] },
        { id: 'bamboohr', name: 'BambooHR', features: ['HRIS Integration'] },
        { id: 'ashby', name: 'Ashby', features: ['Job Sync', 'Candidate Sync'] }
      ]);
    }
  };

  const fetchIntegrations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ats/integrations/${organizationId || 'org_1'}`);
      const data = await response.json();
      if (data.success) setIntegrations(data.data);
    } catch (error) {
      console.error('Failed to fetch integrations:', error);
    }
  };

  const connectProvider = async () => {
    if (!selectedProvider || !apiKey) return;

    try {
      const response = await fetch('http://localhost:5000/api/ats/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organizationId || 'org_1',
          provider: selectedProvider.id,
          apiKey
        })
      });

      const data = await response.json();
      if (data.success) {
        setIntegrations([...integrations, data.data]);
        setShowSetupModal(false);
        setApiKey('');
        setSelectedProvider(null);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const triggerSync = async (integrationId) => {
    setSyncing({ ...syncing, [integrationId]: true });

    try {
      const response = await fetch(`http://localhost:5000/api/ats/integrations/${integrationId}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncType: 'full' })
      });

      const data = await response.json();
      if (data.success) {
        setSyncLogs([
          { integrationId, ...data.data, timestamp: new Date() },
          ...syncLogs
        ]);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }

    setSyncing({ ...syncing, [integrationId]: false });
  };

  const disconnectIntegration = async (integrationId) => {
    try {
      await fetch(`http://localhost:5000/api/ats/integrations/${integrationId}`, {
        method: 'DELETE'
      });
      setIntegrations(integrations.filter(i => i.id !== integrationId));
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const getProviderLogo = (providerId) => {
    const logos = {
      greenhouse: '🌱',
      lever: '⚙️',
      workday: '☀️',
      bamboohr: '🎋',
      ashby: '🔷'
    };
    return logos[providerId] || '🔗';
  };

  const isConnected = (providerId) => {
    return integrations.some(i => i.provider === providerId);
  };

  return (
    <div className="ats-integration">
      <div className="ats-header">
        <div className="header-content">
          <h1>🔗 ATS & HR Integrations</h1>
          <p>Connect your existing applicant tracking systems for seamless data sync</p>
        </div>
      </div>

      {/* Connected Integrations */}
      {integrations.length > 0 && (
        <div className="connected-section">
          <h2>Connected Integrations</h2>
          <div className="connected-grid">
            {integrations.map(integration => (
              <div key={integration.id} className="integration-card connected">
                <div className="card-header">
                  <span className="provider-logo">{getProviderLogo(integration.provider)}</span>
                  <div className="provider-info">
                    <h3>{integration.provider.charAt(0).toUpperCase() + integration.provider.slice(1)}</h3>
                    <span className={`status-badge ${integration.status}`}>
                      {integration.status}
                    </span>
                  </div>
                </div>

                <div className="sync-info">
                  <div className="sync-stat">
                    <span className="stat-label">Last Sync</span>
                    <span className="stat-value">
                      {integration.config?.lastSyncAt 
                        ? new Date(integration.config.lastSyncAt).toLocaleString()
                        : 'Never'}
                    </span>
                  </div>
                  <div className="sync-stat">
                    <span className="stat-label">Frequency</span>
                    <span className="stat-value">{integration.config?.syncFrequency || 'Hourly'}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="sync-btn"
                    onClick={() => triggerSync(integration.id)}
                    disabled={syncing[integration.id]}
                  >
                    {syncing[integration.id] ? '⟳ Syncing...' : '🔄 Sync Now'}
                  </button>
                  <button 
                    className="settings-btn"
                    onClick={() => {}}
                  >
                    ⚙️
                  </button>
                  <button 
                    className="disconnect-btn"
                    onClick={() => disconnectIntegration(integration.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Providers */}
      <div className="providers-section">
        <h2>Available Integrations</h2>
        <div className="providers-grid">
          {providers.map(provider => {
            const connected = isConnected(provider.id);
            return (
              <div 
                key={provider.id} 
                className={`provider-card ${connected ? 'connected' : ''}`}
              >
                <div className="provider-logo-large">
                  {getProviderLogo(provider.id)}
                </div>
                <h3>{provider.name}</h3>
                <div className="provider-features">
                  {provider.features.map(feature => (
                    <span key={feature} className="feature-tag">{feature}</span>
                  ))}
                </div>
                {connected ? (
                  <span className="connected-label">✓ Connected</span>
                ) : (
                  <button 
                    className="connect-btn"
                    onClick={() => {
                      setSelectedProvider(provider);
                      setShowSetupModal(true);
                    }}
                  >
                    Connect
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync Logs */}
      {syncLogs.length > 0 && (
        <div className="sync-logs-section">
          <h2>Recent Sync Activity</h2>
          <div className="sync-logs">
            {syncLogs.slice(0, 5).map((log, index) => (
              <div key={index} className="sync-log">
                <span className="log-icon">✓</span>
                <div className="log-info">
                  <span className="log-provider">
                    {integrations.find(i => i.id === log.integrationId)?.provider || 'Unknown'}
                  </span>
                  <span className="log-details">
                    Synced {log.jobs?.length || 0} jobs
                  </span>
                </div>
                <span className="log-time">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup Modal */}
      {showSetupModal && selectedProvider && (
        <div className="modal-overlay" onClick={() => setShowSetupModal(false)}>
          <div className="setup-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSetupModal(false)}>×</button>
            
            <div className="modal-header">
              <span className="provider-logo-large">{getProviderLogo(selectedProvider.id)}</span>
              <h2>Connect {selectedProvider.name}</h2>
            </div>

            <div className="setup-form">
              <div className="form-group">
                <label>API Key</label>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <span className="help-text">
                  Find your API key in {selectedProvider.name} Settings → Integrations → API
                </span>
              </div>

              <div className="sync-options">
                <h4>Sync Options</h4>
                <label className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <span>Sync Jobs</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <span>Sync Candidates</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <span>Enable Webhooks</span>
                </label>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowSetupModal(false)}>
                  Cancel
                </button>
                <button 
                  className="connect-btn primary"
                  onClick={connectProvider}
                  disabled={!apiKey}
                >
                  Connect {selectedProvider.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSIntegration;
