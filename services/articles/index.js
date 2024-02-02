// Articles

import axiosInstance from "~/configs/axios";

// create article
export async function add_article(formData) {
  try {
    const res = await axiosInstance.post("/article", formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in deleting Articles (service) =>", error);
  }
}
// get article by id
export async function get_article_by_id(id) {
  try {
    const res = await axiosInstance.get(`/article/${id}`);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in get Article (service) =>", error);
  }
}
export async function update_article(id, formData) {
  try {
    const res = await axiosInstance.put(`/article/${id}`, formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in updating Article (service) =>", error);
  }
}
// search articles
export async function search_articles(perPage, sort, currentPage) {
  try {
    const res = await axiosInstance.get(
      `/article/search?perpage=${perPage}&sort=${sort}&page=${currentPage}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in getting Article (service) =>", error);
  }
}
// delete article by id
export async function delete_article_by_id(id) {
  try {
    const res = await axiosInstance.delete(`/article/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in deleting Article (service) =>", error);
  }
}
