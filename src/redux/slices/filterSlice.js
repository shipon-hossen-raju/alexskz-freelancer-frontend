"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryIds: [],
  minPrice: null,
  maxPrice: null,
  isOnline: null,
  topRated: null,
  inPerson: null,
  isCertified: null,
  searchTerm: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIds: (state, action) => {
      state.categoryIds = action.payload;
    },

    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },

    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },

    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },

    setInPerson: (state, action) => {
      state.inPerson = action?.payload;
    },

    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },

    setIsCertified: (state, action) => {
      state.isCertified = action.payload;
    },

    clearCategoryIds: (state) => {
      state.categoryIds = null;
    },

    clearMinPrice: (state) => {
      state.minPrice = null;
    },
    clearMaxPrice: (state) => {
      state.maxPrice = null;
    },
    clearIsOnline: (state) => {
      state.isOnline = false;
    },
    clearTopRated: (state) => {
      state.topRated = false;
    },
    clearIsCertified: (state) => {
      state.isCertified = false;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setCategoryIds,
  setMinPrice,
  setMaxPrice,
  setIsOnline,
  setTopRated,
  setIsCertified,
  clearCategoryIds,
  clearMinPrice,
  clearMaxPrice,
  clearIsOnline,
  clearTopRated,
  clearIsCertified,
  setSearchTerm,
  setInPerson,
} = filterSlice.actions;
export default filterSlice.reducer;
