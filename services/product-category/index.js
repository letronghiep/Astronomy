import axiosInstance from "~/configs/axios";

export async function get_product_category(perPage, sort, page) {
  try {
    const res = await axiosInstance.get(
      `/productcategory?perpage=${perPage}&sort=${sort}&page=${page}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}

export async function create_product_category(formData) {
  try {
    const res = await axiosInstance.post("/productcategory/create", formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}

export async function update_product_category(id, formData) {
  try {
    const res = await axiosInstance.put(`/productcategory/update/${id}`, formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}

export async function get_product_category_by_id(id) {
  try {
    const res = await axiosInstance.get(`/productcategory/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}

export async function delete_product_category_by_id(id) {
  try {
    const res = await axiosInstance.delete(`/productcategory/delete/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}
