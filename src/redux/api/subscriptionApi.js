
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

    createSubscription: builder.mutation({
        query: (data) => ({
            url: 'subscriptions/get-subscription',
            method: 'POST',
            body: data,
        })
    }),

    verifyPayment: builder.mutation({
        query: (data) => ({
            url: 'subscriptions/verify-checkout-session',
            method: 'PUT',
            body: data,
        }),
    }),


    }),
});

export const {
   
    useGetAllSubscriptionQuery, 
    useCreateSubscriptionMutation,
    useVerifyPaymentMutation,
    
} = subscriptionApi;