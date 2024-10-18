import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Rating} from "react-simple-star-rating";
import dayjs from "dayjs";
import { useRouter } from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import Dotdotdot from "react-dotdotdot";
import {Cart, QuickView, Wishlist} from "@/svg";
import Timer from "@/components/common/timer";
import {handleProductModal} from "@/redux/features/productModalSlice";
import {add_cart_product} from "@/redux/features/cartSlice";
import {add_to_wishlist} from "@/redux/features/wishlist-slice";
import formatCurrency from "@/lib/funcMoney";
import {useAddToCartMutation,useGetCartByUserQuery } from "@/redux/features/cartSlice";
import { notifySuccess, notifyError } from "@/utils/toast";
const ProductItem = ({product, offer_style = false}) => {
   const {
      _id,
      name,
      images,
      categoryId,
      brandId,
      ratings,
      price,
      discount,
      attributes,
      productUrl,
      inventory,
      createdAt,
   } = product || {};
   const router = useRouter();
   const { data: cartData, isError, isLoading } = useGetCartByUserQuery();
   const cart_products_load = cartData?.data?.cart?.items || [];
   const [addToCart, {}] = useAddToCartMutation();
   const {cart_products} = useSelector((state) => state.cart);
   const {wishlist} = useSelector((state) => state.wishlist);
   const isAddedToCart = Array.isArray(cart_products) && cart_products.some((prd) => prd?.productId._id === _id);
   const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
   const dispatch = useDispatch();
   const [ratingVal, setRatingVal] = useState(0);

   useEffect(() => {
      if (ratings && ratings.length > 0) {
         const rating = ratings.reduce((acc, review) => acc + review.rating, 0) / ratings.length;
         setRatingVal(rating);
      } else {
         setRatingVal(0);
      }
   }, [ratings]);

   // handle add product
   const handleAddProduct = (prd) => {
      addProductToCart(prd);
   };

   const addProductToCart = (product) => {
      addToCart({
         productId: product._id,
         quantity: 1,
      }).then((data) => {
         console.log("data", data);
         if (data?.error) {
            notifyError(data?.error?.data?.message);
         }
         if (data?.error?.data?.code == 405) {
            notifyError(data?.error?.data?.message);
            router.push("/login");
         }
         if (data?.data?.status == 200) {
            
            // dispatch(add_cart_product(item));
            notifySuccess("Thêm sản phẩm vào giỏ thành công !");
         }
       })
   };

   // handle wishlist product
   const handleWishlistProduct = (prd) => {
      dispatch(add_to_wishlist(prd));
   };

   return (
      <>
         <div className={`${offer_style ? "tp-product-offer-item" : "mb-25"} tp-product-item transition-3`}>
            <div className='tp-product-thumb p-relative fix'>
               <Link href={`/product-details/${productUrl}`}>
                  <Image
                     src={images[0]}
                     width='0'
                     height='0'
                     sizes='100vw'
                     style={{width: "100%", maxHeight: "250px", minHeight: "250px"}}
                     alt='product-electronic'
                  />
                  <div className='tp-product-badge'>
                     {inventory == 0 && <span className='product-hot'>Hết hàng</span>}
                  </div>
               </Link>
               {/*  product action */}
               {inventory > 0 && (
                  <div className='tp-product-action'>
                     <div className='tp-product-action-item d-flex flex-column'>
                        {isAddedToCart ? (
                           <Link
                              href='/cart'
                              className={`tp-product-action-btn ${
                                 isAddedToCart ? "active" : ""
                              } tp-product-add-cart-btn`}>
                              <Cart /> <span className='tp-product-tooltip'>View Cart</span>
                           </Link>
                        ) : (
                           <button
                              onClick={() => handleAddProduct(product)}
                              type='button'
                              className={`tp-product-action-btn ${
                                 isAddedToCart ? "active" : ""
                              } tp-product-add-cart-btn`}
                              disabled={inventory == 0}>
                              <Cart />
                              <span className='tp-product-tooltip'>Add to Cart</span>
                           </button>
                        )}
                        <button
                           onClick={() => dispatch(handleProductModal(product))}
                           type='button'
                           className='tp-product-action-btn tp-product-quick-view-btn'>
                           <QuickView />
                           <span className='tp-product-tooltip'>Quick View</span>
                        </button>
                        <button
                           type='button'
                           className={`tp-product-action-btn ${
                              isAddedToWishlist ? "active" : ""
                           } tp-product-add-to-wishlist-btn`}
                           onClick={() => handleWishlistProduct(product)}
                           disabled={inventory == 0}>
                           <Wishlist />
                           <span className='tp-product-tooltip'>Add To Wishlist</span>
                        </button>
                     </div>
                  </div>
               )}
            </div>
            {/*  product content */}
            <div className='tp-product-content'>
               <div className='tp-product-category'>
                  <Link href={categoryId?.url ? `/${categoryId.url}` : "/shop"}>{categoryId?.name || "Category"}</Link>
               </div>
               <h3 className='tp-product-title'>
                  <Dotdotdot clamp={1}>
                     <Link href={`/product-details/${productUrl}`}>{name}</Link>
                  </Dotdotdot>
               </h3>
               <div className='tp-product-rating d-flex align-items-center'>
                  <div className='tp-product-rating-icon'>
                     <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
                  </div>
                  <div className='tp-product-rating-text'>
                     <span>({ratings && ratings.length > 0 ? ratings.length : 0} Review)</span>
                  </div>
               </div>
               <div className='tp-product-price-wrapper'>
                  {discount > 0 ? (
                     <>
                        <span className='tp-product-price old-price'>{formatCurrency(price)}</span>
                        <span className='tp-product-price new-price'>
                           {" "}
                           {formatCurrency((Number(price) - (Number(price) * Number(discount)) / 100).toFixed(3))}
                        </span>
                     </>
                  ) : (
                     <span className='tp-product-price new-price'>{formatCurrency(parseFloat(price).toFixed(3))}</span>
                  )}
               </div>
               {offer_style && (
                  <div className='tp-product-countdown'>
                     <div className='tp-product-countdown-inner'>
                        {dayjs().isAfter(offerDate?.endDate) ? (
                           <ul>
                              <li>
                                 <span>{0}</span> Day
                              </li>
                              <li>
                                 <span>{0}</span> Hrs
                              </li>
                              <li>
                                 <span>{0}</span> Min
                              </li>
                              <li>
                                 <span>{0}</span> Sec
                              </li>
                           </ul>
                        ) : (
                           <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default ProductItem;
