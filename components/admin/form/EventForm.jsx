"use client";
import { Camera, CloudUpload } from "@mui/icons-material";
import Image from "next/image";
import React, { useState } from "react";

function EventForm() {
  return (
    <div className="container mx-auto px-3">
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <div className="px-5 py-6 rounded-md flex justify-between bg-white shadow-md shadow-gray-300 items-center">
          <h2 className="font-medium text-xl">Create Event</h2>
          <input
            type="submit"
            value="Save"
            className="border px-4 py-1 hover:bg-gray-100 shadow-sm rounded-md"
          />
        </div>
        <div className="w-full lg:h-[600px] md:h-[300px] h-[200px] relative rounded-lg overflow-hidden my-6">
          <Image
            src="/images/event.jpg"
            alt="event"
            layout="fill"
            objectFit="cover"
          />
          <label
            className="text-white absolute top-2 left-2 flex gap-x-2 items-center border border-white px-2 py-1 text-sm hover:text-opacity-80 cursor-pointer"
            htmlFor="image-upload"
          >
            <Camera />
            <span>Change cover photo</span>
            <input
              type="file"
              className="hidden"
              id="image-upload"
              accept="image/*"
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className="grid grid-cols-12 gap-x-3">
          <div className="lg:col-span-8 col-span-12 rounded-lg shadow-md shadow-slate-400 p-4">
            <h2 className="font-medium text-lg">Event Details</h2>
            <div className="my-4">
              <label
                htmlFor="event-name"
                className="text-gray-500 font-semibold"
              >
                Event Name
              </label>
              <input
                id="event-name"
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="Event Name"
              />
            </div>
            <div className="my-4 grid grid-cols-2 gap-x-3">
              <div>
                <label
                  htmlFor="start-date"
                  className="text-gray-500 font-semibold"
                >
                  Start Date
                </label>
                <input
                  id="start-date"
                  className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                  type="date"
                  placeholder="Start Date"
                />
              </div>
              <div>
                <label
                  htmlFor="end-date"
                  className="text-gray-500 font-semibold"
                >
                  End Date
                </label>
                <input
                  id="end-date"
                  className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                  type="date"
                  placeholder="End Date"
                />
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="event-location"
                className="text-gray-500 font-semibold"
              >
                Location
              </label>
              <input
                id="event-location"
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="Location"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="event-desc"
                className="text-gray-500 font-semibold"
              >
                Description
              </label>
              <textarea
                id="event-desc"
                rows={6}
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus:outline focus:outline-blue-200 focus:outline-2"
              ></textarea>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12  rounded-lg shadow-md shadow-slate-400 p-4">
            <h2 className="font-medium text-lg">Other Info</h2>
            <div className="my-4">
              <label
                htmlFor="event-orga"
                className="text-gray-500 font-semibold"
              >
                Organizer
              </label>
              <input
                id="event-orga"
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="Organizer"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="event-web"
                className="text-gray-500 font-semibold"
              >
                Website
              </label>
              <input
                id="event-web"
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
