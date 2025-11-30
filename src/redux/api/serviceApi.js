
import { baseApi } from '../api/baseApi.js';
const serviceApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    // create service
    createService: builder.mutation({
        query:(formData) => ({
            url: 'service',
            method: 'POST',
            body: formData,
        }),
        invalidatesTags: (result, error, arg) => ['User'],
    }),

    // update service
    updateService: builder.mutation({
        query:({id, formData}) => ({
            url: `service/${id}`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: (result, error, arg) => ['User'],
    }),


    // delete service
    deleteService: builder.mutation({
        query: (id) => ({
            url: `service/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result, error, arg) => ['User']
    }),

    // get popular services
    getPopularServices: builder.query({
        query: () => ({
            url: 'service',
            method: 'GET',
            params: { popularService: true },
        }),
        providesTags: (result, error, arg) => ['Service'],

    }),
     // get popular services
    getCertifiedServices: builder.query({
        query: () => ({
            url: 'service',
            method: 'GET',
           
        }),
        providesTags: (result, error, arg) => ['Service'],

    }),
}),
});

export const {
   
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useGetPopularServicesQuery,
    useGetCertifiedServicesQuery,

    
} = serviceApi;
