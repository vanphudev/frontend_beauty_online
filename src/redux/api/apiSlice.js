import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const NEXT_PUBLIC_API_BASE_URL = "http://localhost:5555/api/v1";

const refreshAccessToken = async () => {
   const userInfo = Cookies.get("userInfo");
   if (userInfo) {
      const user = JSON.parse(userInfo);
      const refreshToken = user?.refreshToken;
      if (!refreshToken) {
         return null;
      }
   }
   try {
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user/refreshToken`, {
         method: "POST",
         body: JSON.stringify({ refreshToken: refreshToken }),
      });
      try {
         const result = await response.json();
         Cookies.set(
            "userInfo",
            JSON.stringify({
               refreshToken: result.data.data.data.tokens.refreshToken,
               accessToken: result.data.data.data.tokens.accessToken,
               user: result.data.data.data.user,
            }),
            { expires: 0.5 }
         );
         dispatch(
            userLoggedIn({
               accessToken: result.data.data.data.tokens.accessToken,
               user: result.data.data.data.user,
            })
         );
         return result.data.data.data.tokens;
      } catch (err) {
         // do nothing
      }
   } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
   }
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
   baseUrl: NEXT_PUBLIC_API_BASE_URL,
   prepareHeaders: async (headers, { getState, endpoint }) => {
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
