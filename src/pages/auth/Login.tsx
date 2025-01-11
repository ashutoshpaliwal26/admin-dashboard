import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B16] p-4">
      <div className="bg-[#0F1631] p-8 rounded-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Dashdark X</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-700 rounded focus:ring-purple-600"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-purple-500 hover:text-purple-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-500 hover:text-purple-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;