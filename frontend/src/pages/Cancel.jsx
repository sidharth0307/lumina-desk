import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle } from 'lucide-react';

const Cancel = () => {
   return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 overflow-hidden animate-fade-in">
            {/* Subtle Red Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500 opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-lg bg-surface/40 backdrop-blur-xl p-10 sm:p-14 rounded-[2rem] border border-border-subtle shadow-2xl shadow-black/50 text-center animate-fade-in-up">
                
                {/* Premium Icon Container */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 text-red-400 rounded-full mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <XCircle size={48} strokeWidth={1.5} />
                </div>
                
                <h1 className="text-4xl font-heading font-bold text-textMain mb-4 tracking-tight">Payment Cancelled</h1>
                
                <p className="text-textMuted text-lg font-light mb-10 leading-relaxed">
                    Your checkout process was interrupted and you have not been charged. Your items are safely saved in your cart.
                </p>
                
                <Link to="/cart" className="group inline-flex justify-center items-center gap-3 bg-primary text-background px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Return to Cart
                </Link>
            </div>
        </div>
    );
};

export default Cancel;