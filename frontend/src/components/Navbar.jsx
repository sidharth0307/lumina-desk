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
        <nav className="border-b border-surface bg-background text-textMain sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-background font-bold text-xl">
                            L
                        </div>
                        <span className="font-serif font-bold text-xl tracking-wider">Lumina Desk</span>
                    </Link>

                    {/* Center Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/products" className="hover:text-primary transition-colors">Collection</Link>
                    </div>

                    {/* Right Side Icons/Actions */}
                    <div className="flex items-center space-x-6">
                       {user ? (
                                <>
                                    {user.role === 'admin' ? (
                                        <Link to="/admin" className="flex items-center gap-1 hover:text-primary transition-colors">
                                            <LayoutDashboard size={20} />
                                            <span className="hidden sm:inline text-sm">Dashboard</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link to="/orders" className="text-sm hover:text-primary transition-colors hidden sm:block">My Orders</Link>
                                            <Link to="/cart" className="flex items-center gap-1 hover:text-primary transition-colors">
                                                <ShoppingBag size={20} />
                                                <span className="hidden sm:inline text-sm">Cart</span>
                                            </Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                        <LogOut size={20} />
                                    </button>
                                </>
                            ) : (
                            <Link to="/login" className="flex items-center gap-1 hover:text-primary transition-colors">
                                <User size={20} />
                                <span className="hidden sm:inline text-sm">Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;