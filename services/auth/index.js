import axiosInstance from "~/configs/axios";

export async function register_user(formData) {
  try {
    const res = await axiosInstance.post("/user/register", formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("error in register (service) => ", error);
  }
}

export async function login(formData) {
  try {
    const res = await axiosInstance.post("/user/login", formData);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("error in login (service) => ", error);
  }
}
// forgot-password
