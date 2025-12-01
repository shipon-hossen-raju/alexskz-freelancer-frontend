
import { baseApi } from '../api/baseApi.js';



const publicApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    
    //get all categories
    getReviewsForPublic: builder.query({
        query: () => ({
            url: 'reviews/testimonials',
            method: 'GET',
        })
    }),

    // get rising stars professionals
    getRisingStars: builder.query({
        query: () => ({
            url: 'users/freelancers',
            method: 'GET',
            params: { risingStars: true }
        }),
    }),

    // get top rated professionals
    getTopRatedProfessional: builder.query({
        query: () => ({
            url: 'users/freelancers',
            method: 'GET',
            params: { topRated: true }
        }),
    }),

    // view profile by public
    getProfileForPublicView: builder.query({
        query: (id) => ({
            url: `users/view-profile/${id}`,
            method: 'GET',
        }),
    }),

}),
});

export const {
   
    useGetReviewsForPublicQuery,
    useGetRisingStarsQuery, 
    useGetTopRatedProfessionalQuery,
    useGetProfileForPublicViewQuery,
    
} = publicApi;
