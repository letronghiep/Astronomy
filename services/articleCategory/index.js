import axiosInstance from "~/configs/axios";

// get articleCategory
export async function getArticleCategory() {
  const res = await axiosInstance.get("/articlecategory/getall");
  const data = await res.data;
  return data;
}

export async function search_article_category(perpage, sort, page) {
  try {
    const res = await axiosInstance.get(
      `/search?perpage=${perpage}&sort=${sort}&page=${page}`
    );
    const result = await res.data;
    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getArticles() {
  const res = await axiosInstance.get("/article");
  const data = await res.data;
  return data;
}

export async function add_article_category(formData) {
  try {
    const res = await axiosInstance.post("/articlecategory", formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
}

export async function update_article_category(formData, id) {
  try {
    const res = await axiosInstance.put(`/articlecategory/${id}`, formData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
}
export async function get_article_category_by_id(id) {}

export async function delete_article_category_by_id(id) {
  try {
    const res = await axiosInstance.delete(`/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in deleting Categories (service) =>", error);
  }
}
