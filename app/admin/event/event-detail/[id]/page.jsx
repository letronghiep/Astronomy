"use client";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CalendarPicked from "~/components/calendar-picked";
import MainLayout from "~/components/admin/MainLayout";
import { get_event_by_id } from "~/services/event";
import Map from "~/components/google-map";

function EventDetailPage({ params }) {
  const [eventDetail, setEventDetail] = useState(null);
  const [eventDate, setEventDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getEvent() {
      try {
        setIsLoading(true);
        const res = await get_event_by_id(params.id);
        if (res) setEventDetail(res);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    }
    getEvent();
  }, [params.id]);
  useEffect(() => {
    if (eventDetail) {
      const date = new Date(eventDetail?.startDate).toDateString().split(" ");
      setEventDate([date[1], date[2]]);
    }
  }, [eventDetail]);
  if (!eventDetail) return null;
  if (isLoading) return <Spinner />;
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="rounded-lg shadow-lg shadow-neutral-400 overflow-hidden">
          <div className="h-[200px] md:h[300px] lg:h-[350px] relative w-full">
            <Image
              layout="fill"
              src="/images/event.jpg"
              alt="image"
              objectFit="cover"
            />
          </div>
          <div className="p-4 flex items-start gap-x-3">
            <CalendarPicked date={eventDate[1]} month={eventDate[0]} />
            <div>
              <h2 className="font-medium ">{eventDetail.name}</h2>
              <p className="text-sm font-light">
                By{" "}
                <span className="text-blue-600">{eventDetail.organizer}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-8 p-4 rounded-lg shadow-lg shadow-neutral-400 h-full">
            <h2 className="font-bold text-xl text-neutral-600 ">Description</h2>
            <p className="text-neutral-800/80 text-base font-sans my-4">
              {eventDetail.description}
            </p>
            <div>
              <h2>Share with friends</h2>
              <div className="h-[600px] max-h-[600px]">
                <Map location={eventDetail.location} />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 p-4 rounded-lg shadow-lg shadow-neutral-400 ">
            <h2 className="font-bold text-xl text-neutral-600">
              Date And Time
            </h2>
            <div className="text-sm text-gray-600 font-light">
              <p>{new Date(eventDetail.startDate).toDateString()}</p>
              <p>{new Date(eventDetail.endDate).toDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-gray-600 font-light">
                {eventDetail.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EventDetailPage;
