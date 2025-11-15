
import { baseApi } from '../api/baseApi.js';



const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        // Client registration
        signupForClient: builder.mutation({
            query: (data) => ({
                url: 'users/register',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),

        // Professional registration
        signUpForProfessional: builder.mutation({
            query: (data) => ({
                url: 'users/register-professional',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),

        // Verify OTP code
        verifyCode: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body: data,

            })
        }),

        // resend OTP code
        resendCode: builder.mutation({
            query: (data) => ({
                url: 'auth/resend-otp',
                method: 'POST',
                body: data,

            })
        }),

        // login User
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
                credentials: 'include',    // ensures cookie is sent & received
            }),
        }),

        // Get Profile
        getUserProfile: builder.query({
            query: () => ({
                url: 'auth/me',
                method: 'GET',
                // credentials: 'include',
                providesTags: ['User'],
            })
        }),

        // Logout user
        logoutUser: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
                invalidatesTags: ['User']
                
            }),
        }),







    }),
});

export const {
    useSignupForClientMutation,
    useSignUpForProfessionalMutation,
    useVerifyCodeMutation,
    useResendCodeMutation,
    useLoginUserMutation,
    useGetUserProfileQuery,
    useLogoutUserMutation,


} = authApi;
