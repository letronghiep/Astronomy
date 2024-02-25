"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"

import styles from "./event.module.css";

export default function Event() {
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
          <div className = {styles.event}>
            <div className = {styles.filter}></div>
            <div clasName = {styles.timeline}>

            </div>
            
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
