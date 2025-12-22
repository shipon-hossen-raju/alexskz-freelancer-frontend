import { baseApi } from "../api/baseApi.js";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get All chat users
    getAllChatUsers: builder.query({
      query: () => ({
        url: "message/users",
        method: "GET",
      }),
      providesTags: ["ChatUsers"],
    }),

    // get chat messages by user id
    getChatMessagesByUserId: builder.query({
      query: (userId) => ({
        url: `message/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Messages", id }],
    }),
  }),
});

export const { useGetAllChatUsersQuery, useGetChatMessagesByUserIdQuery } =
  chatApi;
