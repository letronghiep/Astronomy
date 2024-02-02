import axiosInstance from "~/configs/axios";

// get all mail template
export async function get_all_mail_template() {
  try {
    const response = await axiosInstance.get("/mailtemplate");
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting email template: " + error);
    console.log("====================================");
  }
}
// get mail template by id
export async function get_mail_template_by_id(id) {
  try {
    const response = await axiosInstance.get(`/mailtemplate/${id}`);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in getting email template: " + error);
    console.log("====================================");
  }
}
// CREATE email template
export async function create_email_template(formData) {
  try {
    const response = await axiosInstance.post(`/mailtemplate/create`, formData);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in creating email template: " + error);
    console.log("====================================");
  }
}
// UPDATE email template
export async function update_email_template(id, formData) {
  try {
    const response = await axiosInstance.put(
      `/mailtemplate/update/${id}`,
      formData
    );
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in updating email template: " + error);
    console.log("====================================");
  }
}
// UPDATE email template
export async function delete_email_template(id) {
  try {
    const response = await axiosInstance.delete(`/mailtemplate/delete/${id}`);
    return await response.data;
  } catch (error) {
    console.log("====================================");
    console.log("Error in deleting email template: " + error);
    console.log("====================================");
  }
}
