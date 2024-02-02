"use client";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Loading from "~/components/loading";
import UserBlock from "~/components/partials/modal/user-block";
import PickRoles from "~/components/partials/roles";

function UserForm({
  loader,
  onSubmit,
  title,
  data,
  roles,
  setRoles,
  isBlocked,
  setIsBlocked,
}) {
  const [user, setUser] = useState();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  useEffect(() => {
    setUser(data);
  }, [data]);
  useEffect(() => {
    if (data?.roles) {
      setRoles(data.roles);
    }
  }, [data, setRoles]);
  const setValueOfFormData = useCallback(() => {
    setValue("firstname", user?.firstname ?? "");
    setValue("lastname", user?.lastname ?? "");
    setValue("password", user?.password ?? "");
    setValue("email", user?.email ?? "");
    setValue("phone", user?.phone ?? "");
  }, [user, setValue]);
  useEffect(() => {
    if (user) setValueOfFormData();
  }, [user, setValueOfFormData]);
  return (
    <div className="w-full px-4 min-h-screen  bg-gray-50 flex flex-col">
      <div className="w-full h-20 my-2 text-center">
        <h1 className="text-2xl py-2 dark:text-black ">{title}</h1>
        {loader && articleLoading ? (
          <>
            <Loading />
            <p>Loading...</p>
          </>
        ) : (
          <div className="w-full h-full flex items-start justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg  py-2 flex flex-col gap-3"
            >
              <TextField
                label="First Name"
                name="firstname"
                type="text"
                {...register("firstname", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.firstname}
                helperText={errors?.firstname?.message}
                size="small"
              />
              <TextField
                label="Last Name"
                name="lastname"
                type="text"
                {...register("lastname", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.lastname}
                helperText={errors?.lastname?.message}
                size="small"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                {...register("email", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.email}
                helperText={errors?.email?.message}
                size="small"
              />
              <TextField
                label="Password"
                name="password"
                type="text"
                {...register("password", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.password}
                helperText={errors?.password?.message}
                size="small"
              />
              <TextField
                label="Phone"
                name="phone"
                type="text"
                {...register("phone", { required: true })}
                variant="outlined"
                sx={{ width: "100%" }}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                size="small"
              />
              {/* roles */}
              <PickRoles
                selectedRoles={roles}
                setSelectedRoles={setRoles}
              />
              <UserBlock
                isBlocked={data?.isBlocked || isBlocked}
                setIsBlocked={setIsBlocked}
              />
              <button className="bg-blue-600 mt-3 p-3 text-white hover:bg-blue-500">
                Done !
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserForm;
