import {apiSlice} from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      addCategory: builder.mutation({
         query: (data) => ({
            url: "https://shofy-backend.vercel.app/api/category/add",
            method: "POST",
            body: data,
         }),
      }),
      getShowCategory: builder.query({
         query: () => `http://localhost:5555/api/v1/categories/getall`,
      }),
      getProductTypeCategory: builder.query({
         query: (type) => `http://localhost:5555/api/v1/categories/status/${type}`,
      }),
   }),
});

export const {useAddCategoryMutation, useGetProductTypeCategoryQuery, useGetShowCategoryQuery} = categoryApi;
