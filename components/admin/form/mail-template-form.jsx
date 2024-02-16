"use client";
import { AttachFile, Gif } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "~/components/loading";
import PickCategory from "~/components/partials/modal/category";
import useFilterStore from "~/hooks/useFilterStore";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import { get_all_user } from "~/services/auth";
import dynamic from "next/dynamic";
const ImageUpload = dynamic(() => import("~/components/image-upload"), {
  ssr: false,
});
function MailTemplateForm({
  loader,
  title,
  setImageUrl,
  setHtml,
  data,
  onSubmit,
}) {
  const {
    register,
    setValue,
    formState: { errors },
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const result = await get_all_user(perPage, sort, currentPage);
      if (result) {
        setUsers(result.data)
        setTotalPage(result.totalPage)
        setTotalRow(result.totalRow)
      };
    }
    getUsers();
  }, []);
  const [mail, setMail] = useState(null);
  useEffect(() => {
    if(data) setMail(data);
  }, [data])
  const setValueofFormData = useCallback(() => {
      setValue("user", mail?.user?._id ?? "");
      setValue("name", mail?.name ?? "");
      setValue("slug", mail?.slug ?? "");
      setValue("description", mail?.description ?? "");

  }, [mail, setValue])
  useEffect(() => {
    if (mail) setValueofFormData();
  }, [mail, setValueofFormData]);
  if (loader) return <Loading />;
  return (
    <div className="container mx-auto p-4">
      <form
        className="w-full h-full p-4 shadow-md shadow-neutral-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold font-sans">New Message</h2>
        <div className="py-1.5 border-b">
          <PickCategory title="Choose User" data={users} />
        </div>
        <div className="py-1.5 border-b">
          <input
            placeholder="Name"
            {...register("name", { required: "Field must be required" })}
            className="w-full h-full border-none outline-none text-base"
          />
        </div>
        <div className="py-1.5 border-b mt-1">
          <input
            placeholder="Slug"
            {...register("slug", { required: "Field must be required" })}
            className="w-full h-full border-none outline-none text-base"
          />
        </div>
        <div className="py-1.5 border-b mt-1">
          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full h-full border-none outline-none text-base focus:outline-none"
            rows={6}
          ></textarea>
        </div>
        <div className="max-h-[600px] h-[500px]">
          <ImageUpload
            onChange={(e) => setHtml(e.html)}
            setImageUrl={setImageUrl}
            html={mail?.content}
          />
        </div>
        <div className="flex items-center gap-x-2 mt-6 md:mt-0">
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 w-fit text-white rounded-sm"
          >
            Send
          </button>
          <label htmlFor="file-upload">
            <input type="file" id="file-upload" multiple hidden />
            <AttachFile />
          </label>
        </div>
      </form>
    </div>
  );
}

export default MailTemplateForm;
