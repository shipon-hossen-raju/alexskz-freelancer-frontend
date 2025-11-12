
import { baseApi } from '../api/baseApi.js';



const categoryApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

    
    //get all categories
    getAllCategory: builder.query({
        query: () => ({
            url: 'categories/',
            method: 'GET',
        })
    }),

        
}),
});

export const {
   
    useGetAllCategoryQuery, 
    
} = categoryApi;
