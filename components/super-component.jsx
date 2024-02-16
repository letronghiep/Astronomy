"use client";
import React from "react";
import useAdminNav from "~/hooks/useAdminNav";
import TileTable from "./admin/tile-table";
import ArticleCategoryTable from "./admin/article-category-table";
import ArticlesTable from "./admin/article-table";
import UsersTable from "./admin/users-table";
import ProductsTable from "./admin/product-table";
import ProductCategoryTable from "./admin/product-category-table";
import EventTable from "./admin/event-table";
import MailTemplate from "./admin/mail-template-table";

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
