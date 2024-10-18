import React from "react";
import Link from 'next/link';
const ContactBreadcrumb = () => {
   return (
      <section className='breadcrumb__area include-bg text-center pt-50 pb-50'>
         <div className='container'>
            <div className='row'>
               <div className='col-xxl-12'>
                  <div className='breadcrumb__content p-relative z-index-1'>
                     <h3 className='breadcrumb__title'>Giữ liên lạc với chúng tôi</h3>
                     <div className='breadcrumb__list'>
                        <span>
                        <Link href="/">
                              Home
                           </Link>
                        </span>
                        <span>Contact</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ContactBreadcrumb;
