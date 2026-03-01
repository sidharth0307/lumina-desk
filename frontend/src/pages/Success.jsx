import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Success = () => {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 overflow-hidden animate-fade-in">
            {/* Subtle Green Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-lg bg-surface/40 backdrop-blur-xl p-10 sm:p-14 rounded-[2rem] border border-border-subtle shadow-2xl shadow-black/50 text-center animate-fade-in-up">
                
                {/* Premium Icon Container */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 text-green-400 rounded-full mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                </div>
                
                <h1 className="text-4xl font-heading font-bold text-textMain mb-4 tracking-tight">Payment Successful</h1>
                
                <p className="text-textMuted text-lg font-light mb-10 leading-relaxed">
                    Thank you for your order. Your premium desk accessories are being prepared for shipment. You will receive an email confirmation shortly.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/orders" className="inline-flex justify-center items-center gap-2 bg-transparent border border-border-subtle text-textMain px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:bg-surface hover:border-textMuted">
                        View Order
                    </Link>
                    <Link to="/products" className="group inline-flex justify-center items-center gap-3 bg-primary text-background px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                        Continue Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;