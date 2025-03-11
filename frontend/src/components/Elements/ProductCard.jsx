import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

export const ProductCard = ({ product }) => {
    const {  name, image, price, rating } = product;
    const [inCart,setInCart]=useState(false);
  // Render star rating as filled and empty stars based on the provided rating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return (
      <>
        {Array(filledStars)
          .fill()
          .map((_, idx) => (
            <span key={`filled-${idx}`} className="text-yellow-400">★</span>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, idx) => (
            <span key={`empty-${idx}`} className="text-gray-400">★</span>
          ))}
      </>
    );
  };

  const {cartItems}=useSelector((state)=>state.cart);

  useEffect(()=>{
    const isInCart=cartItems.find((x)=>x._id===product._id)
    if(isInCart){
      setInCart(isInCart)
    }
  },[cartItems])


  const dispatch=useDispatch();

  const cartHandler=()=>{
    dispatch(addToCart({...product,qty:1}))
    setInCart(true)
  }

  const removeCartHandler=()=>{
    dispatch(removeFromCart(product._id))
    setInCart(false)
  }


  return (
    <div className="bg-gray-800 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl p-4">
      {/* Product Image */}
      <div className="relative group">
        <img
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww"
          alt={name}
          className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Product Information */}
      <div className="mt-4">
        {/* Product Name */}
        <h3 className="text-white text-xl font-semibold hover:text-blue-500 transition-all duration-200">
          {name}
        </h3>

        {/* Product Price */}
        <p className="text-green-500 text-lg font-medium mt-2">{price}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {renderStars(rating)}
        </div>

        {/* Add to Cart Button */}
        {
          inCart?(
            <button onClick={removeCartHandler} className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl">
              Remove item
            </button>
          ):(
            <button onClick={cartHandler} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl">
            Add to Cart
          </button>
          )
        }
       
      </div>
    </div>
  );
};






