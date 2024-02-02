// utils/axios.js

import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // Thay thế bằng URL của API của bạn
  timeout: 3000, // Đặt thời gian timeout nếu cần
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
