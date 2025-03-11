import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  cartItems: [],
  itemsPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCartState(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
      updateCartState(state);
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((x) => x._id === itemId);
      if (item) {
        item.qty += 1;
      }
      updateCartState(state);
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((x) => x._id === itemId);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      updateCartState(state);
    },
    clearCart:(state,action)=>{
      state.cartItems=[];
      state.itemsPrice=0;
      state.taxPrice=0;
      state.totalPrice=0;
      state.shippingAddress={};
      localStorage.removeItem("cart");

    }
  },
});

// Helper function to update cart state and localStorage
const updateCartState = (state) => {
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.taxPrice = state.itemsPrice * 0.1;
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
  localStorage.setItem("cart", JSON.stringify(state));
};

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity,clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;