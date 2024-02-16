import axiosInstance from "~/configs/axios";

export async function create_location(formData) {
  try {
    const res = await axiosInstance.post("/location/create", formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in creating location", error.message);
    console.log("====================================");
  }
}
