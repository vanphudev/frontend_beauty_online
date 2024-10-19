import React, {useEffect, useState} from "react";
import {Rating} from "react-simple-star-rating";
import {useDispatch} from "react-redux";
import Link from "next/link";
// internal
import {AskQuestion, CompareTwo, WishlistTwo} from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import {add_cart_product} from "@/redux/features/cartSlice";
import {add_to_compare} from "@/redux/features/compareSlice";
import {handleModalClose} from "@/redux/features/productModalSlice";
import formatCurrency from "@/lib/funcMoney";

const DetailsWrapper = ({productItem, handleImageActive, activeImg, detailsBottom = false}) => {
   const {
      _id,
      name,
      images,
      categoryId,
      brandId,
      ratings,
      price,
      discount,
      options,
      description,
      attributes,
      productUrl,
      inventory,
      createdAt,
   } = productItem || {};
   const [ratingVal, setRatingVal] = useState(0);
   const [textMore, setTextMore] = useState(false);
   const dispatch = useDispatch();

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
      dispatch(add_cart_product(prd));
   };


   return (
      <div className='tp-product-details-wrapper'>
         <div className='tp-product-details-category'>
            <span>{categoryId?.name}</span>
         </div>
         <h3 className='tp-product-details-title'>{name}</h3>

         {/* inventory details */}
         <div className='tp-product-details-inventory d-flex align-items-center mb-10'>
            <div className='tp-product-details-stock mb-10'>
               <span>Còn {inventory} sản phẩm</span>
            </div>
            <div className='tp-product-details-rating-wrapper d-flex align-items-center mb-10'>
               <div className='tp-product-details-rating'>
                  <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
               </div>
               <div className='tp-product-details-reviews'>
                  <span>({ratings && ratings.length > 0 ? ratings.length : 0} Review)</span>
               </div>
            </div>
         </div>
         <p style={{cursor: "pointer"}}>
            {textMore ? description : `${description?.substring(0, 100)}...  `}
            <span onClick={() => setTextMore(!textMore)}>{textMore ? "Thu gọn" : "Xem thêm"}</span>
         </p>

         {/* price */}
         <div className='tp-product-details-price-wrapper mb-20'>
            {discount > 0 ? (
               <>
                  <span className='tp-product-details-price old-price'>{formatCurrency(price)}</span>
                  <span className='tp-product-details-price new-price'>
                     {" "}
                     {formatCurrency((Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2))}
                  </span>
               </>
            ) : (
               <span className='tp-product-details-price new-price'>{formatCurrency(price.toFixed(2))}</span>
            )}
         </div>

         {/* actions */}
         <div className='tp-product-details-action-wrapper'>
            <h3 className='tp-product-details-action-title'>Quantity</h3>
            <div className='tp-product-details-action-item-wrapper d-sm-flex align-items-center'>
               {/* product quantity */}
               <ProductQuantity />
               {/* product quantity */}
               <div className='tp-product-details-add-to-cart mb-15 w-100'>
                  <button
                     onClick={() => handleAddProduct(productItem)}
                     disabled={inventory == 0}
                     className='tp-product-details-add-to-cart-btn w-100'>
                     Add To Cart
                  </button>
               </div>
            </div>
            <Link href='/cart' onClick={() => dispatch(handleModalClose())}>
               <button className='tp-product-details-buy-now-btn w-100'>Buy Now</button>
            </Link>
         </div>
         {/* product-details-action-sm start */}
         {/* product-details-action-sm end */}
         {detailsBottom && <DetailsBottomInfo category={categoryId?.name} tag={productUrl} />}
      </div>
   );
};

export default DetailsWrapper;
