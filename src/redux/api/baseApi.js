import { config } from "@/config";
import { TagTypes } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.backend_url}/api/v1/`,

  //  if token is saved in cookies then this portion is not needed
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("user-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // include
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  // tagTypes: ["User", "Availability"],
  tagTypes: [typeof Object.values(TagTypes)],
  endpoints: () => ({}),
});
