
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

    // delete service
    deleteService: builder.mutation({
        query: (id) => ({
            url: `service/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result, error, arg) => ['User']
    }),
    

        
}),
});

export const {
   
    useCreateServiceMutation,
    useDeleteServiceMutation,
    
} = serviceApi;
