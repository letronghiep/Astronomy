import axiosInstance from "~/configs/axios";

export async function get_all_product() {
  try {
    const res = await axiosInstance.get("/product");
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error", error);
    console.log("====================================");
  }
}

export async function get_product_by_id(id) {
  try {
    const res = await axiosInstance.get(`/product/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error", error);
    console.log("====================================");
  }
}

export async function create_product(formData) {
  try {
    const res = await axiosInstance.post("/product/create", formData);
    const data = await res.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error", error);
    console.log("====================================");
  }
}
export async function update_product(id, formData) {
  try {
    const res = await axiosInstance.put(`/product/update/${id}`, formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error", error);
    console.log("====================================");
  }
}
export async function delete_product_by_id(id) {
  try {
    const res = await axiosInstance.delete(`/product/delete/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}