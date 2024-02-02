"use client";
import React from "react";
import useAdminNav from "~/hooks/useAdminNav";
import TileTable from "./admin/TileTable";
import ArticleCategoryTable from "./admin/ArticleCategoryTable";
import ArticlesTable from "./admin/ArticlesTable";
import UsersTable from "./admin/UsersTable";
import ProductsTable from "./admin/ProductsTable";
import ProductCategoryTable from "./admin/ProductCategoryTable";
import EventTable from "./admin/EventTable";
import MailTemplate from "./admin/MailTemplate";

export default function SuperComponent() {
  const navActive = useAdminNav((state) => state.navActive);
  switch (navActive) {
    case "Base":
      return <TileTable />;
    case "ArticleCategory":
      return <ArticleCategoryTable />;
    case "Articles":
      return <ArticlesTable />;
    case "Events":
      return <EventTable />;
    case "Emails":
      return <MailTemplate />;
    case "Users":
      return <UsersTable />;
    case "ProductCategory":
      return <ProductCategoryTable />;
    case "Products":
      return <ProductsTable />;
    default:
      return <TileTable />;
  }
}
export const dynamic = "force-dynamic";
