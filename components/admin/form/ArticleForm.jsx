"use client";
import { TextField, TextareaAutosize } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/components/loading";
import ImageUpload from "~/components/ImageUpload";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { search_article_category } from "~/services/articleCategory";
import PickCategory from "~/components/partials/modal/category";
import useFilterStore from "~/hooks/useFilterStore";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import ReactQuillComponent from "~/components/ReactQuill";
import { CloudUploadOutlined, Upload } from "@mui/icons-material";
import { upload_image } from "~/services/CKEditor/image";
import { Progress } from "flowbite-react";

function ArticleForm({ loader, onSubmit, title, setImageUrl, data, setHtml }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const useFilter = useFilterStore();
  const {
    sort,
    perPage,
    currentPage,
    totalPage,
    totalRow,
    setSort,
    setPerPage,
    setCurrentPage,
    setTotalPage,
    setTotalRow,
  } = useFilter;
  const { selectedCategory, category, setCategory } = useSelectedCategory();
  const [article, setArticle] = useState();
  const refInput = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const open = () => {
    refInput.current.click();
  };
  useEffect(() => {
    if (data) {
      setArticle(data);
    }
  }, [data]);
  const fetchCategory = async () => {
    const result = await search_article_category(perPage, sort, currentPage);
    if (result) {
      setCategory(result.data);
      // setPerPage(result.perPage);
      // setCurrentPage(result.currentPage);
      setTotalPage(result.totalPages);
      setTotalRow(result.totalRow);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [category]);
  const setValueofFormData = useCallback(() => {
    setValue("category", article?.category?._id ?? "");
    setValue("title", article?.title ?? "");
    setValue("description", article?.description ?? "");
    setValue("image", article?.image ?? "");
  }, [article, setValue]);
  useEffect(() => {
    if (article) setValueofFormData();
  }, [article, setValueofFormData]);
  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const files = e.target.files;
    const url = await upload_image(files, setProgress);
    if (url) {
      url.forEach((item) => {
        setImage((prev) => [...prev, item]);
        setValue("image", item?.webContentLink);
      });

      toast.success("Uploaded!!!");
    }
    setProgress(0);
    setIsLoading(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="w-full h-20 my-2 text-center">
        {loader ? (
          <>
            <Loading />
            <p>Loading...</p>
          </>
        ) : (
          <div className="w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="flex flex-col lg:flex-row lg:justify-between p-5 rounded-lg shadow-md shadow-neutral-500 bg-white">
                <h1 className="text-2xl py-2 font-semibold text-start">
                  {title}
                </h1>
                <input
                  type="submit"
                  value={title}
                  className="w-fit bg-blue-600 text-white rounded-md px-5 py-2 font-semibold hover:opacity-90 cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-12 gap-4 my-8">
                <div className="col-span-12 md:col-span-8 p-4 rounded-lg shadow-lg shadow-neutral-500 ">
                  <h4 className="text-start font-semibold mb-6">
                    (*) Basic Information
                  </h4>
                  <TextField
                    className="my-6"
                    label="Title"
                    name="title"
                    type="text"
                    {...register("title", { required: true })}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    error={!!errors.title}
                    helperText={errors?.title?.message}
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
                    className="w-full border-gray-400 my-6"
                    sx={{ width: "100%" }}
                    size="small"
                  />
                  <div className="">
                    <ImageUpload
                      onChange={(e) => setHtml(e.html)}
                      setImageUrl={setImageUrl}
                      text={article?.content}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4  px-4 pt-4 pb-10 rounded-lg shadow-lg shadow-neutral-500 h-fit">
                  <h4 className="text-start font-semibold mb-6">
                    (*) Category
                  </h4>
                  <PickCategory data={category} />
                </div>
              </div>
              <div className="grid grid-cols-12 my-6">
                <div className="md:col-span-8 col-span-12 p-6 rounded-lg shadow-lg shadow-neutral-500">
                  <h4 className="text-start font-semibold mb-6">
                    Image Upload
                  </h4>
                  <div
                    className="border-dotted h-[300px] w-full relative border-blue-500 border-2 flex justify-center items-center"
                    onClick={open}
                  >
                    <input
                      name="image"
                      id="image"
                      accept="image/*"
                      {...register("image")}
                      className="hidden"
                      ref={refInput}
                      type="file"
                      onChange={handleUploadImage}
                    />
                    <div
                      className={`flex gap-x-2 items-center justify-center m-auto `}
                    >
                      <CloudUploadOutlined />
                      <p className="text-blue-300 md:text-md text-center text-sm hover:underline cursor-pointer">
                        Browse
                      </p>
                    </div>
                    {image.length > 0 &&
                      image.map((item) => (
                        <Image
                          key={item?._id}
                          src={item?.webContentLink}
                          alt="image"
                          layout="fill"
                          objectFit="cover"
                        />
                      ))}
                  </div>
                  {isLoading && (
                    <Progress progress={progress} size="md" color="dark" />
                  )}
                </div>
              </div>
              {/* <div className="flex items-center gap-x-2 flex-wrap">
                {article && (
                  <Image
                    src={article?.image || "/images/no_image.jpg"}
                    width={200}
                    height={200}
                    alt="Not image found"
                  />
                )}
              </div> */}
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ArticleForm;
