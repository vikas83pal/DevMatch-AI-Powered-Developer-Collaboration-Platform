import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with interceptors
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ============== AUTH API ==============
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me'),
};

// ============== USER API ==============
export const userAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    updateProfile: (data) => api.put('/users/profile', data),
    changePassword: (data) => api.put('/users/password', data),
};

// ============== PROJECT API ==============
export const projectAPI = {
    getAll: () => api.get('/projects'),
    create: (data) => api.post('/projects', data),
    getById: (id) => api.get(`/projects/${id}`),
};

// ============== NOTIFICATION API ==============
export const notificationAPI = {
    getAll: () => api.get('/notifications'),
    markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

// ============== ANALYTICS API ==============
export const analyticsAPI = {
    get: () => api.get('/analytics'),
};

// ============== MESSAGES API ==============
export const messageAPI = {
    getConversation: (recipientId) => api.get(`/messages/${recipientId}`),
    send: (data) => api.post('/messages', data),
};

export default api;
