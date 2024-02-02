"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "~/components/loading";
import ImageUpload from "~/components/ImageUpload";
import Image from "next/image";
import { useForm } from "react-hook-form";
function ArticleCategoryForm({ loader, onSubmit, title, setImageUrl, data }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [catData, setCatData] = useState();
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (data) setCatData(data);
  }, [data]);
  const setValueofFormData = useCallback(() => {
    setValue("name", catData?.name ?? "");
    setValue("description", catData?.description ?? "");
    setValue("image", catData?.image ?? "");
  }, [catData, setValue]);
  useEffect(() => {
    if (catData) setValueofFormData();
  }, [catData, setValueofFormData]);
  return (
    <div className="w-full  px-4 min-h-screen  bg-gray-50 flex flex-col">
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
                label="Category Name"
                name="name"
                type="text"
                {...register("name", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.name}
                helperText={errors?.name?.message}
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
                {catData && (
                  <Image
                    src={catData?.image || "/images/no_image.jpg"}
                    width={200}
                    height={200}
                    alt="Not image found"
                  />
                )}
              </div>
              <button
                className={`bg-blue-600 mt-3 p-3 text-white hover:bg-blue-500`}
              >
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

export default ArticleCategoryForm;
