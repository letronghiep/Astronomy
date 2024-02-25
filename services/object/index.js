import axiosInstance from '~/configs/axios'; // Import your axios instance

export async function search(params) {
  try {
    const res = await axiosInstance.get("/object/search", { params });
    const data = res.data;
    return data;
  } catch (error) {
    console.error("error in getAvideo (service) => ", error);
    throw error;
  }
}

