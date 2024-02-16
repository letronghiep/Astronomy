"use client";
import React, { useEffect, useState } from "react";
import ArticleForm from "~/components/admin/form/article-form";
import MainLayout from "../../../../components/admin/MainLayout";
import { useRouter } from "next/navigation";
import useAdminNav from "~/hooks/useAdminNav";
import { add_article } from "~/services/articles";
import { toast } from "react-toastify";
import useSelectedCategory from "~/hooks/useSelectedCategory";

function AddArticle() {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState([]);
  const { selectedCategory } = useSelectedCategory();
  const setNavActive = useAdminNav((state) => state.setNavActive);
  const [htmlText, setHtmlText] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);
  const onSubmit = async (formData) => {
    try {
      // setLoader(true);
      const finalData = {
        category: selectedCategory,
        content: htmlText,
        ...formData,
      };
      const result = await add_article(finalData);
      if (result) {
        toast.success("Successfully!");
        setTimeout(() => {
          router.replace("/admin");
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
      <ArticleForm
        title="Add Article"
        loader={loader}
        onSubmit={onSubmit}
        setImageUrl={setImageUrl}
        setHtml={setHtmlText}
      />
    </MainLayout>
  );
}

export default AddArticle;
