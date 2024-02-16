"use client";
import React, { useEffect, useState } from "react";
import MailItem from "../mail-item";
import { Add, Refresh } from "@mui/icons-material";
import Link from "next/link";
import { get_all_mail_template } from "~/services/mails";

function MailTemplate() {
  const [mails, setMails] = useState([]);

  async function getMails() {
    const res = await get_all_mail_template();
    if (res) {
      setMails(res);
    }
  }
  useEffect(() => {
    getMails();
  }, []);
  return (
    <div className="container mx-auto rounded-xl shadow-md shadow-neutral-300 mt-2">
      <div className="p-4 shadow-sm shadow-gray-300 flex items-center justify-between">
        <div>
          <div className="py-0.5 px-2.5 rounded-md border w-fit hover:bg-gray-50 cursor-pointer focus:transition-shadow duration-300 ease-in-out shadow-md focus-visible:bg-gray-300">
            <Refresh sx={{ fontSize: 20 }} />
          </div>
        </div>
        <Link
          href="/admin/mails/add-mail"
          className="flex gap-x-1.5 items-center text-blue-500 py-1 px-2 shadow-sm hover:shadow-md shadow-blue-300 border rounded-md w-fit hover:bg-blue-100"
        >
          <Add />
          <span>Compose</span>
        </Link>
      </div>
      {mails.length > 0 &&
        mails.map((item) => <MailItem key={item._id} data={item} />)}
    </div>
  );
}

export default MailTemplate;
