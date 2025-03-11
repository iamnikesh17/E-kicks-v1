import React from "react";

const categories = [
  { id: 1, name: "Electronics", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Fashion", image: "https://via.placeholder.com/300" },
  { id: 3, name: "Home & Kitchen", image: "https://via.placeholder.com/300" },
];

export const Categories = () => {
  return (
    <div className="bg-gray-800 py-12">
      <h2 className="text-4xl font-bold text-white text-center mb-8">
        Shop by Category
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

