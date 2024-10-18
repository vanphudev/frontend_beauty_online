import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import Link from 'next/link';
// internal
import { clearCart } from '@/redux/features/cartSlice';
import CartCheckout from './cart-checkout';
import CartItem from './cart-item';
import RenderCartProgress from '../common/render-cart-progress';
import { useGetCartByUserQuery, useClearCartMutation } from '@/redux/features/cartSlice';
import Loader from "@/components/loader/loader";
const CartArea = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { data: cartData, isError, isLoading } = useGetCartByUserQuery();
   console.log("newCart", cartData);
   // const [clearCart] = useClearCartMutation();

   useEffect(() => {
     const isAuthenticate = Cookies.get("userInfo");
     if (!isAuthenticate) {
       router.push("/login");
     }
   }, [router]);
 
   if (isLoading) {
     return (
       <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
         <Loader loading={isLoading} />
       </div>
     );
   }

   if (isError) {
     return (
       <div className="text-center">
         <h3>Error loading cart. Please try again later.</h3>
         <button onClick={() => router.reload()} className="btn btn-primary">
           Reload
         </button>
       </div>
     );
   }
   const cart_products = cartData?.data?.cart?.items || []; 
  return (
    <>
      <section className="tp-cart-area pb-120">
        <div className="container">
          {cart_products.length === 0 &&
            <div className='text-center pt-50'>
              <h3>No Cart Items Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">Continue Shipping</Link>
            </div>
          }
          {cart_products.length > 0 &&
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="tp-cart-list mb-25 mr-30">
                  <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2" className="tp-cart-header-product">Product</th>
                        <th className="tp-cart-header-price">Price</th>
                        <th className="tp-cart-header-quantity">Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart_products.map((item, i) => (
                        <CartItem key={i} product={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tp-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8">
                      {/* <div className="tp-cart-coupon">
                        <form action="#">
                          <div className="tp-cart-coupon-input-box">
                            <label>Coupon Code:</label>
                            <div className="tp-cart-coupon-input d-flex align-items-center">
                              <input type="text" placeholder="Enter Coupon Code" />
                              <button type="submit">Apply</button>
                            </div>
                          </div>
                        </form>
                      </div> */}
                    </div>
                    <div className="col-xl-6 col-md-4">
                      <div className="tp-cart-update text-md-end mr-30">
                        <button onClick={() => dispatch(clearCart())} type="button" className="tp-cart-update-btn">Clear Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <CartCheckout />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default CartArea;