import axios from "axios";

export async function get_city() {
  try {
    const res = await axios.get(
      "https://api.countrystatecity.in/v1/countries/VN/states",
      {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRY_STATE_KEY,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error when getting city", error.message);
    console.log("====================================");
  }
}
export async function get_district(city) {
  try {
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/VN/states/${city}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRY_STATE_KEY,
        },
      }
    );
    const data = await res.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error when getting city", error.message);
    console.log("====================================");
  }
}
export async function get_detail_city(city) {
  try {
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/VN/states/${city}`,
      {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_COUNTRY_STATE_KEY,
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("====================================");
    console.log("Error when getting city", error.message);
    console.log("====================================");
  }
}
