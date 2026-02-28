import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        // Clear the cart once the payment is successful
        clearCart();
    }, [clearCart]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
            <CheckCircle size={80} className="text-green-500 mb-6" />
            <h1 className="text-4xl font-serif font-bold text-textMain mb-4">Payment Successful!</h1>
            <p className="text-textMuted max-w-md mx-auto mb-8 leading-relaxed">
                Thank you for your order. Your premium desk accessories are being prepared for shipment. You will receive an email confirmation shortly.
            </p>
            <Link to="/products" className="bg-primary text-background px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
};

export default Success;