import React from "react";
import Link from 'next/link';
const CommonBreadcrumb = ({
   title,
   subtitle,
   center = false,
   bg_clr = false,
}) => {
   return (
      <section
         className={`breadcrumb__area ${center ? "text-center" : ""
            } include-bg pt-20 pb-20`}
         style={{ backgroundColor: bg_clr && `#EFF1F5` }}
      >
         <div className="container">
            <div className="row">
               <div className="col-xxl-12">
                  <div className="breadcrumb__content p-relative z-index-1">
                     <h3 className="breadcrumb__title">{title}</h3>
                     <div className="breadcrumb__list">
                        <span>
                           <Link href="/">
                              Home
                           </Link>
                        </span>
                        <span>{subtitle}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CommonBreadcrumb;
