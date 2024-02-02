"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import SideBarAdmin from "~/components/admin/sidebar/SideBarAdmin";
import HeaderAdmin from "~/components/header/HeaderAdmin";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div className="w-full h-full flex">
      <SideBarAdmin />
      <div className="mt-12 md:mt-16 relative w-screen h-screen">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
