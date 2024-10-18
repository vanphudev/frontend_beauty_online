import React from 'react';
import SEO from '@/components/seo';
import Header from "@/layout/headers/header";
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';
import ElectronicCategory from '@/components/categories/electronic-category';

const CategoryPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Loại sản phẩm" />
      <Header />
      <ShopBreadcrumb title="Danh mục loại sản phẩm" subtitle="Danh mục loại sản phẩm" />
      <ElectronicCategory/>
      <Footer />
    </Wrapper>
  );
};

export default CategoryPage;