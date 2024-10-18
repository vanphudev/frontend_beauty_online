import React from "react";
// internal
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import ErrorItem from "../404_items";
import {useGetProductQuery} from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";

const ProductDetailsPage = ({query}) => {
   const {data: product, isLoading, isError} = useGetProductQuery(query.id);
   // decide what to render
   let content = null;
   if (isLoading) {
      content = <PrdDetailsLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = <ErrorItem />;
   }
   if (!isLoading && !isError && product) {
      content = (
         <>
            <ProductDetailsBreadcrumb
               category={product?.data?.product?.categoryId?.name}
               title={product?.data?.product?.name}
            />
            <ProductDetailsArea productItem={product?.data?.product} />
         </>
      );
   }
   return (
      <Wrapper>
         <SEO pageTitle={product?.data?.product?.name} />
         <Header />
         {content}
         <Footer />
      </Wrapper>
   );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
   const {query} = context;

   return {
      props: {
         query,
      },
   };
};
