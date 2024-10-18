import React from "react";
import ErrorMsg02 from "../common/error-msg02";
import { useSelector } from "react-redux";

const CheckoutBillingArea = ({ register, errors }) => {
   const { user } = useSelector((state) => state.auth);

   return (
      <div className='tp-checkout-bill-area'>
         <h3 className='tp-checkout-bill-title'>Chi tiết thanh toán</h3>
         <div className='tp-checkout-bill-form'>
            <div className='tp-checkout-bill-inner'>
               <div className='row'>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>
                           Tên của bạn <span>*</span>
                        </label>
                        <input
                           {...register("name", {
                              required: `Tên của bạn bắt buộc !`,
                           })}
                           name='name'
                           id='name'
                           type='text'
                           placeholder='Nhập Tên của bạn'
                           defaultValue={user?.fullName}
                        />
                        <ErrorMsg02 msg={errors?.lastName?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>Tên đường</label>
                        <input
                           {...register("address", { required: `Address is required!` })}
                           name='address'
                           id='address'
                           type='text'
                           placeholder='House number and street name'
                        />
                        <ErrorMsg02 msg={errors?.address?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Tỉnh thành</label>
                        <select {...register("province", { required: `Province is required!` })} id='province'>
                           <option value=''>Select Province</option>
                           <option value='province1'>Province 1</option>
                           <option value='province2'>Province 2</option>
                           <option value='province3'>Province 3</option>
                        </select>
                        <ErrorMsg02 msg={errors?.province?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Quận/Huyện</label>
                        <select {...register("district", { required: `District is required!` })} id='district'>
                           <option value=''>Select District</option>
                           <option value='district1'>District 1</option>
                           <option value='district2'>District 2</option>
                           <option value='district3'>District 3</option>
                        </select>
                        <ErrorMsg02 msg={errors?.district?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Phường/Xã/Thị Trấn</label>
                        <select {...register("ward", { required: `Ward is required!` })} id='ward'>
                           <option value=''>Select Ward</option>
                           <option value='ward1'>Ward 1</option>
                           <option value='ward2'>Ward 2</option>
                           <option value='ward3'>Ward 3</option>
                        </select>
                        <ErrorMsg02 msg={errors?.ward?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>
                           Phone <span>*</span>
                        </label>
                        <input
                           {...register("contactNo", {
                              required: `Phone is required!`,
                           })}
                           name='contactNo'
                           id='contactNo'
                           type='text'
                           placeholder='Phone'
                           defaultValue={user?.phone}
                        />
                        <ErrorMsg02 msg={errors?.contactNo?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>
                           Địa chỉ Email <span>*</span>
                        </label>
                        <input
                           {...register("email", { required: `Email is required!` })}
                           name='email'
                           id='email'
                           type='email'
                           placeholder='Email'
                           defaultValue={user?.email}
                        />
                        <ErrorMsg02 msg={errors?.email?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>Ghi chú cho đơn hàng của bạn</label>
                        <textarea
                           {...register("orderNote", { required: false })}
                           name='orderNote'
                           id='orderNote'
                           placeholder='Ghi chú cho đơn hàng của bạn !'
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CheckoutBillingArea;
