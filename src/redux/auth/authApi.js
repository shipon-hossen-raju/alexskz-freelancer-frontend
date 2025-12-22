// 'use client'

import { baseApi } from "../api/baseApi.js";
import { clearUser } from "./userSlice.js";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Client registration
    signupForClient: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Professional registration
    signUpForProfessional: builder.mutation({
      query: (data) => ({
        url: "users/register-professional",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Verify OTP code
    verifyCode: builder.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // resend OTP code
    resendCode: builder.mutation({
      query: (data) => ({
        url: "auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // login User
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include", // ensures cookie is sent & received
      }),
    }),

    // Get Profile
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 0, // delete cached data immediately
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),

    // Logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser(undefined));
          // go to login page
          window.location.href = "/sign-in";
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
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

  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
