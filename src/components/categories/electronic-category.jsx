import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// internal
import ErrorMsg from "../common/error-msg";
import {useGetProductTypeCategoryQuery} from "@/redux/features/categoryApi";
import HomeCateLoader from "../loader/home/home-cate-loader";

const ElectronicCategory = () => {
   const {data: categories, isLoading, isError} = useGetProductTypeCategoryQuery(true);
   const router = useRouter();

   // handle category route
   const handleCategoryRoute = (title) => {
      router.push(`/shop?category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`);
   };
   // decide what to render
   let content = null;

   if (isLoading) {
      content = <HomeCateLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = <ErrorMsg msg='There was an error' />;
   }
   if (!isLoading && !isError && categories?.data?.categories?.length === 0) {
      content = <ErrorMsg msg='No Category found!' />;
   }
   if (!isLoading && !isError && categories?.data?.categories?.length > 0) {
      const category_items = categories?.data?.categories;
      content = category_items.map((item) => (
         <div className='col' key={item._id}>
            <div className='tp-product-category-item text-center mb-40'>
               <div className='tp-product-category-thumb fix'>
                  <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.url)}>
                     <Image src={item.images[0]} alt='product-category' width={85} height={85} />
                  </a>
               </div>
               <div className='tp-product-category-content'>
                  <h3 className='tp-product-category-title'>
                     <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.url)}>
                        {item.name}
                     </a>
                  </h3>
                  <p>{item.productCount} Product</p>
               </div>
            </div>
         </div>
      ));
   }
   return (
      <section className='tp-product-category pt-15 pb-15'>
         <div className='container'>
            <div className='row row-cols-xl-5 row-cols-lg-5 row-cols-md-4'>{content}</div>
         </div>
      </section>
   );
};

export default ElectronicCategory;
