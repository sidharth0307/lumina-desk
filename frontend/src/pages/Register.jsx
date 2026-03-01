import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Direct API call to register
            await api.post('/auth/register', { name, email, password });
            // On success, send them to login
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Email might already be in use.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12 overflow-hidden animate-fade-in">
            {/* Subtle Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md bg-surface/40 backdrop-blur-xl p-10 sm:p-12 rounded-[2rem] border border-border-subtle shadow-2xl shadow-black/50 animate-fade-in-up">
                
                <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-background border border-border-subtle rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                        <UserPlus size={24} className="text-textMain" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-textMain tracking-tight">Join Lumina Desk</h2>
                    <p className="text-textMuted mt-3 font-light">Create an account to track your orders</p>
                </div>

                {error && (
                    <div className="bg-red-950/20 border border-red-900/50 text-red-400 p-4 rounded-2xl mb-8 text-sm text-center animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2 pl-2">Full Name</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-background border border-border-subtle text-textMain rounded-full px-6 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2 pl-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background border border-border-subtle text-textMain rounded-full px-6 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2 pl-2">Password</label>
                        <input 
                            type="password" 
                            required
                            minLength="6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border-subtle text-textMain rounded-full px-6 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-primary text-background font-bold py-4 rounded-full transition-all duration-300 flex justify-center items-center gap-3 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-t-2 border-r-2 border-background rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <>
                                    Create Account <UserPlus size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-textMuted text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-textMain transition-colors font-medium underline decoration-border-subtle underline-offset-4">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;