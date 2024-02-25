"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"

import ProductItem from "./ProductItem";
import ProductPreviewItem from "./ProductPreviewItem";

import styles from './shop.module.css'

export default function Shop() {
  const route = useRouter();
  const { token } = useAuthStore();
  const logOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);

    route.refresh();
  };
  if (token === null) {
    return (
      <main>
        <UserLayout>
          <div className = {styles.shop}>
            <div className = {styles.product_preview}>
              <ProductPreviewItem/>
              {/* <ProductPreviewItem/>
              <ProductPreviewItem/>
              <ProductPreviewItem/> */}
            </div>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
          </div>
        </UserLayout>
      </main>
    );
  }
  return (
    <main>
      <Button className="text-sm" variant="contained" onClick={logOut}>
        Logout
      </Button>
    </main>
  );
}
