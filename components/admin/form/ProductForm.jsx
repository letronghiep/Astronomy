"use client";
import { TextField, TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Loading from "~/components/loading";
import ImageUpload from "~/components/ImageUpload";
import PickCategory from "~/components/partials/modal/category";
import useFilterStore from "~/hooks/useFilterStore";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import { get_product_category } from "~/services/product-category";

function ProductForm({
  loader,
  onSubmit,
  title,
  data,
  setImageUrl,
  imageDetails,
}) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const useFilter = useFilterStore();
  const router = useRouter();
  const {
    sort,
    perPage,
    currentPage,
    setSort,
    setCurrentPage,
    setTotalPage,
    setTotalRow,
  } = useFilter;
  const useSelectCategory = useSelectedCategory();
  const { category, setCategory, selectedCategory, setSelectedCategory } =
    useSelectCategory;
  const [productInfo, setProductInfo] = useState();
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (data) setProductInfo(data);
  }, [data]);
  async function fetchProductCategory() {
    const result = await get_product_category(perPage, sort, currentPage);
    if (result) {
      setCategory(result?.data);
      setTotalPage(result?.totalPages);
      setTotalRow(result?.totalRow);
    }
  }
  useEffect(() => {
    fetchProductCategory();
  }, [perPage, currentPage, sort, productInfo]);

  const setValueofFormData = useCallback(() => {
    setValue("category", productInfo?.category?._id ?? "");
    setValue("name", productInfo?.name ?? "");
    setValue("description", productInfo?.description ?? "");
    setValue("price", productInfo?.price ?? "");
    setValue("stockQuantity", productInfo?.stockQuantity ?? "");
  }, [productInfo, setValue]);
  useEffect(() => {
    if (productInfo) setValueofFormData();
  }, [productInfo, setValueofFormData]);
  return (
    <div className="w-full px-4 min-h-screen  bg-gray-50 flex flex-col">
      <div className="w-full h-20 my-2 text-center">
        <h1 className="text-2xl py-2 dark:text-black ">{title}</h1>
        {loader ? (
          <>
            <Loading />
            <p>Loading...</p>
          </>
        ) : (
          <div className="w-full h-full flex items-start justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg  py-2 flex flex-col gap-3"
            >
              <PickCategory data={category} />
              <TextField
                label="Name"
                name="name"
                type="text"
                {...register("name", { required: "Field must be required" })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.name}
                helperText={errors?.name?.message}
                size="small"
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                {...register("price", { required: "Field must be required" })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.price}
                helperText={errors?.price?.message}
                size="small"
              />
              <TextField
                label="Stock quantity"
                name="stockQuantity"
                type="number"
                {...register("stockQuantity", {
                  required: "Field must be required",
                })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.stockQuantity}
                helperText={errors?.stockQuantity?.message}
                size="small"
              />
              <div className="">
                <ImageUpload
                  onChange={(e) => setHtml(e.html)}
                  setImageUrl={setImageUrl}
                />
              </div>
              <TextareaAutosize
                placeholder="Description"
                name="description"
                {...register("description")}
                variant="outlined"
                error={!!errors.description}
                helperText={errors?.description?.message}
                minRows={6}
                size="small"
              />
              <div className="flex items-center gap-x-2 flex-wrap">
                {productInfo &&
                  imageDetails.length > 0 &&
                  imageDetails.map((item, index) => (
                    <Image
                      key={index}
                      src={item.webContentLink || "/images/no_image.jpg"}
                      width={140}
                      height={140}
                      alt="Not image found"
                    />
                  ))}
              </div>
              <button className="bg-blue-600 mt-3 p-3 text-white hover:bg-blue-500">
                Done !
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductForm;
