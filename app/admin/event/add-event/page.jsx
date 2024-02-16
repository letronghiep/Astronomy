"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "~/components/admin/MainLayout";
import EventForm from "~/components/admin/form/event-form";
import useAdminNav from "~/hooks/useAdminNav";
import { create_event } from "~/services/event";
import { create_location } from "~/services/location";

function AddEventPage() {
  const { setNavActive } = useAdminNav();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [cityName, setCityName] = useState();
  const onSubmit = async (formData) => {
    console.log("====================================");
    console.log(formData.location);
    console.log("====================================");
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
        const res = await create_event(formData);
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
      <EventForm onSubmit={onSubmit} title="Add Event" loader={isLoading} />
    </MainLayout>
  );
}

export default AddEventPage;
