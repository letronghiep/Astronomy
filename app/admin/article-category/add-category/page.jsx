"use client";
import React, { useEffect, useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "~/components/loading";
import { verifyToken } from "~/lib/verifyToken";
import { add_article_category } from "~/services/articleCategory";
import MainLayout from "../../../../components/admin/MainLayout";
import ImageUpload from "~/components/image-upload";
import { upload_image } from "~/services/CKEditor/image";
import useAdminNav from "~/hooks/useAdminNav";
import { markdownToHtml } from "~/lib/Parser";
import ArticleCategoryForm from "~/components/admin/form/article-category-form";

function Page() {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const setNavActive = useAdminNav((state) => state.setNavActive);
  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);
  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const finalData = {
        name: formData.name,
        image: imageUrl[0].webContentLink,
        description: formData.description,
        ...formData,
      };
      const data = await add_article_category(finalData);
      if (data) {
        toast.success("Successfully!");
        setTimeout(() => {
          router.replace("/admin");
          setNavActive("ArticleCategory");
        }, 2000);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(error.message);
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      setLoader(false);
    }
  };
  return (
    <MainLayout>
      <ArticleCategoryForm
        title="Add Category"
        loader={loader}
        onSubmit={onSubmit}
        setImageUrl={setImageUrl}
      />
    </MainLayout>
  );
}

export default Page;
