"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  get_city,
  get_detail_city,
  get_district,
} from "~/services/country-api";
import SelectLocation from "./select-location";
import { create_location } from "~/services/location";
import Loading from "./loading";

function SaveLocation() {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [cityData, setCityData] = useState();
  const [districtData, setDistrictData] = useState();

  const [citySelected, setCitySelected] = useState(null);

  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getCity() {
      const result = await get_city();
      if (result) setCityData(result);
    }
    getCity();
  }, []);
  const handleChangeCity = (e) => {
    console.log(e.target.value);
    setCitySelected(e.target.value);
  };
  useEffect(() => {
    async function getDistrict() {
      const result = await get_district(citySelected);
      if (result) setDistrictData(result);
    }
    citySelected && getDistrict();
  }, [citySelected]);
  const handleSelectDistrict = (e) => {
    const district = districtData.find((item) => item.name === e.target.value);
    console.log("====================================");
    console.log(district);
    console.log("===================================");
  };
  useEffect(() => {
    async function getDetail() {
      const data = await get_detail_city(citySelected);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      if (data) {
        setCoordinates((prev) => [...prev, data.longitude, data.latitude]);
      }
    }
    getDetail();
  }, [citySelected]);
  const cityName = useMemo(() => {
    return cityData?.find((item) => item.iso2 === citySelected)?.name;
  }, [citySelected, cityData]);
  const onSubmit = async (formData) => {
    // setIsLoading(false);
    // const finalData = {
    //   name: formData.name,
    //   address: `${formData.name}, ${formData.district}, ${cityName}`,
    //   coordinates: {
    //     coordinates: coordinates,
    //   },
    // };
    // console.log("====================================");
    // console.log(finalData);
    // console.log("====================================");
    // const data = await create_location(finalData);
    // if (data) {
    //   setIsLoading(true);
    // }
  };
  if (!isLoading) return <Loading />;
  return (
    <div className="my-4">
      <div>
        <h3 className="text-lg font-semibold text-neutral-500 mb-2">
          Location
        </h3>
        <TextField
          label="Location Name"
          name="name"
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          error={!!errors.venue}
          helperText={errors?.name?.message}
          size="small"
          {...register("name", { required: "Location name must be provided" })}
        />
        <div className="grid grid-cols-2 my-3 gap-x-4">
          <SelectLocation
            title="City"
            name="city"
            {...register("city")}
            data={cityData}
            onChange={handleChangeCity}
          />
          <SelectLocation
            title="District"
            name="district"
            {...register("district")}
            data={districtData}
            onChange={handleSelectDistrict}
          />
        </div>
        <input
          className="border py-1 px-2"
          type="submit"
          value="Add"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}

export default SaveLocation;
