// import {createSlice} from "@reduxjs/toolkit";
// import {getLocalStorage, setLocalStorage} from "@/utils/localstorage";
// import {notifyError, notifySuccess} from "@/utils/toast";
// import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
// import {apiSlice} from "../api/apiSlice";

// // Initial state for the cart
// const initialState = {
//    cart_products: [],
//    orderQuantity: 1,
//    cartMiniOpen: false,
// };

// // Creating a slice for cart state management
// export const cartSlice = createSlice({
//    name: "cart",
//    initialState,
//    reducers: {
//       add_cart_product: (state, {payload}) => {
//          const isExist = state.cart_products.some((item) => item._id === payload._id);
//          if (!isExist) {
//             const newItem = {
//                ...payload,
//                orderQuantity: state.orderQuantity,
//             };
//             state.cart_products.push(newItem);
//          } else {
//             state.cart_products = state.cart_products.map((item) => {
//                if (item._id === payload._id) {
//                   if (item.quantity >= item.orderQuantity + state.orderQuantity) {
//                      item.orderQuantity += state.orderQuantity;
//                   } else {
// // nothing
//                   }
//                }
//                return item;
//             });
//          }
//          setLocalStorage("cart_products", state.cart_products);
//       },
//       increment: (state) => {
//          state.orderQuantity += 1;
//       },
//       decrement: (state) => {
//          state.orderQuantity = Math.max(1, state.orderQuantity - 1);
//       },
//       quantityDecrement: (state, {payload}) => {
//          state.cart_products = state.cart_products.map((item) => {
//             if (item._id === payload._id && item.orderQuantity > 1) {
//                item.orderQuantity -= 1;
//             }
//             return item;
//          });
//          setLocalStorage("cart_products", state.cart_products);
//       },
//       remove_product: (state, {payload}) => {
//          state.cart_products = state.cart_products.filter((item) => item._id !== payload.id);
//          setLocalStorage("cart_products", state.cart_products);
//          notifyError(`${payload.title} removed from cart`);
//       },
//       get_cart_products: (state) => {
//          state.cart_products = getLocalStorage("cart_products");
//       },
//       initialOrderQuantity: (state) => {
//          state.orderQuantity = 1;
//       },
//       clearCart: (state) => {
//          const isClearCart = window.confirm("Are you sure you want to remove all items?");
//          if (isClearCart) {
//             state.cart_products = [];
//             setLocalStorage("cart_products", state.cart_products);
//          }
//       },
//       openCartMini: (state) => {
//          state.cartMiniOpen = true;
//       },
//       closeCartMini: (state) => {
//          state.cartMiniOpen = false;
//       },
//    },
// });

// // Exporting actions
// export const {
//    add_cart_product,
//    increment,
//    decrement,
//    get_cart_products,
//    remove_product,
//    quantityDecrement,
//    initialOrderQuantity,
//    clearCart,
//    closeCartMini,
//    openCartMini,
// } = cartSlice.actions;

// // Exporting reducer
// export default cartSlice.reducer;

// export const cartApi = apiSlice.injectEndpoints({
//    overrideExisting: true,
//    endpoints: (builder) => ({
//       getCartByUser: builder.query({
//          query: () => ({
//             url: "http://localhost:5555/api/v1/carts/getcart/byuser",
//             method: "GET",
//          }),
//       }),
//       addToCart: builder.mutation({
//          query: ({productId, quantity}) => ({
//             url: "http://localhost:5555/api/v1/carts/additem",
//             method: "POST",
//             body: {productId, quantity},
//          }),
//          async onQueryStarted(arg, {queryFulfilled, dispatch}) {
//             try {
//                const result = await queryFulfilled;
//                Cookies.set(
//                   "userInfo",
//                   JSON.stringify({
//                      accessToken: result.data.data.token,
//                      user: result.data.data.user,
//                   }),
//                   {expires: 0.5}
//                );
//                dispatch(
//                   userLoggedIn({
//                      accessToken: result.data.data.token,
//                      user: result.data.data.user,
//                   })
//                );
//             } catch (err) {
//                // do nothing
//             }
//          },
//       }),
//       updateCartItem: builder.mutation({
//          query: ({clientId, productId, quantity}) => ({
//             url: "update",
//             method: "PUT",
//             body: {clientId, productId, quantity},
//          }),
//       }),
//       removeFromCart: builder.mutation({
//          query: ({clientId, productId}) => ({
//             url: "remove",
//             method: "DELETE",
//             body: {clientId, productId},
//          }),
//       }),
//       clearCart: builder.mutation({
//          query: (clientId) => ({
//             url: "clear",
//             method: "DELETE",
//             body: {clientId},
//          }),
//       }),
//    }),
// });

