"use client";
import { Spinner } from "flowbite-react";
import React from "react";

function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner aria-label="Alternate spinner button example" size="md" />
    </div>
  );
}

export default Loading;
