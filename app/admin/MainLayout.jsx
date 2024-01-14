import React from "react";
import { ToastContainer } from "react-toastify";
import SideBarAdmin from "~/components/admin/sidebar/SideBarAdmin";
import HeaderAdmin from "~/components/header/HeaderAdmin";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden">
      <SideBarAdmin />
      <div className="w-full h-full ">
        <HeaderAdmin />
        <div className="w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2">
          {children}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
