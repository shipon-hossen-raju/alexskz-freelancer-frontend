import paramsGenerate from "@/utils/paramsGenerate.js";
import { baseApi } from "../api/baseApi.js";
import { TagTypes } from "@/constants/constants.js";
const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create service
    createService: builder.mutation({
      query: (formData) => ({
        url: "service",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        TagTypes.services,
        TagTypes.user,
      ],
    }),

    // update service
    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `service/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        TagTypes.services,
        TagTypes.user,
      ],
    }),

    // delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        TagTypes.services,
        TagTypes.user,
      ],
    }),

    // get popular services
    getPopularServices: builder.query({
      query: () => ({
        url: "service",
        method: "GET",
        params: { popularService: true },
      }),
      providesTags: (result, error, arg) => {
        if (result?.success) {
          return [TagTypes.services];
        }
        return [];
      },
    }),
    // get popular services
    getCertifiedServices: builder.query({
      query: (args) => {
        const params = paramsGenerate(args);
        return {
          url: "service",
          method: "GET",
          params: params,
        };
      },
        providesTags: (result, error, arg) => {
      if (result?.success) {
        return [TagTypes.services];
      }
      return [];
      }
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetPopularServicesQuery,
  useGetCertifiedServicesQuery,
} = serviceApi;
