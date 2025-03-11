import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCart } from "../slices/cartSlice";

export const CheckoutPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, itemsPrice, totalPrice, taxPrice, shippingPrice } =
    useSelector((state) => state.cart);
  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();
    const dispatch=useDispatch();

  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();
  const shippingAddress = {
    address,
    country,
    city,
    postalCode,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        items: cartItems,
        shippingAddress,
        totalPrice,
        taxPrice,
        shippingPrice,
        itemsPrice,
      }).unwrap();
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      
      
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Checkout Container */}
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
            {/* Shipping Form */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  readOnly
                  className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  readOnly
                  className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Shipping Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your address"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    name="postalCode"
                    className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <select
                  className="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <ul className="mb-4 space-y-3">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
              >
                Confirm Order
              </button>
            </div>
          
        </div>
        </form>
      </div>
    </div>
  );
};
