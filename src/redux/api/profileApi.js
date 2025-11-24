import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // edit profile
        editProfile: builder.mutation({
            query: (data) => ({
                url: 'users/profile-update',
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
        
    
    })
})

export const  {
    useEditProfileMutation,
    useChangePasswordMutation,

} = profileApi

