import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({

  
    // baseUrl: 'http://10.10.20.73:5000/api/',
     baseUrl: 'https://alexskz-freelancer-backend.vercel.app/api/v1',
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
    endpoints: () => ({})

});
