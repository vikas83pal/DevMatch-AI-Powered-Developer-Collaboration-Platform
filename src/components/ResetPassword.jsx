import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiCheck, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { authAPI } from '../services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validatePassword = (pass) => {
        if (pass.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(pass)) return 'Password must contain an uppercase letter';
        if (!/[0-9]/.test(pass)) return 'Password must contain a number';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await authAPI.resetPassword({ token, password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'Failed to reset password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strength = getPasswordStrength();

    if (success) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div className="animated-bg"></div>
                <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 40, textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <FiCheck style={{ width: 32, height: 32, color: '#10b981' }} />
                    </div>
                    <h1 style={{ color: 'white', fontSize: 24, marginBottom: 12 }}>Password Reset!</h1>
                    <p style={{ color: '#a1a1aa', marginBottom: 24 }}>Your password has been successfully reset. Redirecting to login...</p>
                    <Link to="/login" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 24px' }}>
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div className="animated-bg"></div>

            <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 40 }}>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a1a1aa', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
                    <FiArrowLeft style={{ width: 16, height: 16 }} />
                    Back to Login
                </Link>

                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <FiLock style={{ width: 28, height: 28, color: 'white' }} />
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                        Reset Password
                    </h1>
                    <p style={{ color: '#a1a1aa', fontSize: 14 }}>
                        Enter your new password below
                    </p>
                </div>

                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, marginBottom: 20 }}>
                        <FiAlertCircle style={{ color: '#ef4444', flexShrink: 0 }} />
                        <span style={{ color: '#ef4444', fontSize: 14 }}>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', color: '#d1d5db', fontSize: 14, marginBottom: 8 }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                color: 'white',
                                fontSize: 14,
                            }}
                        />

                        {/* Password strength indicator */}
                        {password && (
                            <div style={{ marginTop: 8 }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                flex: 1,
                                                height: 4,
                                                borderRadius: 2,
                                                background: i < strength ? strengthColors[strength - 1] : 'rgba(255,255,255,0.1)',
                                            }}
                                        />
                                    ))}
                                </div>
                                <p style={{ fontSize: 12, color: strengthColors[strength - 1] || '#71717a' }}>
                                    {strength > 0 ? strengthLabels[strength - 1] : 'Enter a password'}
                                </p>
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', color: '#d1d5db', fontSize: 14, marginBottom: 8 }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.05)',
                                border: `1px solid ${confirmPassword && confirmPassword !== password ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: 8,
                                color: 'white',
                                fontSize: 14,
                            }}
                        />
                        {confirmPassword && confirmPassword !== password && (
                            <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !password || !confirmPassword}
                        className="btn-primary"
                        style={{ width: '100%', padding: '14px 24px', fontSize: 16 }}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
