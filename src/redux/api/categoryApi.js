
// import { baseApi } from '../api/baseApi.js';



// const categoryApi = baseApi.injectEndpoints({

//     endpoints: (builder) => ({


//     //get all categories
//     getAllCategory: builder.query({
//         query: () => ({
//             url: 'categories/',
//             method: 'GET',
//         })
//     }),


// }),
// });

// export const {

//     useGetAllCategoryQuery, 

// } = categoryApi;

// categoryApi.js

import { baseApi } from '../api/baseApi.js';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all categories (now accepts filter params)
    getAllCategory: builder.query({
      // `filters` is an object: { searchTerm, minPrice, maxPrice, categoryIds, ... }
      query: (filters = {}) => {
        // remove undefined / null / empty string values
        const filtered = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        );

        // If your backend expects categoryIds as a JSON string like in your screenshot:
        if (Array.isArray(filtered.categoryIds)) {
          filtered.categoryIds = JSON.stringify(filtered.categoryIds);
        }

        return {
          url: 'categories/',
          method: 'GET',
          // fetchBaseQuery will turn this `params` into query string
          params: filtered,
        };
      },

    }),

    // get services by category Id
    getServicesByCategoryId: builder.query({
      query: (ids) => ({
        url: 'categories/',
        method: 'GET',
       
        params: {
          categoryIds: JSON.stringify(Array.isArray(ids) ? ids : [ids]),
        },
      }),
    })


  }),
});

export const {
  useGetAllCategoryQuery,
  useGetServicesByCategoryIdQuery,
} = categoryApi;
