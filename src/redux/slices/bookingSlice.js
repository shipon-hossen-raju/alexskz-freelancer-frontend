"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceId: null,
  availabilityTimeId: null,
  bookingFromNotification: null,
  reviewBookingData: {
    model: false,
    bookingId: null
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    serviceIdForBooking: (state, action) => {
      state.serviceId = action.payload;
      // console.log('from slice', state.serviceId)
    },

    availabilityTimeIdForBooking: (state, action) => {
      state.availabilityTimeId = action.payload;
    },

    clearServiceIdForBooking: (state) => {
      state.serviceId = null;
    },
    clearAvailabilityTimeIdForBooking: (state) => {
      state.availabilityTimeId = null;
    },
    setBookingFromNotification: (state, action) => {
      state.bookingFromNotification = action.payload;
    },
    setReviewBookingData: (state, action) => {
      state.reviewBookingData = action.payload;
    },
  },
});

export const {
  serviceIdForBooking,
  availabilityTimeIdForBooking,
  clearServiceIdForBooking,
  clearAvailabilityTimeIdForBooking,
  setBookingFromNotification,
  setReviewBookingData
} = bookingSlice.actions;
export default bookingSlice.reducer;
