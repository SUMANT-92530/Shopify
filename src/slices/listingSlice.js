import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeTab: "Active",
    listings: [],
    };

    const listingSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        setTab: (state, action) => {
        state.activeTab = action.payload;
        },
        setListings: (state, action) => {
        state.listings = action.payload;
        },
    },
});

export const { setTab, setListings } = listingSlice.actions;
export default listingSlice.reducer;
