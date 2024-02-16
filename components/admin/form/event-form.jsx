"use client";
import { Camera, CloseOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Progress } from "flowbite-react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "~/components/loading";
import SelectLocation from "~/components/select-location";
import { upload_image } from "~/services/CKEditor/image";

import SaveLocation from "~/components/save-location";
import {
  get_city,
  get_detail_city,
  get_district,
} from "~/services/country-api";
import Map from "~/components/google-map";

function EventForm({ title, dataEvent, loader, onSubmit }) {
  const {
    register,
    formState: { errors },
    setValue,
    control,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [image, setImage] = useState([]);
  const [event, setEvent] = useState(null);
  const [valueDate, setValueDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatDate = (date) => {
    const isoString = new Date(date).toISOString();
    return isoString.split("T")[0]; // Lấy phần "YYYY-MM-DD"
  };
  useEffect(() => {
    if (dataEvent) setEvent(dataEvent);
    console.log(dataEvent);
  }, [dataEvent]);
  const setValueofFormData = useCallback(() => {
    setValue("image", event?.image || "");
    setValue("name", event?.name || "");
    setValue("description", event?.description || "");
    setValue("startDate", formatDate(event?.startDate) || "");
    setValue("endDate", formatDate(event?.endDate) || "");
    setValue("location", event?.location || "");
    setValue("organizer", event?.organizer || "");
    setValue("website", event?.website || "");
    console.log(event?.location.split(", ")[1]);
  }, [event, setValue]);
  useEffect(() => {
    if (event) setValueofFormData();
  }, [event, setValueofFormData]);
  const handleUploadImage = async (e) => {
    setIsLoading(true);
    let files = e.target.files;
    const url = await upload_image(files, setProgress);
    if (url) {
      url.forEach((item) => {
        setImage((prev) => [...prev, item]);
        setValue("image", item.webContentLink);
      });
      toast.success("Uploaded Image Success");
    }
    setProgress(0);
    setIsLoading(false);
  };
  if (!loader)
    return (
      <div className="container mx-auto flex justify-center items-center h-full w-full">
        <Loading />
      </div>
    );
  return (
    <div className="container mx-auto px-3 w-full">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 py-6 rounded-md flex justify-between bg-white shadow-md shadow-gray-300 items-center">
          <h2 className="font-medium text-xl">{title}</h2>
          <input
            type="submit"
            value="Save"
            className="border px-4 py-1 hover:bg-blue-500 hover:text-white shadow-sm rounded-md cursor-pointer"
          />
        </div>
        <div className="w-full lg:h-[600px] md:h-[300px] h-[200px] relative rounded-lg overflow-hidden my-6">
          {event ? (
           
              <Image
                src={event.image}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
          ) : (
            <Image
              src={"/images/event.jpg"}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          )}
          <label
            className="text-white absolute top-2 left-2 flex gap-x-2 items-center border border-white px-2 py-1 text-sm hover:text-opacity-80 cursor-pointer"
            htmlFor="image"
          >
            <Camera />
            <span>Change cover photo</span>
            <input
              type="file"
              className="hidden"
              id="image"
              {...register("image")}
              name="image"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </label>
          {isLoading && <Progress progress={progress} size="md" color="dark" />}
        </div>
        <div className="grid grid-cols-12 gap-x-3">
          <div className="lg:col-span-8 col-span-12 rounded-lg shadow-md shadow-slate-400 p-4">
            <h2 className="font-medium text-lg">Event Details</h2>
            <div className="my-4">
              <label htmlFor="name" className="text-gray-500 font-semibold">
                Event Name
              </label>
              <input
                id="name"
                name="name"
                {...register("name", {
                  required: "Field must be required",
                })}
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="Event Name"
              />
            </div>
            <div className="my-4 grid grid-cols-2 gap-x-3">
              <div>
                <label
                  htmlFor="startDate"
                  className="text-gray-500 font-semibold"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  {...register("startDate", {
                    required: "Field must be required",
                  })}
                  className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                  type="date"
                  placeholder="Start Date"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="text-gray-500 font-semibold"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  {...register("endDate", {
                    required: "Field must be required",
                  })}
                  className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                  type="date"
                  placeholder="End Date"
                />
              </div>
            </div>
            {/* <div>
              <SaveLocation />
            </div> */}
            <div className="my-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-500 mb-2">
                  Location
                </h3>

                <TextField
                  className="my-6"
                  label="Location"
                  name="location"
                  type="text"
                  {...register("location", {
                    required: "Location must be required",
                  })}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  error={!!errors.location}
                  helperText={errors?.location?.message}
                  size="small"
                />
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="description"
                className="text-gray-500 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={6}
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus:outline focus:outline-blue-200 focus:outline-2"
              ></textarea>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12  rounded-lg shadow-md shadow-slate-400 p-4">
            <h2 className="font-medium text-lg">Other Info</h2>
            <div className="my-4">
              <label
                htmlFor="organizer"
                className="text-gray-500 font-semibold"
              >
                Organizer
              </label>
              <input
                id="organizer"
                name="organizer"
                {...register("organizer", {
                  required: "Field must be required",
                })}
                className="w-full border-2 border-gray-300 py-1.5 px-4 rounded-md mt-2 focus-within:outline focus:outline-blue-400 focus:outline-2"
                placeholder="Organizer"
              />
            </div>
            <div className="my-4">
              <label htmlFor="website" className="text-gray-500 font-semibold">
                Website
              </label>
              <input
                id="website"
                {...register("website")}
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
