"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "~/lib/verifyToken";
import Cookies from "js-cookie";
import useSWR from "swr";
import useArticleStore from "~/hooks/useArticleStore";
import SideBarAdmin from "~/components/admin/sidebar/SideBarAdmin";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/loading";
import HeaderAdmin from "~/components/header/HeaderAdmin";
import SuperComponent from "~/components/SuperComponent";
import { getArticleCategory, getArticles } from "~/services/articleCategory";
import MainLayout from "../../components/admin/MainLayout";
import { get_refresh_token } from "~/services/auth";

function AdminPage() {
  useEffect(() => {
    async function refreshToken() {
      const token = await get_refresh_token();
      if (token) {
        console.log("====================================");
        console.log(token);
        console.log("====================================");
      }
    }
    refreshToken();
  }, []);

  const setArticleCategory = useArticleStore(
    (state) => state.setArticleCategory
  );
  const setArticleCategoryLoading = useArticleStore(
    (state) => state.setArticleCategoryLoading
  );
  const setArticles = useArticleStore((state) => state.setArticles);
  const setArticleLoading = useArticleStore(
    (state) => state.setArticleCategoryLoading
  );

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("refreshToken") || "";
    // const roles = token && verifyToken(token).roles;
    if (!token) {
      router.push("/");
    }
  }, [Cookies, router]);

  const { data: articleCategories, isLoading: articleCategoryLoading } = useSWR(
    "/getAllArticleCategory",
    getArticleCategory
  );
  const { data: articles, isLoading: articlesLoading } = useSWR(
    "getAllArticles",
    getArticles
  );
  useEffect(() => {
    setArticleCategory(articleCategories);
    setArticleCategoryLoading(articleCategoryLoading);
    setArticles(articles);
    setArticleLoading(articlesLoading);
  }, [
    setArticleCategory,
    articleCategories,
    articleCategoryLoading,
    setArticleCategoryLoading,
    articles,
    setArticles,
    articlesLoading,
    setArticleLoading,
  ]);
  return (
    <MainLayout>
      {articleCategoryLoading && articlesLoading ? (
        <Loading />
      ) : (
        <SuperComponent />
      )}
    </MainLayout>
  );
}

export default AdminPage;
