import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

// Interceptor: Automatically attach the JWT token to requests if the user is logged in
api.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;