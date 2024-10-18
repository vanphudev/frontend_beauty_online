import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => `http://localhost:5555/api/v1/brands/getall`
    }),
  }),
});

export const {
 useGetActiveBrandsQuery
} = brandApi;
