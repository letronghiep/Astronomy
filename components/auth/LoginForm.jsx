"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Schema } from "~/configs/schema";
import { verifyToken } from "~/lib/verifyToken";
import { login } from "~/services/auth/index";
import { useAuthStore } from "~/utils/AuthStore";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);\
  const userData = useAuthStore((state) => state.userData);
  const hasRole = useAuthStore((state) => state.hasRole);
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
  const onSubmit = async () => {
    const res = await login(formData);
    if (res != null) {
      Cookies.set("jwt", res.accessToken);
      localStorage.setItem("jwt", res.accessToken);
      const token = localStorage.getItem("jwt");
      const user = verifyToken(token);
      const roles = user?.roles;
      userData(token, roles);
      const test = useAuthStore.getState().token;
      console.log("====================================");
      console.log(test);
      console.log("====================================");
      if (hasRole(2000)) {
        route.push("/admin");
      } else {
        route.push("/");
      }
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
              type="email"
              {...register("email")}
              variant="outlined"
              sx={{ width: "100%" }}
              error={!!errors.email}
              helperText={errors?.email?.message}
              value={formData.email}
              onChange={handleInputChange}
              size="small"
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

export default LoginForm;
