
import { baseApi } from '../api/baseApi.js';



const bookingApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

        // get available slots for booking a service
    
        getAvailableSlots: builder.query({
            query: (serviceId) => ({
                url: `/booking/get-available-slots/${serviceId}`,
                method: 'GET',
            }),
        }),

        createBooking: builder.mutation({
            query: (data) => ({
                url: 'booking',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    

        
}),
});

export const {
   
    useGetAvailableSlotsQuery,
    useCreateBookingMutation,
    
} = bookingApi;
