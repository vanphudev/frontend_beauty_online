import Cookies from "js-cookie";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const NEXT_PUBLIC_API_BASE_URL = "http://localhost:5555/api/v1";

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: NEXT_PUBLIC_API_BASE_URL,
      prepareHeaders: async (headers, {getState, endpoint}) => {
         try {
            const userInfo = Cookies.get("userInfo");
            if (userInfo) {
               const user = JSON.parse(userInfo);
               if (user?.accessToken && user?.user) {
                  headers.set("authorization", `${user.accessToken}`);
                  headers.set("client_id", `${user.user._id}`);
               }
            }
         } catch (error) {
            console.error("Error parsing user info:", error);
         }
         return headers;
      },
   }),
   endpoints: (builder) => ({}),
   tagTypes: [
      "Products",
      "Coupon",
      "Product",
      "RelatedProducts",
      "UserOrder",
      "UserOrders",
      "ProductType",
      "OfferProducts",
      "PopularProducts",
      "TopRatedProducts",
   ],
});
