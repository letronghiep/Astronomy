"use client";
import { ChevronLeft } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainLayout from "~/components/admin/MainLayout";
import Comment from "~/components/comment";
import { get_article_by_id } from "~/services/articles";
function DetailPage({ params }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await get_article_by_id(params.id);
      if (result) {
        setArticle(result);
      }
    };
    fetchData();
  }, [params.id]);
  if (!article)
    return (
      <div className="flex w-full h-full justify-center">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </div>
    );
  const htmlContent = { __html: article?.content };
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <Link href="/admin" className="flex items-center">
          {" "}
          <ChevronLeft /> Back to List
        </Link>
        <div className="grid grid-cols-12 gap-x-3 mt-3">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-bold text-3xl md:text-4xl leading-8">
              {article.title}
            </h2>
            <p className="text-xl md:text-2xl italic mt-3">
              {article.description}
            </p>
            <p className="text-sm text-gray-400 font-semibold text-right my-6 md:text-left">
              Published:{" "}
              {new Date(article.createdAt).toLocaleString().split(",")[0]}
            </p>
            <div className="">
              <div className="w-full h-[300px] lg:w-[500px] lg:h-[400px] relative lg:float-left lg:mr-10">
                <Image
                  layout="fill"
                  alt="article"
                  src={article?.image}
                  objectFit="cover"
                />
              </div>
            </div>
              <div dangerouslySetInnerHTML={htmlContent} className="article-content" />
          </div>
          <div className="col-span-12 md:col-span-4 my-8 md:my-0">
            <h2 className="text-3xl font-bold ">Top Comments</h2>
            <div className="mt-6">
              <Comment />
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DetailPage;
