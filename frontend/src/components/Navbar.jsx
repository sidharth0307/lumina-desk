import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-4 group relative z-50">
                        {/* Architectural 'Eclipse' Logo Mark */}
                        <div className="relative flex items-center justify-center w-10 h-10">
                            {/* Ambient Glow that expands on hover */}
                            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-20 group-hover:opacity-60 group-hover:scale-125 transition-all duration-700 ease-out"></div>
                            
                            {/* Sleek Metallic Border that rotates on hover */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white via-neutral-500 to-black p-[1px] group-hover:rotate-180 transition-transform duration-700 ease-in-out">
                                <div className="w-full h-full bg-black rounded-full"></div>
                            </div>

                            {/* The 'L' */}
                            <span className="relative z-10 font-heading font-bold text-white text-xl">
                                L
                            </span>
                        </div>

                        {/* Dynamic Brand Typography */}
                        <div className="flex items-baseline">
                            <span className="font-heading font-bold text-2xl tracking-tighter text-white group-hover:tracking-wider transition-all duration-500 ease-out">
                                LUMINA
                            </span>
                            {/* Pulsing Accent Dot */}
                            <span className="w-1.5 h-1.5 bg-white rounded-full ml-1.5 animate-pulse group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500"></span>
                        </div>
                    </Link>

                    {/* Center Links (Animated Underline) */}
                    <div className="flex items-center space-x-5 md:space-x-10">
                        <Link to="/" className="text-sm font-medium text-textMuted hover:text-primary transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm font-medium text-textMuted hover:text-primary transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                            Collection
                        </Link>
                    </div>

                    {/* Right Side Icons/Actions */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* CART - Always visible, even if no user */}
                        {(!user || user.role !== 'admin') && (
                            <Link to="/cart" className="flex items-center gap-2 text-textMuted hover:text-green-500 transition-all duration-300 group relative">
                                <div className="p-2 rounded-full border border-transparent group-hover:border-neutral-800 group-hover:bg-neutral-900/50 transition-all">
                                    <ShoppingBag size={20} className="group-hover:scale-110 transition-transform duration-300" />
                                </div>

                            </Link>
                        )}

                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <Link to="/admin" className="flex items-center gap-2 text-textMuted hover:text-blue-400 transition-colors group">
                                        <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                        <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Dashboard</span>
                                    </Link>
                                ) : (
                                    <Link to="/orders" className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-textMuted hover:text-blue-400 transition-colors">
                                       My Orders
                                    </Link>
                                )}
                                
                                <div className="h-4 w-px bg-neutral-800 mx-2 hidden sm:block"></div>

                                <button onClick={handleLogout} className="flex items-center gap-2 text-textMuted hover:text-red-400 transition-colors group p-2">
                                    <LogOut size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 text-white border border-neutral-800 hover:border-white px-5 py-2.5 rounded-full transition-all duration-500 hover:bg-white hover:text-black text-xs font-bold uppercase tracking-widest">
                                <User size={16} />
                                <span className="hidden sm:inline">Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;