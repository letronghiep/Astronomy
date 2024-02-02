"use client";
import React, { useState } from "react";

function TextTruncate({ text, maxLength }) {
    const [isTruncated, setIsTruncated] = useState(true);
  
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };
  return (
    <div className="max-w-[85%] text-left">
      <p>{isTruncated ? `${text.slice(0, maxLength)}...` : text}</p>
      <span>
        <button
          className="text-sm md:text-base hover:underline"
          onClick={toggleTruncate}
        >
          {isTruncated ? "Show More" : "Show Less"}
        </button>
      </span>
    </div>
  );
}

export default TextTruncate;
