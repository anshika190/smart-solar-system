import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Default local backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle "Demo Mode" fallback
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if error is Network Error or 404 (Backend missing)
        const isConnectionError = error.code === "ERR_NETWORK" || error.response?.status === 404;

        if (isConnectionError && originalRequest.url.includes('/auth/')) {
            console.warn("Backend unreachable. Activating Demo Mode for:", originalRequest.url);

            // Artificial delay to simulate network
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock Login Success
            if (originalRequest.url.includes('/login')) {
                return {
                    data: {
                        token: 'demo-token-active',
                        user: {
                            id: 'demo-user-001',
                            name: 'Solar Admin',
                            email: 'admin@solarai.com',
                            role: 'admin' // Ensure role is strictly 'admin'
                        },
                        message: 'Demo Login Successful'
                    },
                    status: 200
                };
            }

            // Mock Register Success
            if (originalRequest.url.includes('/register')) {
                return {
                    data: {
                        token: 'demo-token-active',
                        user: {
                            id: 'demo-user-new',
                            name: JSON.parse(originalRequest.data).name || 'New User',
                            email: JSON.parse(originalRequest.data).email,
                            role: 'user'
                        },
                        message: 'Demo Registration Successful'
                    },
                    status: 201
                };
            }
        }

        // Mock Fallback for CSV Export (If Backend is Offline)
        if (isConnectionError && originalRequest.url.includes('/activity/all')) {
            console.warn("Backend unreachable. Returning Mock Activity Logs.");
            return {
                data: [
                    { timestamp: new Date().toISOString(), userName: 'System Admin', action: 'LOGIN', details: { email: 'admin@solarai.com' } },
                    { timestamp: new Date(Date.now() - 1800000).toISOString(), userName: 'System Admin', action: 'PAGE_VISIT', details: { page: 'Reports' } },
                    { timestamp: new Date(Date.now() - 3600000).toISOString(), userName: 'System Admin', action: 'PAGE_VISIT', details: { page: 'Dashboard' } },
                    { timestamp: new Date(Date.now() - 5400000).toISOString(), userName: 'System Admin', action: 'LOGOUT', details: { method: 'User Initiated' } },
                    { timestamp: new Date(Date.now() - 7200000).toISOString(), userName: 'System Admin', action: 'LOGIN', details: { email: 'admin@solarai.com' } },
                    { timestamp: new Date(Date.now() - 86400000).toISOString(), userName: 'Sensor Bot', action: 'SYSTEM_CHECK', details: { status: 'OK' } },
                ],
                status: 200
            };
        }

        return Promise.reject(error);
    }
);

export default api;
