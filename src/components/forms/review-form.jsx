import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
// internal
import ErrorMsg02 from "../common/error-msg02";
import { useAddReviewMutation } from "@/redux/features/reviewApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
   name: Yup.string().required().label("Name"),
   email: Yup.string().required().email().label("Email"),
   review: Yup.string().required().label("Comment"),
});

const ReviewForm = ({ product_id }) => {
   const { user } = useSelector((state) => state.auth);
   const [rating, setRating] = useState(0);
   const [addReview, { }] = useAddReviewMutation();

   // Catch Rating value
   const handleRating = (rate) => {
      setRating(rate);
   };

   // react hook form
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });
   // on submit
   const onSubmit = (data) => {
      if (!user) {
         notifyError("Please login first");
         return;
      } else {
         addReview({
            userId: user?._id,
            productId: product_id,
            rating: rating,
            comment: data.comment,
         }).then((result) => {
            if (result?.error) {
               notifyError(result?.error?.data?.message);
            } else {
               notifySuccess(result?.data?.message);
            }
         });
      }
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='tp-product-details-review-form-rating d-flex align-items-center'>
            <p>Đánh giá: </p>
            <div className='tp-product-details-review-form-rating-icon d-flex align-items-center'>
               <Rating onClick={handleRating} allowFraction size={16} initialValue={rating} />
            </div>
         </div>
         <div className='tp-product-details-review-input-wrapper'>
            <div className='tp-product-details-review-input-box'>
               <div className='tp-product-details-review-input'>
                  <textarea
                     {...register("comment", { required: `Nội dung đánh giá bắt buộc !` })}
                     id='comment'
                     name='comment'
                     placeholder='Ghi nội dung tại đây ....'
                  />
               </div>
               <div className='tp-product-details-review-input-title'>
                  <label htmlFor='msg'>Đánh gía của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.name?.comment} />
            </div>
            <div className='tp-product-details-review-input-box'>
               <div className='tp-product-details-review-input'>
                  <input
                     {...register("name", { required: `Tên của bạn bắt buộc !` })}
                     name='name'
                     id='name'
                     type='text'
                     placeholder='Tên của bạn .....'
                  />
               </div>
               <div className='tp-product-details-review-input-title'>
                  <label htmlFor='name'>Tên của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.name?.name} />
            </div>
            <div className='tp-product-details-review-input-box'>
               <div className='tp-product-details-review-input'>
                  <input
                     {...register("email", { required: `Email của bạn bắt buộc !` })}
                     name='email'
                     id='email'
                     type='email'
                     placeholder='Ex: example@mail.com'
                  />
               </div>
               <div className='tp-product-details-review-input-title'>
                  <label htmlFor='email'>Email của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.name?.email} />
            </div>
         </div>
         <div className='tp-product-details-review-btn-wrapper'>
            <button type='submit' className='tp-product-details-review-btn'>
               Gửi đánh giá
            </button>
         </div>
      </form>
   );
};

export default ReviewForm;
