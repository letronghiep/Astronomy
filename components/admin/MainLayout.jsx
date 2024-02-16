"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import SideBarAdmin from "~/components/admin/sidebar/sidebar-admin";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div className="container mx-auto flex">
      <SideBarAdmin />
      <div className="mt-12 md:mt-16 relative w-screen h-screen">
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
