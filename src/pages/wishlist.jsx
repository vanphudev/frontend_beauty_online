import React from "react";
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import WishlistArea from "@/components/cart-wishlist/wishlist-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";

const WishlistPage = () => {
   return (
      <Wrapper>
         <SEO pageTitle='Sản phẩm yêu thích' />
         <Header/>
         <CommonBreadcrumb title='Danh sách sản phẩm yêu thích' subtitle='Sản phẩm yêu thích' />
         <WishlistArea />
         <Footer primary_style={true} />
      </Wrapper>
   );
};

export default WishlistPage;
