"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import MainLayout from "~/components/admin/MainLayout";
import ArticleForm from "~/components/admin/form/ArticleForm";
import { get_article_by_id, update_article } from "~/services/articles";
import useAdminNav from "~/hooks/useAdminNav";
import "react-toastify/dist/ReactToastify.css";
import Loading from "~/components/loading";
import useSelectedCategory from "~/hooks/useSelectedCategory";

function UpdatePage({ params }) {
  const useSelectCategory = useSelectedCategory();

  const { selectedCategory, setSelectedCategory } = useSelectCategory;
  const [loader, setLoader] = useState(false);

  const setNavActive = useAdminNav((state) => state.setNavActive);
  const [html, setHtml] = useState("");
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const { data: articleData, isLoading: loading } = useSWR("getArticle", () =>
    get_article_by_id(params.id)
  );
  useEffect(() => {
    if (articleData) {
      setSelectedCategory(articleData?.category);
    }
  }, [articleData, setSelectedCategory]);
  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const finalData = {
        _id: params.id,
        title: formData.title,
        description: formData.description,
        content: html,
        image: imageUrl[0] || articleData.image,
        category: selectedCategory,
      };
      const data = await update_article(params.id, finalData);
      if (data) {
        toast.success("Successfully!");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Articles");
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
        <ArticleForm
          onSubmit={onSubmit}
          title="Update Article"
          data={articleData}
          loader={loader}
          setImageUrl={setImageUrl}
          setHtml={setHtml}
        />
      )}
    </MainLayout>
  );
}

export default UpdatePage;
