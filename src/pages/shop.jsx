import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";

const ShopPage = ({ query }) => {
   const { data: products, isError, isLoading } = useGetAllProductsQuery();
   const [priceValue, setPriceValue] = useState([0, 0]);
   const [selectValue, setSelectValue] = useState("");
   const [currPage, setCurrPage] = useState(1);

   // Load the maximum price once the products have been loaded
   useEffect(() => {
      if (!isLoading && !isError && products?.data?.products?.length > 0) {
         const maxPrice = products?.data?.products.reduce((max, product) => {
            return product.price > max ? product.price : max;
         }, 0);
         setPriceValue([0, maxPrice]);
      }
   }, [isLoading, isError, products]);

   // handleChanges
   const handleChanges = (val) => {
      setCurrPage(1);
      setPriceValue(val);
   };

   // selectHandleFilter
   const selectHandleFilter = (e) => {
      setSelectValue(e.value);
   };

   // other props
   const otherProps = {
      priceFilterValues: {
         priceValue,
         handleChanges,
      },
      selectHandleFilter,
      currPage,
      setCurrPage,
   };
   // decide what to render
   let content = null;

   if (isLoading) {
      content = <ShopLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = (
         <div className='pb-80 text-center'>
            <ErrorMsg msg='There was an error' />
         </div>
      );
   }
   if (!isLoading && !isError && products?.data?.products?.length === 0) {
      content = <ErrorMsg msg='No Products found!' />;
   }
   if (!isLoading && !isError && products?.data?.products?.length > 0) {
      // products
      let product_items = products?.data?.products;
      // select short filtering
      if (selectValue) {
         if (selectValue === "Default Sorting") {
            product_items = products?.data?.products;
         } else if (selectValue === "Low to High") {
            product_items = products?.data?.products.slice().sort((a, b) => Number(a.price) - Number(b.price));
         } else if (selectValue === "High to Low") {
            product_items = products?.data?.products.slice().sort((a, b) => Number(b.price) - Number(a.price));
         } else if (selectValue === "New Added") {
            product_items = products?.data?.products
               .slice()
               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         } else if (selectValue === "On Sale") {
            product_items = products?.data?.products.filter((p) => p.discount > 0);
         } else {
            product_items = products?.data?.products;
         }
      }
      // price filter
      product_items = product_items.filter((p) => p.price >= priceValue[0] && p.price <= priceValue[1]);

      // status filter
      if (query.status) {
         if (query.status === "on-sale") {
            product_items = product_items.filter((p) => p.discount > 0);
         } else if (query.status === "in-stock") {
            product_items = product_items.filter((p) => p.inventory > 0);
         }
      }

      // category filter
      if (query.category) {
         product_items = product_items.filter(
            (p) => p.categoryId?.url?.toLowerCase().replace("&", "").split(" ").join("-") === query.category
         );
      }

      // brand filter
      if (query.brand) {
         product_items = product_items.filter(
            (p) => p.brandId?.url?.toLowerCase().replace("&", "").split(" ").join("-") === query.brand
         );
      }
      content = (
         <>
            <ShopArea all_products={products?.data?.products} products={product_items} otherProps={otherProps} />
            <ShopFilterOffCanvas all_products={products?.data?.products} otherProps={otherProps} />
         </>
      );
   }
   return (
      <Wrapper>
         <SEO pageTitle='Sản phẩm' />
         <Header />
         <ShopBreadcrumb title='Danh sách sản phẩm' subtitle='Danh sách sản phẩm' />
         {content ? content : ""}
         <Footer primary_style={true} />
      </Wrapper>
   );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
   const { query } = context;

   return {
      props: {
         query,
      },
   };
};
