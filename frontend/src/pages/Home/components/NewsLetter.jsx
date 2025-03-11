import React from "react";

export const Newsletter = () => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Subscribe to Our Newsletter
        </h2>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
