const { Axios } = require("axios");

const axios = Axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  Credential: true,
});
export default axios;
