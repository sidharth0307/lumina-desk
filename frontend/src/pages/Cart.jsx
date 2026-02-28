import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        if (!user) {
            setError('Please sign in to complete your purchase.');
            return;
        }

        try {
            setIsCheckingOut(true);
            setError('');
            
            // Call the backend route we built in Phase 5
            const response = await api.post('/orders/create-checkout-session', {
                orderItems: cartItems.map(item => ({ product: item.product, quantity: item.quantity }))
            });

            // Redirect to the secure Stripe Checkout URL returned by our backend
            window.location.href = response.data.url;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to initiate checkout. Please try again.');
            setIsCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                <ShoppingBag size={64} className="text-surface mb-6" />
                <h2 className="text-3xl font-serif font-bold text-textMain mb-4">Your Cart is Empty</h2>
                <p className="text-textMuted mb-8">Looks like you haven't added anything to your desk setup yet.</p>
                <Link to="/products" className="bg-primary text-background px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-textMain mb-8">Shopping Cart</h1>

            {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-sm mb-8">{error}</div>}

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    <div className="bg-surface border border-surface/50 rounded-sm divide-y divide-surface/50">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex flex-col sm:flex-row items-center gap-6 p-6">
                                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-sm bg-[#1A1A1A]" />
                                
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-serif font-bold text-textMain">{item.title}</h3>
                                    <p className="text-primary font-medium mt-1">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-surface rounded-sm bg-background">
                                        <button onClick={() => updateQuantity(item.product, item.quantity - 1)} className="px-3 py-1 text-textMuted hover:text-textMain transition-colors">-</button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.product, item.quantity + 1)} 
                                            disabled={item.quantity >= item.stockQuantity}
                                            className="px-3 py-1 text-textMuted hover:text-textMain transition-colors disabled:opacity-50"
                                        >+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product)} className="text-textMuted hover:text-red-500 p-2 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-surface border border-surface/50 p-8 rounded-sm sticky top-24">
                        <h2 className="text-xl font-serif font-bold text-textMain mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-textMuted">
                                <span>Subtotal</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="border-t border-surface/50 pt-4 flex justify-between text-lg font-bold text-textMain">
                                <span>Total</span>
                                <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {!user && (
                            <div className="mb-4 p-4 bg-background border border-surface text-sm text-textMuted text-center rounded-sm">
                                You must <Link to="/login" className="text-primary hover:underline">sign in</Link> to checkout.
                            </div>
                        )}

                        <button 
                            onClick={handleCheckout} 
                            disabled={isCheckingOut || !user}
                            className="w-full bg-primary text-background py-4 rounded-sm font-bold hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,166,35,0.2)]"
                        >
                            {isCheckingOut ? 'Processing...' : (
                                <>
                                    Checkout Securely <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;