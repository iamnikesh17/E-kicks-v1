import React from "react";
import { HeroSection } from "./components/HeroSection";
import { Newsletter } from "./components/NewsLetter";
import { FeaturedProducts } from "./components/FeaturedProducts";


export const HomePage = () => {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      <FeaturedProducts />
      <Newsletter />
    
    
    </div>
  );
};

