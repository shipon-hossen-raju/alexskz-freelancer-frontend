'use client'
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // edit profile
        editProfile: builder.mutation({
            query: (data) => ({
                url: 'users/profile-image',
                method: 'PUT',
                body: data,
            })
        }),

        // Change password
        changePassword: builder.mutation({
            query: (data) => ({
                url: 'auth/change-password',
                method: 'PUT',
                body: data,
            })
        }),

        // upload profile image
        uploadProfileImage: builder.mutation({

            query: (formData) => ({
                url: 'users/profile-image',
                method: 'PUT',
                body: formData,
            }),

            invalidatesTags: ['User'],
        }),

        // upload cover photo for Professional
        uploadCoverPhoto: builder.mutation({

            query: (formData) => ({
                url: 'users/profile-cover-image',
                method: 'PUT',
                body: formData,
            }),

            invalidatesTags: ['User'],
        }),


    })
})

export const {
    useEditProfileMutation,
    useChangePasswordMutation,
    useUploadProfileImageMutation,
    useUploadCoverPhotoMutation,

} = profileApi

