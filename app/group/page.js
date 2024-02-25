"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "~/utils/AuthStore";
import UserLayout from "~/components/layout/UserLayout"
import Search from './Search';
import GroupItem from './GroupItem';

import Post from './Post';


import styles from './group.module.css'

export default function Group() {
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
          <div className={styles.group}>
            <div className = {styles.group_list}>
                <Search/>
                <div className = {styles.list}>
                  <GroupItem/>
                  <GroupItem/>
                  <GroupItem/>
                  <GroupItem/>
                  <GroupItem/>
                </div>
                <div className = {styles.paginate}></div>
            </div>
            <div className = {styles.post_list}>
              <Post/>
              <Post/>
              <Post/>
              <Post/>
              <Post/>
              <Post/>
              <Post/>
              <Post/>
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
