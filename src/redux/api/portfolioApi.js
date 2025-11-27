
import { baseApi } from '../api/baseApi.js';

const portfolioApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    // create projects
    createProject: builder.mutation({
        query: (formData) => ({
            url: 'projects',
            method: 'POST',
            body: formData,
        }),

        invalidatesTags: ['Project'],
    }),
    
    // update project
    updateProject: builder.mutation({
        query: ({id, formData}) => ({
            url: `projects/${id}`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['Project'],
    
    }),

    // delete project
    deleteProject: builder.mutation({
        query: (id) => ({
            url: `projects/${id}`,
            method: 'DELETE',
            
        }),
        invalidatesTags: (result, error, arg) => ['Project']
    
    }),

    // get my projects
    getMyProjects: builder.query({
        query: () => ({
            url: 'projects',
            method: 'GET',
            params: {me: true},
        }),
        providesTags: ['Project'],
    }),
        
}),
});

export const {
   
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useGetMyProjectsQuery
    
} = portfolioApi;
