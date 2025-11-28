import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({

  
    // baseUrl: 'https://alexskz-freelancer-backend.vercel.app/api/v1/',
    baseUrl: 'https://alexskz-freelancer-backend.vercel.app/api/v1/',
    //  baseUrl: 'http://10.10.20.2:5005/api/v1/',

    //  if token is saved in cookies then this portion is not needed

    prepareHeaders: (headers) => {
        const token = localStorage.getItem('user-token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },

     credentials: 'include',
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['User', 'Availability'],
    endpoints: () => ({})

});
