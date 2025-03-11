import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div
      className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate-fade-in">
          Discover the best products at unbeatable prices.
        </p>
        <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 animate-bounce">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

