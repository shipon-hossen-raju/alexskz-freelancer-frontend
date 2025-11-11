import { useSelector } from 'react-redux';
import { baseApi } from './baseApi';



const authApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

        // Client registration
        signupForClient: builder.mutation({
            query: (data) => ({
                url: 'auth/signup',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),

         // verify email
        // verifyEmail: builder.mutation({
        //     query: (data) => ({
        //         url: 'auth/verify-email',
        //         method: 'POST',
        //         body: data,
        //     }),
        // }),

        // resend verification code
        // resendCode: builder.mutation({
        //     query: (email) => ({
        //         url: `auth/resend-verification-code`,
        //         method: 'POST',
        //         body: { email },
        //     }),
        // }),


        // getUser
        // getUser: builder.query({
        //     query: () => ({
        //         url: 'auth/profile',
        //         method: 'GET',
        //     }),
           
        //     transformErrorResponse: (response) => {
        //         return { status: response.status, message: response.data?.message };
        //     },
            
        //     providesTags: ['User'],
        // }),

        // user login
        login: builder.mutation({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        //user logout
        logoutUser: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),

        // Forgot Password API Mutation
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        // verify email for reset password
        verifyResetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/verify-reset-code',
                method: 'POST',
                body: data,
            }),
        }),

        // resend verification code for reset password
        resendResetCode: builder.mutation({
            query: (email) => ({
                url: `auth/resend-password-reset-code`,
                method: 'POST',
                body: { email },
            }),
        }),

        // resetting password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        
       
    }),
});

export const {
    useSignupMutation,
    useVerifyEmailMutation,
    useResendCodeMutation,
    useLoginMutation,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useVerifyResetPasswordMutation,
    useResendResetCodeMutation,
    useResetPasswordMutation,
    useGetUserQuery,
    
} = authApi;
