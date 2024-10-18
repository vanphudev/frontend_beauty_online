import React from "react";
import Image from "next/image";
import {useDispatch} from "react-redux";
import Link from "next/link";
// internal
import {Close, Minus, Plus} from "@/svg";
import {add_cart_product, quantityDecrement, remove_product} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
const CartItem = ({product}) => {
   const {_id, productId, quantity} = product || {};

   const dispatch = useDispatch();

   // handle add product
   const handleAddProduct = (prd) => {
      dispatch(add_cart_product(prd));
   };
   // handle decrement product
   const handleDecrement = (prd) => {
      dispatch(quantityDecrement(prd));
   };

   // handle remove product
   const handleRemovePrd = (prd) => {
      dispatch(remove_product(prd));
   };

   return (
      <tr>
         {/* img */}
         <td className='tp-cart-img'>
            <Link href={`/product-details/${productId.productUrl}`}>
               <Image src={productId.images[0]} alt='product img' width={70} height={100} />
            </Link>
         </td>
         {/* title */}
         <td className='tp-cart-title'>
            <Link href={`/product-details/${productId.productUrl}`}>{productId.name}</Link>
         </td>
         {/* price */}
         <td className='tp-cart-price'>
            <span>{formatCurrency((productId.price * quantity).toFixed(3))}</span>
         </td>
         {/* quantity */}
         <td className='tp-cart-quantity'>
            <div className='tp-product-quantity mt-10 mb-10'>
               <span onClick={() => handleDecrement(productId)} className='tp-cart-minus'>
                  <Minus />
               </span>
               <input className='tp-cart-input' type='text' value={quantity} readOnly />
               <span onClick={() => handleAddProduct(productId)} className='tp-cart-plus'>
                  <Plus />
               </span>
            </div>
         </td>
         {/* action */}
         <td className='tp-cart-action'>
            <button onClick={() => handleRemovePrd(productId)} className='tp-cart-action-btn'>
               <Close />
               <span> Remove</span>
            </button>
         </td>
      </tr>
   );
};

export default CartItem;
