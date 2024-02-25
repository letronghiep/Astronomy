"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"
import CardGroup from "~/components/user/cardgroup";
import EventCard from "~/components/user/card/event";

import styles from './home.module.css'

export default function Home() {
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
          <div className = {styles.home}>
            <CardGroup layout1>
              <EventCard title = "Card1"/>
              <EventCard title = "Card2"/>
              <EventCard title = "Card3"/>
            </CardGroup>
            <CardGroup title = "Sự kiện sắp tới" layout1>
              <EventCard title = "Card1"/>
              <EventCard title = "Card2"/>
              <EventCard title = "Card3"/>
            </CardGroup>
            <CardGroup title = "Danh mục" layout2>
              <EventCard title = "Card1"/>
              <EventCard title = "Card2"/>
              <EventCard title = "Card3"/>
            </CardGroup>
            <CardGroup title = "Sản phẩm đề xuất" layout3>
              <EventCard title = "Card1"/>
              <EventCard title = "Card2"/>
            </CardGroup>
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
