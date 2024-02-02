"use client";
import Image from "next/image";
import React from "react";

function CartItem({ data }) {
  return (
    <div className="flex gap-x-2 items-center md:flex-col md:border md:p-3">
      <div className="w-[80px] h-[80px] relative md:w-full md:h-[200px]">
        <Image
          src={data?.image || "/images/no_image.jpg"}
          alt="product"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex justify-between w-full items-center md:flex-col md:justify-start">
        <div className="md:w-full">
          <h2 className="mb-3 md:mb-1 md:text-2xl text-lg font-semibold md:mt-2 md:text-center">
            {data?.name}
          </h2>
          <p className="text-gray-400 text-sm md:text-center">{data?.price}</p>
        </div>
        <p className="ml-auto text-sm text-gray-400 md:ml-0">
          {data?.stockQuantity}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
