
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
    

        
}),
});

export const {
   
    useGetAvailableSlotsQuery,
    
} = bookingApi;
