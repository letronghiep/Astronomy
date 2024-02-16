import axiosInstance from "~/configs/axios";

// get all event
export async function get_all_event() {
  try {
    const response = await axiosInstance.get("/event/getall");
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}
// get  event by id
export async function get_event_by_id(id) {
  try {
    const response = await axiosInstance.get(`/event/${id}`);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}

// CREATE EVENT
export async function create_event(formData) {
  try {
    const response = await axiosInstance.post("/event/", formData);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}
// SEARCH EVENT
export async function search_event(perPage, sort, currentPage) {
  try {
    const response = await axiosInstance.get(
      `/event/search?perpage=${perPage}&sort=${sort}&page=${currentPage}`
    );
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}

// update event
export async function update_event(id, formData) {
  try {
    const response = await axiosInstance.put(`/event/${id}`, formData);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}
// DELETE EVENT
export async function delete_event(id) {
  try {
    const response = await axiosInstance.delete(`/event/${id}`);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting event: " + error);
    console.log("====================================");
  }
}
