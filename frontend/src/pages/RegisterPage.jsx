import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6 animate-fade-in">
          Register
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">Or continue with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
            </button>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
              <img
                src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

