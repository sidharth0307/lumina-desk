import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import Stripe from 'stripe';
import Order from './models/Order.js';
import Product from './models/Product.js';
import orderRoutes from './routes/orderRoutes.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

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

// --- STRIPE WEBHOOK (MUST BE BEFORE express.json()) ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify the event came from Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ASSIGNMENT REQUIREMENT: Stock reduction after successful payment
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderItems = JSON.parse(session.metadata.orderItems);
        
        // 1. Save the Order to the Database
        const newOrder = new Order({
            user: session.client_reference_id,
            products: orderItems.map(item => ({ product: item.id, quantity: item.qty })),
            totalAmount: session.amount_total / 100, // Convert cents back to dollars
            paymentStatus: 'completed',
            stripeSessionId: session.id
        });
        await newOrder.save();

        // 2. Deduct the Stock
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.id, {
                $inc: { stockQuantity: -item.qty } // Decrease stock
            });
        }
        console.log(`Order saved and stock deducted for session ${session.id}`);
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
});
// --- END WEBHOOK ---

// Make sure app.use(express.json()); is right here!

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

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