"use client";
import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import styles from "./SidebarAdmin.module.css";

import { HiChartPie, HiLogout, HiMenu } from "react-icons/hi";
import { PiArticleMediumLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { getArticleCategory } from "~/lib/actions";
import AdminNav from "~/utils/AdminNav";

function SideBarAdmin() {
  const route = useRouter();
  const toggleSidebar = () => {
    document.querySelector(".sidebar").classList.toggle(styles.collapsed);
    const span = document.querySelector(".sidebar").querySelectorAll("span");
    span.forEach((item) => item.classList.toggle(styles.hidden));
  };

  const logOut = () => {
    route.refresh();
  };
  const setNavActive = AdminNav((state) => state.setNavActive);
  return (
    <Sidebar
      className="sidebar"
      aria-label=""
      style={{ transition: "width, left, right, 0.3s", fontSize: "14px" }}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={toggleSidebar} icon={HiMenu}>
            ASTRONOMY
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin"
            onClick={() => setNavActive("Base")}
            icon={HiChartPie}
            label="Pro"
            labelColor="dark"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={PiArticleMediumLight} label="ArticleCategory">
            <Sidebar.Item onClick={() => setNavActive("ArticleCategory")}>
              All Categories
            </Sidebar.Item>
            <Sidebar.Item href="/admin/article-category/add-category">
              Add Categories
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item onClick={logOut} icon={HiLogout} className="mt-auto">
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBarAdmin;
