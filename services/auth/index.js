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
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  } catch (error) {
    console.log("error in login (service) => ", error);
  }
}
// forgot-password

export async function logout() {
  const res = await axiosInstance.get("/user/logout");
  const data = await res.data;
  return data;
}
// get all user
export async function get_all_user(perpage, sort, page) {
  const res = await axiosInstance.get(
    `/user/getall?perpage=${perpage}&sort=${sort}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    }
  );
  const data = await res.data;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return data;
}
export async function get_refresh_token() {
  try {
    const res = await axiosInstance.get("/user/refresh");
    const data = await res.data;
    console.log("====================================");
    console.log("refresh", data);
    console.log("====================================");
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}

// get user by id
export async function get_user_by_id(id) {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("error in getting user (service) => ", error);
  }
}

// block user
export async function blocked_a_user(id) {
  try {
    const res = await axiosInstance.put(`/user/block/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("error in blocking user (service) => ", error);
  }
}
//un block user
export async function un_blocked_a_user(id) {
  try {
    const res = await axiosInstance.put(`/user/unblock/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("error in blocking user (service) => ", error);
  }
}
// delete user
export async function delete_user_by_id(id) {
  try {
    const res = await axiosInstance.delete(`/user/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}
