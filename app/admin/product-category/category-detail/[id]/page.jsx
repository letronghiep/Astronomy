"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "~/components/admin/MainLayout";
import { get_product_category_by_id } from "~/services/product-category";

function DetailPage({ params }) {
  const [productCategory, setProductCategory] = useState({});
  useEffect(() => {
    async function getProductCategory() {
      let response = await get_product_category_by_id(params.id);
      if (response) setProductCategory(response);
    }
    getProductCategory();
  }, [params.id, productCategory]);
  return (
    <MainLayout>
      <div className="bg_article absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full">
        <div className="w-full lg:w-[800px] md:w-4/5 h-full md:h-[400px] bg-white rounded flex flex-col gap-2 md:flex-row gap-x-2 p-3 overflow-auto justify-start items-center md:justify-start md:items-start relative">
          <div className="md:flex-1">
            <h2 className="font-bold text-center text-2xl">
              {productCategory?.name}
            </h2>
            <div className="p-3">
              <p className="">Code: {productCategory?.code}</p>
              <p className="text-start">
                Description: {productCategory?.description}
              </p>
              <p>Tags: {productCategory?.tags?.join(", ")}</p>
              <div className="flex gap-x-2 justify-between">
                <span>Created at: {productCategory?.createdAt?.toString()}</span>
                <span>Updated at: {productCategory?.updatedAt?.toString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DetailPage;
