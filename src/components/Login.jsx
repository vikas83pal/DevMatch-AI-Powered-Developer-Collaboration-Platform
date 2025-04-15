import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const handleGoogleLogin = () => {
    // Implement Google OAuth logic here
    console.log('Google login clicked');
    // window.location.href = 'your-google-oauth-endpoint';
  };

  const handleGithubLogin = () => {
    // Implement GitHub OAuth logic here
    console.log('GitHub login clicked');
    // window.location.href = 'your-github-oauth-endpoint';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email/password login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">Sign in to continue to DevMatch</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/10"
            >
              <FcGoogle className="text-xl mr-3" />
              Continue with Google
            </button>
            
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/10"
            >
              <FaGithub className="text-xl mr-3" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-400 text-sm">
                <input type="checkbox" className="rounded bg-gray-800/50 border-gray-700 text-indigo-600 focus:ring-indigo-500 mr-2" />
                Remember me
              </label>
              <a href="/forgot" className="text-sm text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;