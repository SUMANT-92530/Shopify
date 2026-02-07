import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice"; 

const rootReducer = combineReducers({
  // Add your reducers here
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;

