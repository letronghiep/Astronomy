"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
export default function Home() {
  const route = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = localStorage.getItem("accessToken");
    setUser(getUser);
  }, [user]);
  const logOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);

    route.refresh();
  };
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
