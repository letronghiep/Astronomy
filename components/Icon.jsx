"use client";
import React from "react";
import { IconContext } from "react-icons";
function Icon({ name, size, color }) {
  return (
    <IconContext.Provider value={{ color: color, size: size }}>
      {name}
    </IconContext.Provider>
  );
}

export default Icon;
