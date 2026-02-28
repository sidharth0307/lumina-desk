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
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
            <div className="w-full max-w-md bg-surface p-8 rounded-sm border border-surface/50 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-textMain">Join Lumina Desk</h2>
                    <p className="text-textMuted mt-2">Create an account to track your orders</p>
                </div>

                {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-sm mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Full Name</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-background border border-surface text-textMain rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background border border-surface text-textMain rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            minLength="6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-surface text-textMain rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-primary text-background font-medium py-3 rounded-sm hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {isLoading ? 'Creating Account...' : (
                            <>
                                Create Account <UserPlus size={18} />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-textMuted text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;