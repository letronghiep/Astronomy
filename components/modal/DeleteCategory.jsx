"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { delete_article_category_by_id } from "~/services/articleCategory";
import TextTruncate from "../text-truncate";

function DeleteCategory({ onSubmit, onClose, disabled, category, showModal }) {
  return (
    <div
      className="
      flex 
      items-center 
      justify-center
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
      w-full
  "
    >
      <div
        className="
        flex
        relative 
        w-5/6 
        md:w-3/6
        lg:w-2/6
        xl:w-2/5
        my-6
        mx-auto
        lg:h-auto
        md:h-auto
        justify-center
        items-center
        "
      >
        {/* Content */}
        <div
          className={`
          translate
          duration-300
          h-full
          ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }
          `}
        >
          <div
            className="
            translate
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
            h-3/4
            "
          >
            {/* Header */}
            <div
              className="
              flex
              items-center
              p-2
              md:p-5
              rounded-t
              justify-center
              relative
              border-b-[1px]
              font-bold
              h-full
              "
            >
              Do you want to delete this category
            </div>
            <div
              className="
                relative
                p-6
                flex-auto
                flex
                gap-x-2
                flex-col
                lg:flex-row
                "
            >
              <div className="order-2 md:flex-1">
                <p>Category Name: {category?.name}</p>
                <p>Slug: {category?.slug}</p>
                <div className="max-h-[170px] overflow-auto">
                  Description:{" "}
                  <TextTruncate text={category?.description} maxLength="180" />
                </div>
              </div>
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative mx-auto md:mx-0 flex">
                <Image
                  src={category?.image || "/images/no_image.jpg"}
                  layout="fill"
                  alt="No Image"
                  objectFit="cover"
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

export default DeleteCategory;
