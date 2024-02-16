"use client";
import React, { forwardRef } from "react";

function SelectLocation({ data, name, value, title, onChange, ...props }, ref) {
  return (
    <select
      ref={ref}
      className="border-gray-400"
      name={name}
      onChange={(e) => onChange(e)}
      {...props}
    >
      <option className="disabled">{title}</option>
      {data?.map((item) => (
        <option key={item.id} value={item.iso2}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default forwardRef(SelectLocation);
