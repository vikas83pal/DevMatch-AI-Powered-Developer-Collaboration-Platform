// filepath: c:\Users\Lenovo\OneDrive\Desktop\side project\frontend\ui\src\components\ForgotPassword.jsx
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset link sent to:', email);
    // Add logic to send a password reset email via your backend or authentication service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 text-center">
            Forgot Password
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Enter your email address to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Send Reset Link
            </button>
          </form>
          <div className="text-center mt-6 text-gray-400">
            Remembered your password?{' '}
            <a href="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;