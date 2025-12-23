'use client'
import { TagTypes } from "@/constants/constants";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get freeLancer home
    getFreelancerHome: builder.query({
      query: () => ({
        url: "users/freelancer-home",
        method: "GET",
      }),
      providesTags: [TagTypes.user],
      keepUnusedDataFor: 0, // delete cached data immediately
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),
    // get freeLancer home
    getClientHome: builder.query({
      query: () => ({
        url: "users/user-home",
        method: "GET",
      }),
      providesTags: [TagTypes.user],
      keepUnusedDataFor: 0, // delete cached data immediately
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),

    // edit profile
    editProfile: builder.mutation({
      query: (data) => ({
        url: "users/profile-update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [TagTypes.user],
    }),

    // Change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // upload profile image
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "users/profile-image",
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: [TagTypes.user],
    }),

    // upload cover photo for Professional
    uploadCoverPhoto: builder.mutation({
      query: (formData) => ({
        url: "users/profile-cover-image",
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: [TagTypes.user],
    }),

    // add Whats App
    updateWhatsAppNumber: builder.mutation({
      query: (data) => ({
        url: "users/whatsapp-update",
        method: "PUT",
        body: data,
      }),
    }),

    // varify account for freelancers via certificate upload
    uploadCertificate: builder.mutation({
      query: (formData) => ({
        url: "users/certificate",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
    useGetFreelancerHomeQuery,
    useGetClientHomeQuery,
    useEditProfileMutation,
    useChangePasswordMutation,
    useUploadProfileImageMutation,
    useUploadCoverPhotoMutation,
    useUpdateWhatsAppNumberMutation,
    useUploadCertificateMutation,

} = profileApi

