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

    getChatFiles: builder.query({
      query: (roomId) => {
        return {
          url: `/users/get-chat-files/${roomId}`,
          method: "GET",
        };
      },
    }),
    getMeetingFiles: builder.query({
      query: (receiverId) => {
        return {
          url: `/zoom/meetings/recordings/${receiverId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllChatUsersQuery, useGetChatMessagesByUserIdQuery, useGetChatFilesQuery , useGetMeetingFilesQuery } =
  chatApi;
