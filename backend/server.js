import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Security: CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite's default port
    credentials: true,
}));

// Security: Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Lumina Desk API is running');
});

// Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});