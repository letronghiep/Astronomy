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
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      <SideBarAdmin />
      <div className="w-full h-full ">
        <HeaderAdmin />
        <div className="w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2">
          {articleCategoryLoading ? <Loading /> : <SuperComponent />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminPage;
