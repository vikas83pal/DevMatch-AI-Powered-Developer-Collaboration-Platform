/**
 * FEATURE 3: Native Mobile Support
 * Backend API Routes for Push Notifications & Device Management
 */

const express = require('express');
const router = express.Router();

// ============== IN-MEMORY DATA STORE ==============
let deviceRegistrations = [];
let pushNotificationLogs = [];
let notificationPreferences = [];

// ============== HELPER FUNCTIONS ==============

/**
 * Send push notification (mock implementation)
 * In production, integrate with FCM (Firebase) and APNs
 */
const sendPushNotification = async (deviceToken, notification, platform) => {
    console.log(`[Push] Sending to ${platform} device: ${notification.title}`);

    // Mock implementation - in production use:
    // - Firebase Cloud Messaging (FCM) for Android
    // - Apple Push Notification Service (APNs) for iOS

    const log = {
        id: `push_${Date.now()}`,
        deviceToken,
        platform,
        notification: {
            title: notification.title,
            body: notification.body,
            data: notification.data || {},
            category: notification.category
        },
        status: 'sent',
        sentAt: new Date(),
        deliveredAt: null,
        openedAt: null
    };

    pushNotificationLogs.push(log);

    return { success: true, notificationId: log.id };
};

/**
 * Check if notification should be sent based on preferences
 */
const shouldSendNotification = (userId, category) => {
    const prefs = notificationPreferences.find(p => p.userId === userId);
    if (!prefs) return true; // Default to sending

    // Check quiet hours
    if (prefs.quietHoursEnabled) {
        const now = new Date();
        const currentHour = now.getHours();
        const [startHour] = prefs.quietHoursStart.split(':').map(Number);
        const [endHour] = prefs.quietHoursEnd.split(':').map(Number);

        if (startHour > endHour) {
            // Overnight quiet hours (e.g., 22:00 - 08:00)
            if (currentHour >= startHour || currentHour < endHour) {
                return false;
            }
        } else {
            if (currentHour >= startHour && currentHour < endHour) {
                return false;
            }
        }
    }

    // Check category preferences
    switch (category) {
        case 'match':
            return prefs.notifyNewMatch !== false;
        case 'message':
            return prefs.notifyMessages !== false;
        case 'interview':
            return prefs.notifyInterviews !== false;
        default:
            return true;
    }
};

// ============== API ROUTES ==============

/**
 * @route   POST /api/mobile/devices/register
 * @desc    Register a device for push notifications
 * @access  Private
 */