// export const {
//    useGetCartByUserQuery,
//    useAddToCartMutation,
//    useUpdateCartItemMutation,
//    useRemoveFromCartMutation,
//    useClearCartMutation,
// } = cartApi;

// export const cartReducer = cartApi.reducer;

import {createSlice} from "@reduxjs/toolkit";
import {notifyError} from "@/utils/toast";
import {apiSlice} from "../api/apiSlice";

// Initial state for the cart
const initialState = {
   cart_products: [],
   orderQuantity: 1,
   cartMiniOpen: false,
};

// Creating a slice for cart state management
export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      add_cart_product: (state, {payload}) => {
         const isExist = state.cart_products.some((item) => item._id === payload._id);
         if (!isExist) {
            const newItem = {
               ...payload,
               orderQuantity: state.orderQuantity,
            };
            state.cart_products.push(newItem);
         } else {
            state.cart_products = state.cart_products.map((item) => {
               if (item._id === payload._id) {
                  if (item.quantity >= item.orderQuantity + state.orderQuantity) {
                     item.orderQuantity += state.orderQuantity;
                  }
               }
               return item;
            });
         }
      },
      increment: (state) => {
         state.orderQuantity += 1;
      },
      decrement: (state) => {
         state.orderQuantity = Math.max(1, state.orderQuantity - 1);
      },
      quantityDecrement: (state, {payload}) => {
         state.cart_products = state.cart_products.map((item) => {
            if (item._id === payload._id && item.orderQuantity > 1) {
               item.orderQuantity -= 1;
            }
            return item;
         });
      },
      remove_product: (state, {payload}) => {
         state.cart_products = state.cart_products.filter((item) => item._id !== payload.id);
         notifyError(`${payload.title} removed from cart`);
      },
      get_cart_products: (state, {payload}) => {
         state.cart_products = payload;
      },
      initialOrderQuantity: (state) => {
         state.orderQuantity = 1;
      },
      clearCart: (state) => {
         const isClearCart = window.confirm("Are you sure you want to remove all items?");
         if (isClearCart) {
            state.cart_products = [];
         }
      },
      openCartMini: (state) => {
         state.cartMiniOpen = true;
      },
      closeCartMini: (state) => {
         state.cartMiniOpen = false;
      },
   },
});

// Exporting actions
export const {
   add_cart_product,
   increment,
   decrement,
   get_cart_products,
   remove_product,
   quantityDecrement,
   initialOrderQuantity,
   clearCart,
   closeCartMini,
   openCartMini,
} = cartSlice.actions;

// Exporting reducer
export default cartSlice.reducer;

export const cartApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getCartByUser: builder.query({
         query: () => ({
            url: "http://localhost:5555/api/v1/carts/getcart/byuser",
            method: "GET",
         }),
      }),
      addToCart: builder.mutation({
         query: ({productId, quantity}) => ({
            url: "http://localhost:5555/api/v1/carts/additem",
            method: "POST",
            body: {productId, quantity},
         }),
      }),
      updateCartItem: builder.mutation({
         query: ({clientId, productId, quantity}) => ({
            url: "update",
            method: "PUT",
            body: {clientId, productId, quantity},
         }),
      }),
      removeFromCart: builder.mutation({
         query: ({clientId, productId}) => ({
            url: "remove",
            method: "DELETE",
            body: {clientId, productId},
         }),
      }),
      clearCart: builder.mutation({
         query: (clientId) => ({
            url: "clear",
            method: "DELETE",
            body: {clientId},
         }),
      }),
   }),
});

export const {
   useGetCartByUserQuery,
   useAddToCartMutation,
   useUpdateCartItemMutation,
   useRemoveFromCartMutation,
   useClearCartMutation,
} = cartApi;

export const cartReducer = cartApi.reducer;
