import { TagTypes } from "@/constants/constants.js";
import { baseApi } from "../api/baseApi.js";
import paramsGenerate from "@/utils/paramsGenerate.js";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (args) => {
        const params = paramsGenerate(args);
        return {
          url: `notifications/me`,
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.notification],
    }),
    getSingleNotification: builder.mutation({
      query: (data) => ({
        url: `notifications/${data}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.notification];
        }
        return [];
      },
    }),
    markAsRead: builder.mutation({
      query: () => ({
        url: `notifications/read`,
        method: "PUT",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.notification];
        }
        return [];
      },
    }),
    getTotalNotificationUnread: builder.query({
      query: () => ({
        url: `notifications/unread`,
        method: "GET",
      }),
      providesTags: [TagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetSingleNotificationMutation,
  useMarkAsReadMutation,
  useGetTotalNotificationUnreadQuery,
} = notificationApi;
