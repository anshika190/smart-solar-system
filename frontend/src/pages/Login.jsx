import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use 'react-router-dom', NOT 'react-router'
import { AuthContext } from '../auth/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Attempt to login via API
            const response = await api.post('/auth/login', formData);

            // Login successful
            login(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/monitor'); // Default redirect to dashboard

        } catch (err) {
            console.error("Login attempt failed:", err);

            // Fallback for Demo/Testing if backend is offline or returns specific error
            // Remove this block in strict production if you want to force backend only
            const isNetworkError = err.code === 'ERR_NETWORK';

            if (isNetworkError) {
                setError('Unable to connect to server. Please ensure the backend is running.');
            } else {
                setError(err.response?.data?.message || 'Invalid credentials');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome Back</h2>
                    <p style={{ color: '#94a3b8' }}>Access your Solar Command Center</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%', padding: '12px 12px 12px 40px',
                                    background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px', color: '#fff', outline: 'none'
                                }}
                                placeholder="admin@solarai.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%', padding: '12px 12px 12px 40px',
                                    background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px', color: '#fff', outline: 'none'
                                }}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    >
                        {isLoading ? 'Authenticating...' : (
                            <>
                                Sign In <LogIn size={18} style={{ marginLeft: '8px' }} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8' }}>
                    New to SolarAI? <Link to="/register" style={{ color: '#0ea5e9', textDecoration: 'none' }}>Initialize Protocol</Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
