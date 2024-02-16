"use client";
import {
  AccessTime,
  Archive,
  ArrowBack,
  Delete,
  Mail,
  Settings,
  Snooze,
} from "@mui/icons-material";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import TooltipCustom from "~/components/tool-tip";
import MainLayout from "~/components/admin/MainLayout";
import Loading from "~/components/loading";
import { get_user_by_id } from "~/services/auth";
import { get_mail_template_by_id } from "~/services/mails";

function MailDetail({ params }) {
  const {
    data: mailDetail,
    loading: isLoading,
    error: error,
  } = useSWR("/maildetail", () => get_mail_template_by_id(params.id));
  const [userPost, setUserPost] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function loadUser() {
      try {
        setLoader(true);
        const res = await get_user_by_id(mailDetail?.createdBy);
        if (res) {
          setUserPost(res);
        }
        setLoader(false);
      } catch (error) {
        toast.error(error);
        setLoader(false);
      }
    }
    loadUser();
  }, [mailDetail?.createdBy]);
  const htmlContent = { __html: mailDetail?.content };
  if (loader)
    return (
      <MainLayout>
        <div className="container flex justify-center items-center h-full w-full">
          <Loading />
        </div>
      </MainLayout>
    );
  return (
    <MainLayout>
      <div className="container mx-auto w-11/12 lg:w-full p-6 rounded-lg shadow-lg shadow-neutral-300 flex justify-between">
        <div className="flex items-center gap-x-2">
          <TooltipCustom name={ArrowBack} title="Back" />
          <span className="text-neutral-500 "> | </span>
          <div className="flex gap-x-1 items-center">
            <TooltipCustom name={Archive} title="Archive" />
            <TooltipCustom name={Delete} title="Delete" />
            <TooltipCustom name={Mail} title="Mark as unread" />
            <TooltipCustom name={Snooze} title="Snooze" />
          </div>
        </div>
        <TooltipCustom name={Settings} title="Setting" />
      </div>
      <div className="container mx-auto w-11/12 lg:w-full my-6 p-6 rounded-lg shadow-lg shadow-neutral-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-xl font-medium font-sans">
              {mailDetail?.name}
            </h2>
            <div className="flex items-center gap-x-2 text-sm mt-2">
              <h4 className="font-medium">
                {userPost?.firstname + " " + userPost?.lastname}
              </h4>
              <span className="text-gray-400">
                {" "}
                - &lsaquo;{userPost?.email}&rsaquo;
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-normal text-gray-500">
              8:40 AM (9 hours ago)
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            dangerouslySetInnerHTML={htmlContent}
            className="lg:w-1/2 mx-auto mail-content"
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default MailDetail;
