import { baseApi } from "./baseApi";

const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // About us
        getAboutUs: builder.query({
            query: () => ({
                url: 'legal/about-us',
                method: 'GET',
            })
        }),

        // Terms & Conditions
        getTermsConditions: builder.query({
            query: () => ({
                url: 'legal/terms-and-conditions',
                method: 'GET',
            })
        }),

        // Privacy Policy
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: 'legal/privacy-policy',
                method: 'GET',
            })
        }),

        // get contact us
        getContactUs: builder.query({
            query: () => ({
                url: 'legal/contact-us',
                method: 'GET',
            })
        }),

        // Get in touch
        getInTouch: builder.mutation({
            query: (data) => ({
                url: 'getTouch',
                method: 'POST',
                body: data,
            })
        }),


    }),

});

export const {

    useGetAboutUsQuery,
    useGetTermsConditionsQuery,
    useGetPrivacyPolicyQuery,
    useGetContactUsQuery,
    useGetInTouchMutation,

} = legalApi;
