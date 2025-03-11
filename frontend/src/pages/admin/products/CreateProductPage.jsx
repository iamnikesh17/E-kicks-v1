import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "../../../slices/categoryApiSlice";
import { Loader } from "../../../components/main";
import { useCreateProductMutation } from "../../../slices/productsApiSlice";

import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const CreateProductPage = () => {
  const { data: categories, isLoading: categoriesLoading, error } = useGetAllCategoriesQuery();
  const [createProduct,{isLoading:createProductLoading}]=useCreateProductMutation();


  console.log(categories);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: null,
  });
  const navigate=useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productFormData = new FormData(); // Renamed to avoid conflict
    productFormData.append("name", formData.name);
    productFormData.append("description", formData.description);
    productFormData.append("price", formData.price);
    productFormData.append("stock", formData.stock);
    productFormData.append("category", formData.category);
    productFormData.append("image", formData.image);

    try{
      const res=await createProduct(productFormData).unwrap();
      toast.success("Product created successfully");
      navigate("/admin");
    }catch(error){
      toast.error(error?.data?.message || error?.error)
    }
    
  };

  if (categoriesLoading || createProductLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Product</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Product Details */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-400 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                name="price"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
              <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Quantity */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-400 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Column: Image Upload */}
          <div className="space-y-6">
            {/* File Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-1">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-transparent text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-gray-200 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;