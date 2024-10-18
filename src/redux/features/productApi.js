import {apiSlice} from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: () => `http://localhost:5555/api/v1/products/getall`,
         providesTags: ["Products"],
      }),
      getProductType: builder.query({
         query: ({query}) => `http://localhost:5555/api/v1/products/tab?valueTab=${query}`,
         providesTags: ["ProductType"],
      }),
      getOfferProducts: builder.query({
         query: (type) => `https://shofy-backend.vercel.app/api/product/offer?type=${type}`,
         providesTags: ["OfferProducts"],
      }),
      getPopularProductByType: builder.query({
         query: (type) => `https://shofy-backend.vercel.app/api/product/popular/${type}`,
         providesTags: ["PopularProducts"],
      }),
      getTopRatedProducts: builder.query({
         query: () => `https://shofy-backend.vercel.app/api/product/top-rated`,
         providesTags: ["TopRatedProducts"],
      }),
      // get single product
      getProduct: builder.query({
         query: (id) => `http://localhost:5555/api/v1/products/${id}`,
         providesTags: (result, error, arg) => [{type: "Product", id: arg}],
         invalidatesTags: (result, error, arg) => [{type: "RelatedProducts", id: arg}],
      }),
      // get related products
      getRelatedProducts: builder.query({
         query: (id) => `https://shofy-backend.vercel.app/api/product/related-product/${id}`,
         providesTags: (result, error, arg) => [{type: "RelatedProducts", id: arg}],
      }),
      getSearchAll:  builder.query({
         query: (searchTerm) => `http://localhost:5555/api/v1/products/search?searchTerm=${searchTerm}`,
         providesTags: ["Products"],
      }),
   }),
});

export const {
   useGetAllProductsQuery,
   useGetProductTypeQuery,
   useGetOfferProductsQuery,
   useGetPopularProductByTypeQuery,
   useGetTopRatedProductsQuery,
   useGetProductQuery,
   useGetRelatedProductsQuery,
   useGetSearchAllQuery
} = productApi;
