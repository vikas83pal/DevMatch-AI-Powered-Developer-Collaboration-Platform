/**
 * FEATURE 4: ATS/HR Integrations
 * Backend API Routes
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

let integrations = [];
let syncLogs = [];

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'devmatch-secret-key-32-chars!!';

const encrypt = (text) => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32)), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (e) {
        return text;
    }
};

// ATS Clients
const atsClients = {
    greenhouse: {
        async testConnection(creds) { return { success: true }; },
        async syncJobs(creds) {
            return { jobs: [{ externalId: 'gh_1', title: 'Senior Engineer', status: 'open' }] };
        },
        async pushCandidate(creds, data) {
            return { success: true, externalId: `gh_${Date.now()}` };
        }
    },
    lever: {
        async testConnection(creds) { return { success: true }; },
        async syncJobs(creds) {
            return { jobs: [{ externalId: 'lev_1', title: 'Full Stack Developer', status: 'open' }] };
        },
        async pushCandidate(creds, data) {
            return { success: true, externalId: `lev_${Date.now()}` };
        }
    },
    workday: {
        async testConnection(creds) { return { success: true }; },
        async syncJobs(creds) {
            return { jobs: [{ externalId: 'wd_1', title: 'DevOps Engineer', status: 'open' }] };
        },
        async pushCandidate(creds, data) {
            return { success: true, externalId: `wd_${Date.now()}` };
        }
    }
};

// Get providers
router.get('/providers', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 'greenhouse', name: 'Greenhouse', features: ['Job Sync', 'Candidate Sync', 'Webhooks'], authType: 'api_key' },
            { id: 'lever', name: 'Lever', features: ['Job Sync', 'Candidate Sync', 'Stage Updates'], authType: 'oauth' },
            { id: 'workday', name: 'Workday', features: ['HRIS Integration', 'Job Sync'], authType: 'oauth' },
            { id: 'bamboohr', name: 'BambooHR', features: ['HRIS Integration'], authType: 'api_key' },
            { id: 'ashby', name: 'Ashby', features: ['Job Sync', 'Candidate Sync', 'Analytics'], authType: 'api_key' }
        ]
    });
});

// Create integration
router.post('/integrations', async (req, res) => {
    try {
        const { organizationId, provider, apiKey, apiSecret } = req.body;

        if (!organizationId || !provider) {
            return res.status(400).json({ success: false, message: 'organizationId and provider are required' });
        }

        // Check if already exists
        const existing = integrations.find(i => i.organizationId === organizationId && i.provider === provider);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Integration already exists' });
        }

        const integration = {
            id: `int_${Date.now()}`,
            organizationId,
            provider,
            credentials: { apiKey: encrypt(apiKey || '') },
            config: { syncEnabled: true, syncFrequency: 'hourly', lastSyncAt: null },
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        integrations.push(integration);
        res.status(201).json({ success: true, message: 'Integration created', data: integration });
    } catch (error) {
        console.error('Error creating integration:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get integrations for organization
router.get('/integrations/:organizationId', (req, res) => {
    try {
        const orgIntegrations = integrations.filter(i => i.organizationId === req.params.organizationId);
        res.json({ success: true, data: orgIntegrations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update integration
router.put('/integrations/:integrationId', (req, res) => {
    try {
        const { config, status } = req.body;
        const index = integrations.findIndex(i => i.id === req.params.integrationId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }

        if (config) integrations[index].config = { ...integrations[index].config, ...config };
        if (status) integrations[index].status = status;
        integrations[index].updatedAt = new Date();

        res.json({ success: true, data: integrations[index] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete integration
router.delete('/integrations/:integrationId', (req, res) => {
    try {
        const index = integrations.findIndex(i => i.id === req.params.integrationId);
        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }
        integrations.splice(index, 1);
        res.json({ success: true, message: 'Integration deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Trigger sync
router.post('/integrations/:integrationId/sync', async (req, res) => {
    try {
        const integration = integrations.find(i => i.id === req.params.integrationId);
        if (!integration) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }

        const client = atsClients[integration.provider];
        if (!client) {
            return res.status(400).json({ success: false, message: 'Provider not supported' });
        }

        const result = await client.syncJobs({});
        integration.config.lastSyncAt = new Date();
        integration.updatedAt = new Date();

        const log = {
            id: `sync_${Date.now()}`,
            integrationId: integration.id,
            syncType: 'full',
            entity: 'jobs',
            records: { total: result.jobs.length, created: result.jobs.length },
            completedAt: new Date(),
            status: 'completed'
        };
        syncLogs.push(log);

        res.json({ success: true, message: 'Sync completed', data: { jobs: result.jobs, log } });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Push candidate to ATS
router.post('/integrations/:integrationId/push-candidate', async (req, res) => {
    try {
        const { candidateData, jobExternalId } = req.body;
        const integration = integrations.find(i => i.id === req.params.integrationId);

        if (!integration) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }

        const client = atsClients[integration.provider];
        if (!client) {
            return res.status(400).json({ success: false, message: 'Provider not supported' });
        }

        const result = await client.pushCandidate({}, { ...candidateData, jobExternalId });

        res.json({ success: true, message: 'Candidate pushed', data: { externalId: result.externalId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Webhook handler
router.post('/webhook/:integrationId', (req, res) => {
    try {
        const integration = integrations.find(i => i.id === req.params.integrationId);
        if (!integration) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }

        console.log(`[Webhook] Received event from ${integration.provider}:`, req.body.event || req.body.type);
        res.json({ success: true, message: 'Webhook received' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get sync logs
router.get('/integrations/:integrationId/logs', (req, res) => {
    try {
        const logs = syncLogs.filter(l => l.integrationId === req.params.integrationId);
        res.json({ success: true, data: { logs } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Test connection
router.post('/integrations/:integrationId/test', async (req, res) => {
    try {
        const integration = integrations.find(i => i.id === req.params.integrationId);
        if (!integration) {
            return res.status(404).json({ success: false, message: 'Integration not found' });
        }

        const client = atsClients[integration.provider];
        if (!client) {
            return res.status(400).json({ success: false, message: 'Provider not supported' });
        }

        const result = await client.testConnection({});
        integration.status = result.success ? 'active' : 'error';
        integration.updatedAt = new Date();

        res.json({ success: result.success, message: result.success ? 'Connection successful' : 'Connection failed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
