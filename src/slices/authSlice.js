import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,

    user: JSON.parse(localStorage.getItem("user")) || null,

    isAuthenticated: localStorage.getItem("token") ? true : false,
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

        // ✅ Update User Info (Used in Account Settings)
        setUser: (state, action) => {
        state.user = action.payload;

        // Update localStorage also
        localStorage.setItem("user", JSON.stringify(action.payload));
        },

        // ✅ Logout
        logout: (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
