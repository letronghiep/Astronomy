"use client";
import React from "react";

function CalendarPicked({ date, month }) {
  return (
    <div className="flex flex-col border-red-600 border-2 rounded-md">
      <h2 className="font-bold text-white bg-red-700 px-1.5 text-center">
        {month}
      </h2>
      <h4 className="text-2xl font-bold text-gray-400 px-2 text-center">
        {date}
      </h4>
    </div>
  );
}

export default CalendarPicked;
