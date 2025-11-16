import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

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
    useChangePasswordMutation,

} = profileApi

