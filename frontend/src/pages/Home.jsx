import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background text-center px-4">
            <div className="max-w-3xl space-y-8">
                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-textMain leading-tight">
                    Elevate Your <br />
                    <span className="text-primary italic">Workspace.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto font-light leading-relaxed">
                    Premium, minimalist desk accessories designed for deep focus and aesthetic clarity. 
                    Built for the modern professional.
                </p>

                <div className="pt-8">
                    <Link 
                        to="/products" 
                        className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-sm font-medium hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(245,166,35,0.3)]"
                    >
                        Explore Collection
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default Home;