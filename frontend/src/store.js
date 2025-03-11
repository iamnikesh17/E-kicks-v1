import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import { authReducer } from "./slices/authSlice";
import { cartReducer } from "./slices/cartSlice";

// Determine if we are in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  // Enable Redux DevTools only in development mode
  devTools: isDevelopment,
});

export default store;

