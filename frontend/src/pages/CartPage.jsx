import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {userInfo}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // Calculate total cost, shipping, taxes, and total price
  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = totalCost > 100 ? 0 : 10;
  const taxes = totalCost * 0.1;
  const totalPrice = totalCost + shipping + taxes;

  const checkoutHandler=()=>{
    if(userInfo){
      navigate("/checkout")
    }else{
      navigate(`/login?redirect=checkout`)
    }
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Items Section */}
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-6">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400">${item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-gray-700 text-white p-1 rounded-full hover:bg-gray-600 transition-all"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      disabled={item.qty >= item.stock}
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-gray-700 text-white p-1 rounded-full hover:bg-gray-600 transition-all"
                    >
                      +
                    </button>
                  </div>
                  {/* Remove Item Button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-400 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-6">Cart Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Cost</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (10%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={checkoutHandler} className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};