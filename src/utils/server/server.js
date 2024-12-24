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
  getDogovor: async (tokeen) => {
    const token = tokeen || Cookie.get("access_token");

    const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

    const mock = [
      {
        id: 1,
        No: "119",
        name: "Амлипин таблетки и +3",
        oltimish: "12%",
        yetmish_toqson: "25%",
        Спецусловия: "18%",
        Спецбал: "7%",
        Госзакуп: "22%",
        "Каб. вакцинации": "15%",
      },
      {
        id: 2,
        No: "118",
        name: "Артрокол гель",
        oltimish: "5/5 мг",
        yetmish_toqson: "30 шт",
        Спецусловия: "6",
        Спецбал: "18000 Сум",
        Госзакуп: "XX",
        "Каб. вакцинации": "XX",
      },
    ];

    try {
      // const response = await Instance.get(`/user/${sub}`);
      // console.log("RESPONSE USER INFO", response);

      return mock;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Server;
