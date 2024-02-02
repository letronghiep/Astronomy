"use client";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "~/configs/schema";
import { Button, TextField } from "@mui/material";
import RegisterForm from "~/components/auth/RegisterForm";
function RegisterPage() {
  return <RegisterForm />;
}

export default RegisterPage;
