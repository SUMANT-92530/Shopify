import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import listingReducer from "../slices/listingSlice";

const rootReducer = combineReducers({
  // Add your reducers here
    auth: authReducer,
    cart: cartReducer,
    listings: listingReducer,
});

export default rootReducer;

