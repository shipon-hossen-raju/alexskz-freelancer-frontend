
import { baseApi } from '../api/baseApi.js';



const subscriptionApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    
    //get all categories
    getAllSubscription: builder.query({
        query: () => ({
            url: 'subscriptions/subscription-plan',
            method: 'GET',
        })
    }),

        
}),
});

export const {
   
    useGetAllSubscriptionQuery, 
    
} = subscriptionApi;