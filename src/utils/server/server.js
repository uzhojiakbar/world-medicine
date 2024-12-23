import axios from "axios";
import Cookie from "js-cookie";
import Instance from "../Instance";
import { jwtDecode } from "jwt-decode";

const Server = {
  getNewConnect: async () => {
    try {
      const response = await Instance.get(
        `/v1/admin/doctors/not-declined-not-enabled?page=0&size=10`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserInfo: async (tokeen) => {
    const token = tokeen || Cookie.get("access_token");

    const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

    try {
      const response = await Instance.get(`/user/${sub}`);
      console.log("RESPONSE USER INFO", response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Server;
