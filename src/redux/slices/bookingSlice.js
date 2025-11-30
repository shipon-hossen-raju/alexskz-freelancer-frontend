'use client'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    serviceId: null,
    availabilityTimeId: null,
  }

export const bookingSlice = createSlice({
  name: 'booking',
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

  },
});


export const { serviceIdForBooking, availabilityTimeIdForBooking, clearServiceIdForBooking, clearAvailabilityTimeIdForBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
