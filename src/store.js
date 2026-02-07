import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; 
import authReducer from "./slices/authSlice"; // agar tu auth bhi use kar raha hai

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // optional
  },
});