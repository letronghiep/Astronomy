"use client";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import MainLayout from "~/components/admin/MainLayout";
import Loading from "~/components/loading";
import { get_user_by_id } from "~/services/auth";
import { deepPurple } from "@mui/material/colors";
import { Avatar, Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  AdminPanelSettings,
  Block,
  Email,
  Lock,
  PhoneCallback,
  TimeToLeave,
  Timelapse,
} from "@mui/icons-material";
import CartItem from "~/components/cart-item";
function UserDetailPage({ params }) {
  const [userDetail, setUserDetail] = useState();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function getUserById() {
      const data = await get_user_by_id(params.id);
      data &&
        startTransition(() => {
          setUserDetail(data);
        });
    }
    getUserById();
  }, [params.id]);
  return (
    <MainLayout>
      {isPending ? (
        <Loading />
      ) : (
        <div className="relative w-full flex flex-col h-full max-w-[1100px] transition-transform duration-300 ease-linear mx-auto">
          <div className="h-[250px] bg_article w-full opacity-80" />
          <div className="relative h-full ">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <Avatar
                className="absolute -top-[80px] left-1/2 -translate-x-1/2 md:left-[160px] md:-top-[60px] flex"
                sx={{
                  bgcolor: deepPurple[500],
                  width: 160,
                  height: 160,
                  fontSize: 80,
                }}
              >
                {userDetail?.firstname.substring(0, 1)}
              </Avatar>
              <div className="mt-[90px] md:mt-[0px] md:ml-[260px] text-xl md:text-3xl font-semibold text-center">
                {userDetail?.firstname} {userDetail?.lastname}
              </div>
              <Link
                href={`/admin/users/update-user/${params.id}`}
                className="px-3 py-1.5 border rounded hover:bg-gray-200 flex justify-center w-fit mt-[20px] md:mt-[30px] md:ml-auto"
              >
                Update Profile
              </Link>
            </div>
            <Box
              className="mt-[20px] md:mt-[40px]"
              sx={{ width: "100%", typography: "body1" }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Profile" value="1" />
                    <Tab label="Cart" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" className="flex flex-col gap-2">
                  <div className="flex gap-x-2 items-center">
                    <PhoneCallback />
                    <div>
                      {userDetail?.phone}
                      <p className="text-xs text-gray-400">Phone Number</p>
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Email />
                    <div>{userDetail?.email}</div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Lock />
                    <div>
                      {userDetail?.isBlocked ? "Blocked" : "Un Blocked"}
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <AdminPanelSettings />
                    <div>
                      {userDetail?.roles &&
                        Object.keys(userDetail?.roles).join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Timelapse />
                    <div>{userDetail?.createdAt}</div>
                  </div>
                </TabPanel>
                <TabPanel className="py-1" value="2">
                  {userDetail?.cart.length > 0 ? (
                    <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-3">
                      {userDetail?.cart.map((item) => (
                        <CartItem data={item} key={item.name} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-2xl justify-center w-full">
                      Cart Is Empty
                    </p>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default UserDetailPage;
