"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "~/components/loading";
import { useRouter } from "next/navigation";
import { verifyToken } from "~/lib/verifyToken";
import {
  get_article_category_by_id,
  update_article_category,
} from "~/services/articleCategory";
import Cookies from "js-cookie";
import useAdminNav from "~/hooks/useAdminNav";
import useSWR from "swr";
import MainLayout from "~/components/admin/MainLayout";
import ArticleCategoryForm from "~/components/admin/form/ArticleCategoryForm";

function Page({ params }) {
  const [loader, setLoader] = useState(false);
  const setNavActive = useAdminNav((state) => state.setNavActive);
  const [html, setHtml] = useState("");

  const router = useRouter();
  const [imageUrl, setImageUrl] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    if (!token) {
      router.push("/");
    }
  }, [router]);
  const { data: articleCategory, isLoading: loading } = useSWR(
    "/getArticleCategory",
    () => get_article_category_by_id(params.id)
  );

  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const finalData = {
        _id: params.id,
        name: formData.name,
        description: formData.description,
        image: imageUrl[0]?.webContentLink || articleCategory.image,
      };
      
      const data = await update_article_category(finalData, params.id);
      if (data) {
        toast.success("Successfully!");
        setNavActive("ArticleCategory");
        setTimeout(() => {
          router.push("/admin");
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
      {loader && loading ? (
        <>
          <Loading />
          <p>Loading User...</p>
        </>
      ) : (
        <ArticleCategoryForm
          title="Update Category"
          loader={loader}
          onSubmit={onSubmit}
          setImageUrl={setImageUrl}
          data={articleCategory}
        />
      )}
    </MainLayout>
  );
}

export default Page;
