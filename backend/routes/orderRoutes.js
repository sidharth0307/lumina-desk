import express from 'express';
import { createCheckoutSession, getMyOrders, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);

export default router;