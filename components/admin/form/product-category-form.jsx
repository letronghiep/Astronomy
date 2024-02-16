"use client";
import { TextField, TextareaAutosize } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Loading from "~/components/loading";
import { get_product_category } from "~/services/product-category";
import useFilterStore from "~/hooks/useFilterStore";
import PickTags from "~/components/partials/modal/tags";
import useSelectedTag from "~/hooks/useSelectedTag";

function ProductCategoryForm({ loader, onSubmit, title, data }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const useSelectedTags = useSelectedTag();
  const [category, setCategory] = useState({});
  const useFilter = useFilterStore();

  const {
    sort,
    perPage,
    currentPage,
    setSort,
    setPerPage,
    setCurrentPage,
    setTotalPage,
    setTotalRow,
  } = useFilter;

  const { tags, setTags, selectedTags, setSelectedTags } = useSelectedTags;
  useEffect(() => {
    async function getTags() {
      const result = await get_product_category(perPage, sort, currentPage);
      if (result) {
        setTags(result.data.map((item) => item.name));

      }
    }
    getTags();
  }, [perPage, currentPage, sort, tags, setTags]);
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);
  const setValueofFormData = useCallback(() => {
    setValue("name", category?.name ?? "");
    setValue("code", category?.code ?? "");
    setValue("description", category?.description ?? "");
  }, [category, setValue]);
  useEffect(() => {
    if (category) setValueofFormData();
  }, [category, setValueofFormData]);

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
              <TextField
                label="Name"
                name="name"
                type="text"
                {...register("name", { required: "Field is must required" })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.name}
                helperText={errors?.name?.message}
                size="small"
              />
              <TextField
                label="Code"
                name="code"
                type="text"
                {...register("code", { required: "Field is must required" })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.code}
                helperText={errors?.code?.message}
                size="small"
              />
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
              <PickTags />
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

export default ProductCategoryForm;
