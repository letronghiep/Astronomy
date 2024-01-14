"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "~/lib/verifyToken";
import Cookies from "js-cookie";
import useSWR from "swr";
import useArticleStore from "~/utils/ArticleStore";
import SideBarAdmin from "~/components/admin/sidebar/SideBarAdmin";
import { ToastContainer } from "react-toastify";
import Loading from "../loading";
import HeaderAdmin from "~/components/header/HeaderAdmin";
import SuperComponent from "~/components/SuperComponent";
import { getArticleCategory } from "~/services/articleCategory";
import MainLayout from "./MainLayout";

function AdminPage() {
  const setArticleCategory = useArticleStore(
    (state) => state.setArticleCategory
  );
  const setArticleCategoryLoading = useArticleStore(
    (state) => state.setArticleCategoryLoading
  );

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";
    const roles = token && verifyToken(token).roles;
    if (!Cookies.get("jwt") || !roles.includes(2000)) {
      router.push("/");
    }
  }, [Cookies, router]);

  const { data: articleCategories, isLoading: articleCategoryLoading } = useSWR(
    "/getAllArticleCategory",
    getArticleCategory
  );

  useEffect(() => {
    setArticleCategory(articleCategories);
    setArticleCategoryLoading(articleCategoryLoading);
  }, [
    setArticleCategory,
    articleCategories,
    articleCategoryLoading,
    setArticleCategoryLoading,
  ]);
  return (
    <MainLayout>
      {articleCategoryLoading ? <Loading /> : <SuperComponent />}
    </MainLayout>
  );
}

export default AdminPage;
