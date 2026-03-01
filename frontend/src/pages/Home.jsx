import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative min-h-[calc(100vh-5rem)] bg-black flex items-center justify-center overflow-hidden selection:bg-white selection:text-black">
            
            {/* Top-Down Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black pointer-events-none z-0"></div>

            {/* Massive Background Brand Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[12rem] md:text-[20rem] lg:text-[28rem] font-heading font-bold text-white/[0.02] pointer-events-none select-none tracking-tighter z-0 animate-fade-in">
                LUMINA
            </div>

            {/* Abstract Floating Hardware Geometry */}
            <div className="absolute top-1/4 right-[15%] w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-neutral-800 to-black rounded-full border border-neutral-800/50 shadow-[0_0_100px_rgba(255,255,255,0.03)] animate-pulse blur-sm z-0" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 md:w-72 md:h-72 bg-gradient-to-tr from-neutral-900 to-black rounded-full border border-neutral-800/30 shadow-[0_0_80px_rgba(255,255,255,0.02)] backdrop-blur-3xl animate-fade-in-up delay-300 z-0"></div>

            {/* Main Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-12 pb-16">

                {/* Brutalist Typography */}
                <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-heading font-bold tracking-tighter text-white leading-[0.85] animate-fade-in-up delay-100">
                    FOCUS. <br />
                    <span className="relative inline-block mt-2">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-400 to-neutral-900 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                            ELEVATED.
                        </span>
                    </span>
                </h1>

                {/* Minimalist Subtitle */}
                <p className="mt-12 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                    Welcome to <span className="text-white font-medium">Lumina</span>. Architectural-grade desk accessories engineered for the relentless pursuit of aesthetic clarity and deep work.
                </p>

                {/* Advanced Hover Button */}
                <div className="mt-14 animate-fade-in-up delay-300">
                    <Link 
                        to="/products" 
                        className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-transform duration-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                        {/* Slide-up background fill */}
                        <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                        
                        <span className="relative z-10 tracking-wide">Enter Collection</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </div>
            </div>

            {/* Architectural Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        </div>
    );
};

export default Home;