router.post('/devices/register', (req, res) => {
    try {
        const {
            userId,
            deviceToken,
            platform, // 'ios' | 'android' | 'web'
            deviceModel,
            osVersion,
            appVersion
        } = req.body;

        if (!userId || !deviceToken || !platform) {
            return res.status(400).json({
                success: false,
                message: 'userId, deviceToken, and platform are required'
            });
        }

        // Check if device already registered
        const existingIndex = deviceRegistrations.findIndex(
            d => d.userId === userId && d.deviceToken === deviceToken
        );

        const deviceData = {
            id: existingIndex >= 0 ? deviceRegistrations[existingIndex].id : `dev_${Date.now()}`,
            userId,
            device: {
                type: platform,
                token: deviceToken,
                model: deviceModel || 'Unknown',
                osVersion: osVersion || 'Unknown',
                appVersion: appVersion || '1.0.0'
            },
            preferences: existingIndex >= 0 ? deviceRegistrations[existingIndex].preferences : {
                pushEnabled: true,
                emailEnabled: true,
                smsEnabled: false,
                quietHoursStart: '22:00',
                quietHoursEnd: '08:00',
                quietHoursEnabled: false,
                notifyNewMatch: true,
                notifyMessages: true,
                notifyInterviews: true
            },
            lastActive: new Date(),
            createdAt: existingIndex >= 0 ? deviceRegistrations[existingIndex].createdAt : new Date(),
            updatedAt: new Date()
        };

        if (existingIndex >= 0) {
            deviceRegistrations[existingIndex] = deviceData;
        } else {
            deviceRegistrations.push(deviceData);
        }

        res.json({
            success: true,
            message: 'Device registered successfully',
            data: {
                deviceId: deviceData.id,
                preferences: deviceData.preferences
            }
        });
    } catch (error) {
        console.error('Error registering device:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   DELETE /api/mobile/devices/:deviceId
 * @desc    Unregister a device
 * @access  Private
 */
router.delete('/devices/:deviceId', (req, res) => {
    try {
        const index = deviceRegistrations.findIndex(d => d.id === req.params.deviceId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Device not found' });
        }

        deviceRegistrations.splice(index, 1);

        res.json({
            success: true,
            message: 'Device unregistered successfully'
        });
    } catch (error) {
        console.error('Error unregistering device:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/mobile/devices/user/:userId
 * @desc    Get all registered devices for a user
 * @access  Private
 */
router.get('/devices/user/:userId', (req, res) => {
    try {
        const userDevices = deviceRegistrations.filter(d => d.userId === req.params.userId);

        res.json({
            success: true,
            data: userDevices
        });
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/mobile/preferences
 * @desc    Update notification preferences
 * @access  Private
 */
router.put('/preferences', (req, res) => {
    try {
        const {
            userId,
            pushEnabled,
            emailEnabled,
            smsEnabled,
            quietHoursStart,
            quietHoursEnd,
            quietHoursEnabled,
            notifyNewMatch,
            notifyMessages,
            notifyInterviews
        } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId is required' });
        }

        const existingIndex = notificationPreferences.findIndex(p => p.userId === userId);

        const preferences = {
            userId,
            pushEnabled: pushEnabled !== undefined ? pushEnabled : true,
            emailEnabled: emailEnabled !== undefined ? emailEnabled : true,
            smsEnabled: smsEnabled !== undefined ? smsEnabled : false,
            quietHoursStart: quietHoursStart || '22:00',
            quietHoursEnd: quietHoursEnd || '08:00',
            quietHoursEnabled: quietHoursEnabled !== undefined ? quietHoursEnabled : false,
            notifyNewMatch: notifyNewMatch !== undefined ? notifyNewMatch : true,
            notifyMessages: notifyMessages !== undefined ? notifyMessages : true,
            notifyInterviews: notifyInterviews !== undefined ? notifyInterviews : true,
            updatedAt: new Date()
        };

        if (existingIndex >= 0) {
            notificationPreferences[existingIndex] = preferences;
        } else {
            preferences.createdAt = new Date();
            notificationPreferences.push(preferences);
        }

        // Also update device preferences
        deviceRegistrations
            .filter(d => d.userId === userId)
            .forEach(d => {
                d.preferences = { ...preferences };
                d.updatedAt = new Date();
            });

        res.json({
            success: true,
            message: 'Preferences updated',
            data: preferences
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/mobile/preferences/:userId
 * @desc    Get notification preferences for a user
 * @access  Private
 */
router.get('/preferences/:userId', (req, res) => {
    try {
        const preferences = notificationPreferences.find(p => p.userId === req.params.userId);

        res.json({
            success: true,
            data: preferences || {
                pushEnabled: true,
                emailEnabled: true,
                smsEnabled: false,
                quietHoursStart: '22:00',
                quietHoursEnd: '08:00',
                quietHoursEnabled: false,
                notifyNewMatch: true,
                notifyMessages: true,
                notifyInterviews: true
            }
        });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/mobile/notifications/send
 * @desc    Send push notification to user(s)
 * @access  Private
 */
router.post('/notifications/send', async (req, res) => {
    try {
        const {
            userIds,
            title,
            body,
            data,
            category // 'match' | 'message' | 'interview' | 'system'
        } = req.body;

        if (!userIds || !title || !body) {
            return res.status(400).json({
                success: false,
                message: 'userIds, title, and body are required'
            });
        }

        const results = {
            sent: [],
            skipped: [],
            failed: []
        };

        for (const userId of userIds) {
            // Check preferences
            if (!shouldSendNotification(userId, category)) {
                results.skipped.push({ userId, reason: 'User preferences' });
                continue;
            }

            // Get user's devices
            const userDevices = deviceRegistrations.filter(
                d => d.userId === userId && d.preferences.pushEnabled
            );

            if (userDevices.length === 0) {
                results.skipped.push({ userId, reason: 'No registered devices' });
                continue;
            }

            // Send to all user's devices
            for (const device of userDevices) {
                try {
                    await sendPushNotification(
                        device.device.token,
                        { title, body, data, category },
                        device.device.type
                    );
                    results.sent.push({ userId, deviceId: device.id });
                } catch (error) {
                    results.failed.push({ userId, deviceId: device.id, error: error.message });
                }
            }
        }

        res.json({
            success: true,
            message: 'Notifications processed',
            data: results
        });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/mobile/notifications/broadcast
 * @desc    Send broadcast notification to all users
 * @access  Private (Admin only)
 */
router.post('/notifications/broadcast', async (req, res) => {
    try {
        const { title, body, data, category = 'system' } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: 'title and body are required'
            });
        }

        const uniqueUserIds = [...new Set(deviceRegistrations.map(d => d.userId))];

        const results = {
            totalUsers: uniqueUserIds.length,
            totalDevices: deviceRegistrations.length,
            sent: 0,
            failed: 0
        };

        for (const device of deviceRegistrations) {
            if (device.preferences.pushEnabled && shouldSendNotification(device.userId, category)) {
                try {
                    await sendPushNotification(
                        device.device.token,
                        { title, body, data, category },
                        device.device.type
                    );
                    results.sent++;
                } catch (error) {
                    results.failed++;
                }
            }
        }

        res.json({
            success: true,
            message: 'Broadcast sent',
            data: results
        });
    } catch (error) {
        console.error('Error broadcasting:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/mobile/notifications/:notificationId/delivered
 * @desc    Mark notification as delivered
 * @access  Private
 */
router.put('/notifications/:notificationId/delivered', (req, res) => {
    try {
        const log = pushNotificationLogs.find(l => l.id === req.params.notificationId);

        if (!log) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        log.status = 'delivered';
        log.deliveredAt = new Date();

        res.json({
            success: true,
            message: 'Notification marked as delivered'
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   PUT /api/mobile/notifications/:notificationId/opened
 * @desc    Mark notification as opened
 * @access  Private
 */
router.put('/notifications/:notificationId/opened', (req, res) => {
    try {
        const log = pushNotificationLogs.find(l => l.id === req.params.notificationId);

        if (!log) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        log.status = 'opened';
        log.openedAt = new Date();

        res.json({
            success: true,
            message: 'Notification marked as opened'
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/mobile/notifications/history/:userId
 * @desc    Get notification history for a user
 * @access  Private
 */
router.get('/notifications/history/:userId', (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        // Get user's device tokens
        const userDeviceTokens = deviceRegistrations
            .filter(d => d.userId === req.params.userId)
            .map(d => d.device.token);

        // Get notifications sent to those devices
        const userNotifications = pushNotificationLogs
            .filter(l => userDeviceTokens.includes(l.deviceToken))
            .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginatedNotifications = userNotifications.slice(startIndex, startIndex + parseInt(limit));

        res.json({
            success: true,
            data: {
                notifications: paginatedNotifications,
                pagination: {
                    total: userNotifications.length,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(userNotifications.length / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   GET /api/mobile/config
 * @desc    Get mobile app configuration
 * @access  Public
 */
router.get('/config', (req, res) => {
    try {
        // App configuration for mobile clients
        const config = {
            minAppVersion: {
                ios: '1.0.0',
                android: '1.0.0'
            },
            features: {
                pushNotifications: true,
                biometricAuth: true,
                offlineMode: true,
                darkMode: true
            },
            endpoints: {
                websocket: 'wss://api.devmatch.io/ws',
                uploads: 'https://api.devmatch.io/uploads'
            },
            updateRequired: false,
            maintenanceMode: false
        };

        res.json({
            success: true,
            data: config
        });
    } catch (error) {
        console.error('Error fetching config:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @route   POST /api/mobile/sync
 * @desc    Sync offline data from mobile app
 * @access  Private
 */
router.post('/sync', (req, res) => {
    try {
        const { userId, lastSyncAt, pendingActions } = req.body;

        // Process pending offline actions
        const results = {
            processed: [],
            failed: []
        };

        if (pendingActions && pendingActions.length > 0) {
            pendingActions.forEach(action => {
                try {
                    // Process each action based on type
                    console.log(`Processing offline action: ${action.type}`);
                    results.processed.push({ id: action.id, status: 'success' });
                } catch (error) {
                    results.failed.push({ id: action.id, error: error.message });
                }
            });
        }

        // Return updated data since last sync
        const updatedData = {
            // In production, fetch actual updated records
            notifications: [],
            messages: [],
            interviews: [],
            matches: []
        };

        res.json({
            success: true,
            message: 'Sync completed',
            data: {
                syncedAt: new Date(),
                actionResults: results,
                updates: updatedData
            }
        });
    } catch (error) {
        console.error('Error syncing:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
