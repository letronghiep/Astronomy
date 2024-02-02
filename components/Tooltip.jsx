"use client";
import { Icon, Tooltip } from "@mui/material";
import React from "react";

function TooltipCustom({ name, title }) {
  return (
    <div className="py-0.5 px-2 rounded-md shadow-sm shadow-neutral-300 cursor-pointer  hover:shadow-neutral-400 transition-shadow duration-300 ease-linear text-gray-600">
      <Tooltip placement="top" title={title}>
        <Icon sx={{ fontSize: 20 }} component={name} />
      </Tooltip>
    </div>
  );
}

export default TooltipCustom;
