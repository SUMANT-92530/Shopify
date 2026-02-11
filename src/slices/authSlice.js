import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,

  user: (() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  })(),

  isAuthenticated: !!localStorage.getItem("token"),

  // ✅ Add verification state
  verified: JSON.parse(localStorage.getItem("verified")) || false,
  verificationSteps: JSON.parse(localStorage.getItem("verificationSteps")) || {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ Login Success
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    // ✅ Update User Info
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // ✅ Logout
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.verified = false;
      state.verificationSteps = {};

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("verified");
      localStorage.removeItem("verificationSteps");
    },

    // ✅ Seller Verified
    sellerVerified: (state, action) => {
      state.verified = action.payload.verified;
      state.verificationSteps = action.payload.steps;

      console.log("Seller verification updated:", {
        verified: action.payload.verified,
        steps: action.payload.steps,
      });

      // Persist verification state
      localStorage.setItem("verified", JSON.stringify(action.payload.verified));
      localStorage.setItem("verificationSteps", JSON.stringify(action.payload.steps));
    },
  },
});

export const { loginSuccess, setUser, logout, sellerVerified } = authSlice.actions;
export default authSlice.reducer;