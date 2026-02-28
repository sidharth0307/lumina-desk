import axios from 'axios';

const api = axios.create({
    // We will change this to your live Render URL during deployment
    baseURL: 'http://localhost:5000/api', 
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