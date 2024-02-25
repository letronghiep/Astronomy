"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";


import { useAuthStore } from "~/utils/AuthStore";
import UserMainLayout from "~/components/layout/UserMainLayout"

import Article from "~/components/user/article"


export default function Knowledge({params}) {
  const { token } = useAuthStore();
   
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      
    };
    fetchData();
  }, [params.slug]);






  if (token === null) {
    return (
      <main>
        <UserMainLayout>
          <Article />
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
