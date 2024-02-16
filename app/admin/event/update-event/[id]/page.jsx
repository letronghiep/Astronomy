"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "~/components/admin/MainLayout";
import EventForm from "~/components/admin/form/event-form";
import useAdminNav from "~/hooks/useAdminNav";
import { get_event_by_id, update_event } from "~/services/event";
import { create_location } from "~/services/location";

function UpdateEventPage({ params }) {
  const { setNavActive } = useAdminNav();
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getEvent() {
      try {
        setIsLoading(false);
        const res = await get_event_by_id(params.id);
        if (res) setEventDetail(res);
        setIsLoading(true);
      } catch (error) {
        toast.error(error);
        setIsLoading(true);
      }
    }
    getEvent();
  }, [params.id]);
  console.log("====================================");
  console.log(eventDetail);
  console.log("====================================");
  const onSubmit = async (formData) => {
    const res = await axios.get(
      `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
        formData.location
      )}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_GOONG_API_KEY,
        },
      }
    );
    const geometry = await res.data.results[0].geometry;
    const coordinates = geometry?.location;
    try {
      setIsLoading(false);
      const location = formData.location.split(", ");
      const location_form = {
        name: location[0],
        address: formData.location,
        coordinates: {
          coordinates: [coordinates.lng, coordinates.lat],
        },
      };

      const createLocation = await create_location(location_form);
      if (createLocation) {
        const res = await update_event(params.id, formData);
        if (res) {
          setIsLoading(true);
          toast.success("Created an event");
          setTimeout(() => {
            router.push("/admin");
            setNavActive("Events");
          }, 4000);
        } else {
          toast.error("Something went wrong ");
          setIsLoading(true);
        }
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(true);
    }
  };
  return (
    <MainLayout>
      <EventForm
        dataEvent={eventDetail}
        title="Update Event"
        onSubmit={onSubmit}
        loader={isLoading}
      />
    </MainLayout>
  );
}

export default UpdateEventPage;
