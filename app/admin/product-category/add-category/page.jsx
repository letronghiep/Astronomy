"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  create_product_category,
  get_product_category,
} from "~/services/product-category";
import MainLayout from "../../../../components/admin/MainLayout";
import ProductCategoryForm from "~/components/admin/form/ProductCategoryForm";
import { toast } from "react-toastify";
import useAdminNav from "~/hooks/useAdminNav";
import { useRouter } from "next/navigation";
import useSelectedTag from "~/hooks/useSelectedTag";

function AddProductCategory() {
  const useSelectedTags = useSelectedTag();
  const { tags, setTags, selectedTags, setSelectedTags } = useSelectedTags;
  const [category, setCategory] = useState([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const setNavActive = useAdminNav((state) => state.setNavActive);
  useEffect(() => {
    async function getCategory() {
      const data = await get_product_category();
      if (data) {
        setCategory(data);
      }
    }
    getCategory();
  }, []);
  const onSubmit = async (formData) => {
    const finalData = {
      name: formData.name,
      code: formData.code,
      description: formData.description,
      tags: selectedTags,
      ...formData,
    };
    console.log("====================================");
    console.log(finalData);
    console.log("====================================");
    const res = await create_product_category(finalData);
    if (res) {
      toast.success("Successfully");
      setTimeout(() => {
        router.push("/admin");
        setNavActive("ProductCategory");
      }, 4000);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <MainLayout>
      <ProductCategoryForm
        title="Add Category"
        loader={isPending}
        onSubmit={onSubmit}
      />
    </MainLayout>
  );
}

export default AddProductCategory;
