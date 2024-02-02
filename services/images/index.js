import axiosInstance from "~/configs/axios";

export async function get_image(id) {
  try {
    const res = await axiosInstance.get(`/image/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
