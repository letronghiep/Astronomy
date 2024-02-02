"use client";
import { useRouter } from "next/navigation";
import React from "react";

function MailItem({ isChecked, data }) {
  const router = useRouter();
  return (
    <div
      className="shadow-sm shadow-gray-300 cursor-pointer hover:shadow-lg p-4 flex items-stretch gap-x-2 justify-between"
      onClick={() => {
        router.push(`/admin/mails/mail-detail/${data?._id}`);
      }}
    >
      <div className="flex items-start gap-x-2">
        <input
          type="checkbox"
          checked={isChecked}
          className="border border-gray-400 rounded-sm hidden md:block mt-1"
        />
        <div className="w-full">
          <div className="flex items-stretch gap-x-3">
            <div>
              <h5 className="font-semibold text-sm md:text-sm text-neutral-600">
                {data?.name || "Le Hiep"}
              </h5>
            </div>
            <span className="text-green-600 bg-green-200 font-bold text-xs px-2 py-0.5 rounded-sm">
              New
            </span>
          </div>
          <div className="">
            <p className="text-xs font-semibold text-neutral-600 float-left">
              {data?.title || "Your Daily Work Summary"}
            </p>
            <span className="text-xs block">
              -{" "}
              {data?.description ||
                "Your Daily Work Summary Your Daily Work Summary"}
            </span>
          </div>
        </div>
      </div>
      <div className="text-xs font-semibold text-neutral-500">Mar 26</div>
    </div>
  );
}

export default MailItem;
