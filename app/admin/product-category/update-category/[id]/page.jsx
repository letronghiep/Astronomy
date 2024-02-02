"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import MainLayout from "~/components/admin/MainLayout";
import ProductCategoryForm from "~/components/admin/form/ProductCategoryForm";
import useAdminNav from "~/hooks/useAdminNav";
import useSelectedTag from "~/hooks/useSelectedTag";
import {
  get_product_category_by_id,
  update_product_category,
} from "~/services/product-category";

function UpdateProductCategory({ params }) {
  const [isPending, startTransition] = useTransition();
  const useSelectedTags = useSelectedTag();
  const { tags, setTags, selectedTags, setSelectedTags } = useSelectedTags;
  const router = useRouter();
  const { setNavActive } = useAdminNav();
  const { data: productCategory, isLoading: loading } = useSWR(
    "getProductCategory",
    () => get_product_category_by_id(params.id)
  );
  useEffect(() => {
    startTransition(() => {
      setSelectedTags(productCategory?.tags);
    });
  }, [productCategory, setSelectedTags]);
  const onSubmit = async (formData) => {
    const finalData = {
      name: formData.name,
      code: formData.code,
      description: formData.description,
      tags: selectedTags,
      ...formData,
    };
    const res = await update_product_category(params.id, finalData);
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
        loader={loading || isPending}
        title="Update Category"
        data={productCategory}
        onSubmit={onSubmit}
      />
    </MainLayout>
  );
}

export default UpdateProductCategory;
