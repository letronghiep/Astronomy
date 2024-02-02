"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/hooks/useAuthStore";

export default function Home() {
  const route = useRouter();
  const { token } = useAuthStore();
  useEffect(() => {
    route.push("/admin");
  }, []);
  return <main></main>;
}
