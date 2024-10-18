import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import ErrorMsg02 from "../common/error-msg02";
import formatCurrency from "@/lib/funcMoney";

const CheckoutOrderArea = ({ checkoutData }) => {
   const {
      handleShippingCost,
      cartTotal = 0,
      stripe,
      isCheckoutSubmit,
      clientSecret,
      register,
      errors,
      showCard,
      setShowCard,
      shippingCost,
      discountAmount,
   } = checkoutData;
   const { cart_products } = useSelector((state) => state.cart);
   const { total } = useCartInfo();
   return (
      <div className='tp-checkout-place white-bg'>
         <h3 className='tp-checkout-place-title'>Thông tin thanh toán</h3>
         <div className='tp-order-info-list' style={{ marginBottom: '10px' }}>
            <ul>
               {/*  header */}
               <li className='tp-order-info-list-header'>
                  <h4>Sản phẩm</h4>
                  <h4>Thành tiền</h4>
               </li>
               {/*  item list */}
               {cart_products.map((item) => (
                  <li key={item._id} className='tp-order-info-list-desc'>
                     <p>
                        {item.productId.name} <span> x {item.quantity}</span>
                     </p>
                     <span>{formatCurrency(item.productId.price.toFixed(2))}</span>
                  </li>
               ))}

               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng số lượng sản phẩm</span>
                  <span>{cart_products.length} sản phẩm</span>
               </li>
               {/*  subtotal */}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng tiền</span>
                  <span>{formatCurrency(total.toFixed(2))}</span>
               </li>

               {/*  shipping cost */}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng tiền vận chuyển</span>
                  <span>{formatCurrency(shippingCost.toFixed(2))}</span>
               </li>

               {/* discount */}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng tiền giảm giá</span>
                  <span>{formatCurrency(discountAmount.toFixed(2))}</span>
               </li>

               {/* total */}
               <li className='tp-order-info-list-total'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "18px" }}>Tổng hóa đơn thanh toán</span>
                  <span style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}>
                     {formatCurrency(cartTotal)}
                  </span>
               </li>
            </ul>
         </div>
         <h3 className='tp-checkout-place-title'>Phương thức thanh toán</h3>
         <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <div style={{
               display: 'flex',
               alignItems: 'center',
               padding: '10px',
               marginBottom: '10px',
               border: '1px solid #ddd',
               borderRadius: '5px',
               backgroundColor: 'white',
               transition: 'background-color 0.3s ease',
            }}>
               <input
                  {...register('payment', {
                     required: 'Payment Option is required!',
                  })}
                  onClick={() => setShowCard(false)}
                  type='radio'
                  id='cod'
                  name='payment'
                  value='COD'
                  style={{ marginRight: '10px', transform: 'scale(1.3)' }} // Tăng kích thước nút radio
               />
               <label htmlFor='cod' style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
                  Nhận hàng khi thanh toán
               </label>
            </div>
            <ErrorMsg02 msg={errors?.payment?.message} />
         </div>

         <div className='tp-checkout-btn-wrapper'>
            <button type='submit' disabled={!stripe || isCheckoutSubmit} className='tp-checkout-btn w-100'>
               Place Order
            </button>
         </div>
      </div>
   );
};

export default CheckoutOrderArea;
