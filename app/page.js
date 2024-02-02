"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/hooks/useAuthStore";

export default function Home() {
  const route = useRouter();
  const { token } = useAuthStore();
  const logOut = () => {
    // localStorage.removeItem("jwt");
    // setUser(null);

    // route.refresh();
  };
  if (token === null) {
    return (
      <main>
        <UserMainLayout>
          Đây là Layout 
        </UserMainLayout>
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
