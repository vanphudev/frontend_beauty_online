import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/error/error.png";

const ErrorItem = () => {
   return (
      <Wrapper>
         {/* 404 area start */}
         <section className='tp-error-area'>
            <div className='container'>
               <div className='row justify-content-center'>
                  <div className='col-xl-6 col-lg-8 col-md-10'>
                     <div className='tp-error-content text-center'>
                        <div className='tp-error-thumb'>
                           <Image src={error} alt='error img' />
                        </div>
                        <h3 className='tp-error-title'>Ôi không! Không tồn tại !</h3>
                        <p>Ồ, thật ngại quá. Có vẻ như trang bạn đang tìm kiếm không được tìm thấy.</p>
                        <Link href='/shop' className='tp-error-btn'>
                           Quay lại trang chủ bạn nhé !
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* 404 area end */}
      </Wrapper>
   );
};

export default ErrorItem;
