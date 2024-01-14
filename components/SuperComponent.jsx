"use client";
import React from "react";
import AdminNav from "~/utils/AdminNav";
import TileTable from "./admin/TileTable";
import ArticleCategoryTable from "./admin/ArticleCategoryTable";

export default function SuperComponent() {
  const navActive = AdminNav((state) => state.navActive);
  switch (navActive) {
    case "Base":
      return <TileTable />;
    case "ArticleCategory":
      return <ArticleCategoryTable />;
    default:
      return <TileTable />;
  }
}
export const dynamic = "force-dynamic";
