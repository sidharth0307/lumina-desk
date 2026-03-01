import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a Stripe Checkout Session
// @route   POST /api/orders/create-checkout-session
// @access  Private (User must be logged in)
export const createCheckoutSession = async (req, res) => {
    try {
        const { orderItems } = req.body; // Array of { product: productId, quantity }

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const line_items = [];
        let totalAmount = 0;

        // 1. Validate items and get real prices from DB (Never trust frontend prices!)
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            // ASSIGNMENT REQUIREMENT: Prevent purchase if stock is 0
            if (product.stockQuantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
            }

            totalAmount += product.price * item.quantity;

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                        images: [product.imageUrl], // Stripe needs an array of images
                    },
                    unit_amount: Math.round(product.price * 100), // Stripe expects cents!
                },
                quantity: item.quantity,
            });
        }

        // 2. Create the Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
            client_reference_id: req.user._id.toString(), // Securely tie order to the logged-in user
            metadata: {
                // Pass a lightweight map of product IDs and quantities so the webhook knows what to deduct
                orderItems: JSON.stringify(orderItems.map(item => ({ id: item.product, qty: item.quantity })))
            }
        });

        // Send the URL back to the frontend so React can redirect the user
        res.json({ id: session.id, url: session.url });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders & calculate total revenue
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        
        // ASSIGNMENT REQUIREMENT: Total revenue calculation
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({ orders, totalRevenue });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('products.product', 'title imageUrl');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};