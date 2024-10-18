import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import {closeCartMini, remove_product} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
const CartMiniSidebar = () => {
   const {cart_products, cartMiniOpen} = useSelector((state) => state.cart);
   const {total} = useCartInfo();
   const dispatch = useDispatch();
   // handle remove product
   const handleRemovePrd = (prd) => {
      dispatch(remove_product(prd));
   };

   // handle close cart mini
   const handleCloseCartMini = () => {
      dispatch(closeCartMini());
   };
   return (
      <>
         <div className={`cartmini__area tp-all-font-roboto ${cartMiniOpen ? "cartmini-opened" : ""}`}>
            <div className='cartmini__wrapper d-flex justify-content-between flex-column'>
               <div className='cartmini__top-wrapper'>
                  <div className='cartmini__top p-relative'>
                     <div className='cartmini__top-title'>
                        <h4>Giỏ hàng mua sắm</h4>
                     </div>
                     <div className='cartmini__close'>
                        <button
                           onClick={() => dispatch(closeCartMini())}
                           type='button'
                           className='cartmini__close-btn cartmini-close-btn'>
                           <i className='fal fa-times'></i>
                        </button>
                     </div>
                  </div>
                  <div className='cartmini__shipping'>
                     <RenderCartProgress />
                  </div>
                  {cart_products?.length > 0 && (
                     <div className='cartmini__widget'>
                        {cart_products?.map((item) => (
                           <div key={item._id} className='cartmini__widget-item'>
                              <div className='cartmini__thumb'>
                                 <Link href={`/product-details/${item?.productId.productUrl}`}>
                                    <Image src={item?.productId.images[0]} width={70} height={60} alt='product img' />
                                 </Link>
                              </div>
                              <div className='cartmini__content'>
                                 <h5 className='cartmini__title'>
                                    <Link href={`/product-details/${item?.productId.productUrl}`}>
                                       {item?.productId.name}
                                    </Link>
                                 </h5>
                                 <div className='cartmini__price-wrapper'>
                                    {item?.productId.discount > 0 ? (
                                       <span className='cartmini__price'>
                                          {formatCurrency(
                                             (
                                                Number(item?.productId.price) -
                                                (Number(item?.productId.price) * Number(item?.productId.discount)) / 100
                                             ).toFixed(3)
                                          )}
                                       </span>
                                    ) : (
                                       <span className='cartmini__price'>
                                          {formatCurrency(Number(item?.productId.price.toFixed(2)))}
                                       </span>
                                    )}
                                    <span className='cartmini__quantity'> x{item.quantity}</span>
                                 </div>
                              </div>
                              <a
                                 onClick={() => handleRemovePrd({id: item._id})}
                                 className='cartmini__del cursor-pointer'>
                                 <i className='fa-regular fa-xmark'></i>
                              </a>
                           </div>
                        ))}
                     </div>
                  )}
                  {/* if no item in cart */}
                  {cart_products?.length === 0 && (
                     <div className='cartmini__empty text-center'>
                        <Image src={empty_cart_img} alt='empty-cart-img' />
                        <p>Your Cart is empty</p>
                        <Link href='/shop' className='tp-btn'>
                           Go to Shop
                        </Link>
                     </div>
                  )}
               </div>
               <div className='cartmini__checkout'>
                  <div className='cartmini__checkout-title mb-30'>
                     <h4>Tổng tiền:</h4>
                     <span>{formatCurrency(total.toFixed(3))}</span>
                  </div>
                  <div className='cartmini__checkout-btn'>
                     <Link href='/cart' onClick={handleCloseCartMini} className='tp-btn mb-10 w-100'>
                        {" "}
                        View cart
                     </Link>
                     <Link href='/checkout' onClick={handleCloseCartMini} className='tp-btn tp-btn-border w-100'>
                        {" "}
                        Checkout
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         {/* overlay start */}
         <div onClick={handleCloseCartMini} className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}></div>
         {/* overlay end */}
      </>
   );
};

export default CartMiniSidebar;
