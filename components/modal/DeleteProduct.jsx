"use client";
import React from "react";
import { Button } from "flowbite-react";
import Image from "next/image";
import TextTruncate from "../text-truncate";
function DeleteProduct({ onSubmit, onClose, data, disabled, showModal }) {
  return (
    <div
      className="
flex 
justify-center 
items-center 
overflow-hidden 
fixed 
top-0 
bottom-0 
left-0 
right-0 
bg-neutral-800/70 
z-50 
outline-none 
focus:outline-none
inset-0
"
    >
      <div
        className="
    relative 
    w-full 
    md:w-2/6
    lg:w-2/6
    xl:w-2/5
    my-6
    mx-auto
    h-full
    lg:h-auto
    md:h-auto
    "
      >
        {/* Content */}
        <div
          className={`
      translate
      duration-300
      h-full
      ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
        >
          <div
            className="
        translate
        h-full
        lg:h-auto
        md:h-auto
        border-0
        rounded-lg
        shadow-lg
        relative
        flex
        flex-col
        w-full
        bg-white
        outline-none
        focus:outline-none    
        "
          >
            {/* Header */}
            <div
              className="
          flex
          items-center
          p-5
          rounded-t
          justify-center
          relative
          border-b-[1px]
          font-bold

          "
            >
              Do you want to delete this product
            </div>
            <div
              className="
            relative
            p-6
            flex-auto
            flex
            gap-x-2
            "
            >
              <div className="order-2 flex-1">
                <p>Name: {data?.name}</p>

                <p>Category: {data?.category?.name}</p>
                <p>Price: {data?.price}</p>
                <p>
                  Description:{" "}
                  <TextTruncate maxLength={120} text={data?.description} />{" "}
                </p>
                <p>Price: {data?.price} </p>
                <p>Stock: {data?.stockQuantity} </p>
              </div>
              <div className="">
                <Image
                  src={data?.image || "/images/no_image.jpg"}
                  width={100}
                  height={100}
                  alt="No Image"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-4 w-full p-6">
              <Button
                disabled={disabled}
                color="light"
                onClick={onClose}
                outline
              >
                Cancel
              </Button>

              <Button color="failure" disabled={disabled} onClick={onSubmit}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
