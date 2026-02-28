import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const Cancel = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
            <XCircle size={80} className="text-red-500 mb-6" />
            <h1 className="text-4xl font-serif font-bold text-textMain mb-4">Payment Cancelled</h1>
            <p className="text-textMuted max-w-md mx-auto mb-8 leading-relaxed">
                Your checkout process was interrupted and you have not been charged. Your items are still saved in your cart.
            </p>
            <Link to="/cart" className="bg-primary text-background px-8 py-3 rounded-sm font-medium hover:bg-yellow-500 transition-colors">
                Return to Cart
            </Link>
        </div>
    );
};

export default Cancel;