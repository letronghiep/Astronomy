// utils/axios.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500", // Thay thế bằng URL của API của bạn
  timeout: 3000, // Đặt thời gian timeout nếu cần
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm để đặt Authorization token vào header của Axios request
export const setAuthHeader = (accessToken) => {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

export default axiosInstance;
