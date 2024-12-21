import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://192.168.23.100:8080/api/v1";

const Server = {
  getPosts: async () => {
    const token = Cookie.get("access_token");

    console.log("TOKEEEEEEEN", token);

    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await axiosInstance.get(
        `/admin/doctors/not-declined-not-enabled`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserInfo: async () => {
    const token = Cookie.get("access_token");

    console.log("TOKEEEEEEEN", token);
    const sub = jwtDecode(token)?.sub;

    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await axiosInstance.get(`/user/${sub}`);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Server;
