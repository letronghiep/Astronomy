import axiosInstance from '~/configs/axios'; // Import your axios instance

export async function getAvideo(params) {
  try {
    const res = await axiosInstance.get("/video", { params });
    const data = res.data;
    return data;
  } catch (error) {
    console.error("error in getAvideo (service) => ", error);
    throw error;
  }
}

export async function getvideos(query) {
  try {
    const res = await axiosInstance.get("/video/search", { params: query });
    const data = res.data;
    return data;
  } catch (error) {
    console.error("error in getvideos (service) => ", error);
    throw error;
  }
}
