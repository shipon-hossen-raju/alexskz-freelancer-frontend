"use client";
import paramsGenerate from "@/utils/paramsGenerate.js";
import { baseApi } from "../api/baseApi.js";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get available slots for booking a service

    getAvailableSlots: builder.query({
      query: (serviceId) => ({
        url: `/booking/get-available-slots/${serviceId}`,
        method: "GET",
      }),
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Bookings"],
    }),

    getAllBookings: builder.query({
      query: (args) => {
        const params = paramsGenerate(args);
        return {
          url: "booking",
          method: "GET",
          params,
        };
      },

      providesTags: ["Bookings"],
    }),

    createBookingStatusForProfessional: builder.mutation({
      query: (data) => ({
        url: "booking/booking-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useCreateBookingStatusForProfessionalMutation,
} = bookingApi;
