"use client";
import React, { useState } from "react";
import MainLayout from "../../../../components/admin/MainLayout";
import ProductForm from "~/components/admin/form/product-form";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import { create_product } from "~/services/products";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAdminNav from "~/hooks/useAdminNav";

function AddProduct() {
  const [imageUrl, setImageUrl] = useState([]);
  console.log("====================================");
  console.log(imageUrl);
  console.log("====================================");
  const { selectedCategory } = useSelectedCategory();
  const { setNavActive } = useAdminNav();
  const router = useRouter();
  const onSubmit = async (formData) => {
    const finalData = {
      image: imageUrl[0]?.webContentLink,
      images: imageUrl,
      category: selectedCategory,
      ...formData,
    };
    const data = await create_product(finalData);
    if (data) {
      toast.success("Successfully!");
      setTimeout(() => {
        router.replace("/admin");
        setNavActive("Products");
      }, 2000);
    }
  };
  return (
    <MainLayout>
      <ProductForm
        title="Add Product"
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
      />
    </MainLayout>
  );
}

export default AddProduct;
