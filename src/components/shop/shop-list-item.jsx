import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Image from "next/image";
import {Rating} from "react-simple-star-rating";
import Link from "next/link";
// internal
import {Cart,QuickView} from "@/svg";
import {handleProductModal} from "@/redux/features/productModalSlice";
import {add_cart_product} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
const ShopListItem = ({product}) => {
   const {
      _id,
      name,
      images,
      categoryId,
      brandId,
      ratings,
      description,
      price,
      discount,
      options,
      attributes,
      productUrl,
      inventory,
      createdAt,
   } = product || {};
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
      dispatch(add_cart_product(prd));
   };

   return (
      <div className='tp-product-list-item d-md-flex' style={{minWidth: "890px", maxWidth: "890px"}}>
         <div className='tp-product-list-thumb p-relative fix'>
            <Link href={`/product-details/${productUrl}`}>
               <Image src={images[0]} alt='product img' width={350} height={310} />
            </Link>
            {/* <!-- product action --> */}
            <div className='tp-product-action-2 tp-product-action-blackStyle'>
               <div className='tp-product-action-item-2 d-flex flex-column'>
                  <button
                     type='button'
                     className='tp-product-action-btn-2 tp-product-quick-view-btn'
                     onClick={() => dispatch(handleProductModal(product))}>
                     <QuickView />
                     <span className='tp-product-tooltip tp-product-tooltip-right'>Quick View</span>
                  </button>
               </div>
            </div>
         </div>
         <div className='tp-product-list-content' style={{width: "100%"}}>
            <div className='tp-product-content-2 pt-15'>
               <div className='tp-product-tag-2'>
               <Link href={`/product-details/${productUrl}`}>
               #{productUrl}
            </Link>
               </div>
               <h3 className='tp-product-title-2'>
                  <Link href={`/product-details/${productUrl}`}>{name}</Link>
               </h3>
               <div className='tp-product-rating-icon tp-product-rating-icon-2'>
                  <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
               </div>
               <div className='tp-product-price-wrapper-2'>
                  {discount > 0 ? (
                     <>
                        <span className='tp-product-price-2 new-price'>{formatCurrency(price)}</span>
                        <span className='tp-product-price-2 old-price'>
                           {" "}
                           {formatCurrency((Number(price) - (Number(price) * Number(discount)) / 100).toFixed(3))}
                        </span>
                     </>
                  ) : (
                     <span className='tp-product-price-2 new-price'>{formatCurrency(price)}</span>
                  )}
               </div>
               <p>{description?.substring(0, 100)}</p>
               <div className='tp-product-list-add-to-cart'>
                  <button onClick={() => handleAddProduct(product)} className='tp-product-list-add-to-cart-btn'>
                     Add To Cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ShopListItem;
