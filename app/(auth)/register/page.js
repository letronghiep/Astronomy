"use client";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "~/configs/schema";
import { Button, TextField } from "@mui/material";
function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    createAt: new Date().toISOString(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    // e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3500/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('====================================');
        console.log("Dang ky thanh cong");
        console.log('====================================');
      } else {
        console.log("Đăng ký thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative h-full">
      <div className="bg-auth absolute top-0 h-full w-full" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative sm:bg-white sm:w-[450px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              name="firstname"
              {...register("firstname")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.firstname}
              helperText={errors?.firstname?.message}
              value={formData.firstname}
              onChange={handleInputChange}
              size="small"
            />
            <TextField
              label="Last Name"
              name="lastname"
              {...register("lastname")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.lastname}
              helperText={errors?.lastname?.message}
              value={formData.lastname}
              onChange={handleInputChange}
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              {...register("email")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.email}
              helperText={errors?.email?.message}
              value={formData.email}
              onChange={handleInputChange}
              size="small"
              type="email"
            />
            <TextField
              label="Phone"
              name="phone"
              {...register("phone")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.phone}
              helperText={errors?.phone?.message}
              value={formData.phone}
              onChange={handleInputChange}
              size="small"
              type="text"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              {...register("password")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.password}
              helperText={errors?.password?.message}
              value={formData.password}
              onChange={handleInputChange}
              size="small"
            />
            <TextField
              label="Repeat password"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              size="small"
            />
            <Button
              type="submit"
              fullWidth="true"
              variant="outlined"
              size="small"
            >
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
