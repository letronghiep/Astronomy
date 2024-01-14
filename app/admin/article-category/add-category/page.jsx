"use client";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "~/app/loading";
import { verifyToken } from "~/lib/verifyToken";
import { add_article_category } from "~/services/articleCategory";

function Page() {
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";
    const verify = verifyToken(token);
    const roles = verify?.roles;
    if (!Cookies.get("jwt") || !roles.includes(2000)) {
      router.push("/");
    }
  }, [router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = async (formData) => {
    setLoader(true);
    const finalData = { name: formData.name, slug: formData.slug };
    const data = await add_article_category(finalData);
    if (data) {
      toast.success("Successfully!");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
      setLoader(false);
    } else {
      toast.error("Something went wrong");
      console.log("====================================");
      console.log(errors);
      console.log("====================================");
      setLoader(false);
    }
  };
  return (
    <div className="w-full  p-4 min-h-screen  bg-gray-50 flex flex-col">
      <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
        <ul className="dark:text-black flex">
          <li>
            <Link className="flex" href={"/admin"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Dashboard /
            </Link>
          </li>
          <li className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Add ArticleCategory
          </li>
        </ul>
      </div>
      <div className="w-full h-20 my-2 text-center">
        <h1 className="text-2xl py-2 dark:text-black ">Add Category</h1>
        {loader ? (
          <>
            <Loading />
            <p>Loading</p>
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
              <TextField
                label="Category Slug"
                name="slug"
                type="text"
                {...register("slug", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.slug}
                helperText={errors?.slug?.message}
                size="small"
              />
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

export default Page;
