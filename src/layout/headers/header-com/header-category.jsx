import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// internal
import {useGetProductTypeCategoryQuery} from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const HeaderCategory = ({isCategoryActive, categoryType = true}) => {
   const {data: categories, isError, isLoading} = useGetProductTypeCategoryQuery(categoryType);
   const router = useRouter();
   const handleCategoryRoute = (title) => {
      router.push(`/shop?category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`);
   };
   let content = null;
   if (isLoading) {
      content = (
         <div className='py-5'>
            <Loader loading={isLoading} />
         </div>
      );
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
         <li className='has-dropdown' key={item._id}>
            <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.url)}>
               {item.images[0] && (
                  <span>
                     <Image src={item.images[0]} alt='cate img' width={50} height={50} />
                  </span>
               )}
               {item.name}
            </a>
         </li>
      ));
   }
   return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;
