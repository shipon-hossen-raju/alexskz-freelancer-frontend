
import { baseApi } from '../api/baseApi.js';

const availabilityApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        // create or update availability
        upsertAvailability: builder.mutation({
            query: (availabilityData) => ({
                url: 'availability',
                method: 'POST',
                body: availabilityData,
            }),
            invalidatesTags: ['Availability'],
        }),

        // get availability
        getAvailability: builder.query({
            query: () => ({
                url: 'availability',
                method: 'GET',
                params: { me: true },
            }),
            providesTags: ['Availability'],
        }),



    }),
});

export const {

    useGetAvailabilityQuery,
    useUpsertAvailabilityMutation,

} = availabilityApi;
