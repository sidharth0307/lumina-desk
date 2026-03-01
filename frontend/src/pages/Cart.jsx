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
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 animate-fade-in">
                <div className="bg-surface/30 p-8 rounded-full mb-8 border border-border-subtle border-dashed">
                    <ShoppingBag size={48} className="text-textMuted opacity-50" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-textMain mb-4">Your Cart is Empty</h2>
                <p className="text-textMuted mb-10 font-light max-w-md text-center leading-relaxed">
                    Looks like you haven't added anything to your desk setup yet. Discover our premium collection.
                </p>
                <Link 
                    to="/products" 
                    className="bg-primary text-background px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:bg-textMain hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-textMain mb-12 tracking-tight">
                Shopping Cart
            </h1>

            {error && (
                <div className="bg-red-950/20 border border-red-900/50 text-red-400 p-4 rounded-2xl mb-8 animate-fade-in-up">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Cart Items */}
                <div className="lg:w-2/3 animate-fade-in-up">
                    <div className="bg-surface/30 border border-border-subtle rounded-3xl divide-y divide-border-subtle overflow-hidden">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 hover:bg-surface/50 transition-colors duration-300">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl bg-background border border-border-subtle" 
                                />
                                
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-heading font-medium text-textMain mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-primary font-heading font-medium text-lg">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                                    {/* Pill-shaped Quantity Controls */}
                                    <div className="flex items-center border border-border-subtle rounded-full bg-background p-1">
                                        <button 
                                            onClick={() => updateQuantity(item.product, item.quantity - 1)} 
                                            className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-textMain hover:bg-surface rounded-full transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            onClick={() => updateQuantity(item.product, item.quantity + 1)} 
                                            disabled={item.quantity >= item.stockQuantity}
                                            className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-textMain hover:bg-surface rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    {/* Trash Button */}
                                    <button 
                                        onClick={() => removeFromCart(item.product)} 
                                        className="text-textMuted hover:text-red-500 p-3 transition-all duration-300 hover:bg-red-500/10 rounded-full group"
                                    >
                                        <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3 animate-fade-in-up delay-100">
                    <div className="bg-surface/40 backdrop-blur-md border border-border-subtle p-8 rounded-3xl sticky top-32 shadow-xl shadow-black/20">
                        <h2 className="text-2xl font-heading font-medium text-textMain mb-8">Order Summary</h2>
                        
                        <div className="space-y-5 mb-8 text-sm font-medium">
                            <div className="flex justify-between text-textMuted">
                                <span>Subtotal</span>
                                <span className="text-textMain">${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted">
                                <span>Shipping</span>
                                <span className="text-textMain">Calculated at checkout</span>
                            </div>
                            <div className="border-t border-border-subtle pt-6 mt-6 flex justify-between items-center">
                                <span className="text-lg text-textMain">Total</span>
                                <span className="text-3xl font-heading font-medium text-primary">
                                    ${getCartTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {!user && (
                            <div className="mb-6 p-5 bg-background/50 border border-border-subtle text-sm text-textMuted text-center rounded-2xl">
                                You must <Link to="/login" className="text-primary hover:text-textMain transition-colors underline decoration-border-subtle underline-offset-4">sign in</Link> to checkout.
                            </div>
                        )}

                        <button 
                            onClick={handleCheckout} 
                            disabled={isCheckingOut || !user}
                            className="w-full bg-primary text-background py-4 rounded-full font-bold text-lg transition-all duration-300 flex justify-center items-center gap-3 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                            {isCheckingOut ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-t-2 border-r-2 border-background rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <>
                                    Checkout Securely <ArrowRight size={20} />
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