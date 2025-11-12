
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
                method:'POST',
                body: data,
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        }),



      
        
       
    }),
});

export const {
    useSignupForClientMutation,
    useSignUpForProfessionalMutation,
    
    
    
} = authApi;
