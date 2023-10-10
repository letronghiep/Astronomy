"use client";
import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Home() {
  const route = useRouter()
  const user = localStorage.getItem("accessToken");
  const logOut = () => {

    localStorage.removeItem("accessToken")

    route.refresh()
  }
  if (user === null) {
    return (
      <main>
        
        <Button className="text-sm" variant="contained" href="/login">
          Login
        </Button>
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
