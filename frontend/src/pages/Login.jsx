import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);
            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-sm border border-surface/50 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-textMain">Welcome Back</h2>
                    <p className="text-textMuted mt-2">Sign in to your Lumina Desk account</p>
                </div>

                {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-sm mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {isLoading ? 'Signing In...' : (
                            <>
                                Sign In <LogIn size={18} />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-textMuted text-sm">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;