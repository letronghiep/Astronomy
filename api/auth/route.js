import axios from "axios";

export const setAuthToken = (expiresIn, accessToken, baseUrl) => {
  return axios
    .post(
      `${baseUrl}/user/login`,
      { expiresIn, accessToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      // Xử lý dữ liệu trả về khi yêu cầu thành công
      console.log("Response data:", response.data);
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    });
};
