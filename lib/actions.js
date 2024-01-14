"use server";

import axiosInstance, { setAuthHeader } from "~/configs/axios";

export async function getUserById(id) {
  const res = await axiosInstance.get(`/user/${id}`);
  const data = await res.data;
  return data;
}
export async function getUser() {}
