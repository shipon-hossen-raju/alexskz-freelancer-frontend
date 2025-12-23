"use client";
import { TagTypes } from "@/constants/constants.js";
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
      invalidatesTags: [TagTypes.user, TagTypes.bookings],
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

      providesTags: [TagTypes.bookings],
    }),
    createBookingStatusForProfessional: builder.mutation({
      query: (data) => ({
        url: "booking/booking-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TagTypes.bookings],
    }),
    getDeliveryProject: builder.query({
      query: ({ receiverId }) => ({
        url: `/booking/my-booking-delivery/${receiverId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.bookingDelivery],
    }),
    deliverProject: builder.mutation({
      query: (data) => ({
        url: `/booking/booking-deliver`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.bookingDelivery];
        }
        return [TagTypes.bookingDelivery];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Deliver project is successfully");
        } catch (err) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";

          if (status === 500) {
            ErrorToast("Something Went Wrong");
          } else {
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useCreateBookingStatusForProfessionalMutation,
  useGetDeliveryProjectQuery,
  useDeliverProjectMutation,
} = bookingApi;
