"use client";
import Image from "next/image";
import React from "react";

function Comment() {
  return (
    <div className=" p-4 rounded-lg shadow-sm hover:opacity-90 cursor-pointer hover:bg-gray-100 transition-shadow duration-300 ease-in-out">
      <div className="flex gap-x-3 items-stretch">
        <div className="w-[40px] h-[40px] relative rounded-full">
          <Image
            src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            alt="image"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-sm md:text-base font-semibold">Name</p>
          <p className="text-gray-500 text-xs font-medium">1 Aug 2023</p>
        </div>
      </div>
      <p className="py-2 px-3 indent-8 text-base text-slate-700 line-clamp-3 overflow-hidden text-justify">
        For millennia, Full Moons have wielded a magnetic charm. This monthly
        event has been the inspiration behind myths, tales, traditions, and even
        farming. Well update this article multiple times each week with the
        latest moonrise, moonset, Full Moon schedule, and what you can see in
        the sky each week. The Full Moon in February 2024 is at 7:30 a.m. on
        Saturday, Feb. 24. Heres the complete list of Full Moons in 2024 along
        with their traditional names 2024 Full
      </p>
    </div>
  );
}

export default Comment;
