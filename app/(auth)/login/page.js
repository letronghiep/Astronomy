"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "yup";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [accessToken, setAccessToken] = useState(null);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [err, setErr] = useState("");
  const onSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3500/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        const { accessToken } = data;
        setAccessToken(accessToken);
        console.log("Đăng nhập thành công! Access Token:", accessToken);
        localStorage.setItem("accessToken", accessToken);
        route.push("/");
      } else if (response.status === 401) {
        // toast("Kiểm tra lại email và password");
        toast("Please check email or password");
      } else if (response.status === 400) {
        toast("Please enter email and password");
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="relative h-full">
      <div className="bg-auth absolute top-0 h-full w-full" />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative sm:bg-white sm:w-[450px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              fullWidth="true"
              variant="outlined"
              size="small"
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? 
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
