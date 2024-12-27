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
      const response = await Instance.get(`/v1/user/${sub}`);
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
  getProdaji: async (tokeen) => {
    const token = tokeen || Cookie.get("access_token");

    const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

    const mock = [
      {
        id: 1,
        name: "Амлипин таблетки",
        prodaj: 200,
        Таш: 20,
        Сам: 15,
        Бух: 25,
        Анж: 30,
        Фер: 10,
        Нам: 5,
        Каш: 20,
        Сур: 10,
        Джи: 5,
        Сыр: 15,
        Таш_об: 10,
        Хор: 5,
      },
      {
        id: 2,
        name: "Нурокс таблетки",
        prodaj: 150,
        Таш: 10,
        Сам: 30,
        Бух: 20,
        Анж: 25,
        Фер: 8,
        Нам: 3,
        Каш: 15,
        Сур: 5,
        Джи: 3,
        Сыр: 10,
        Таш_об: 8,
        Хор: 4,
      },
      {
        id: 3,
        name: "Панадол капсулы",
        prodaj: 100,
        Таш: 8,
        Сам: 25,
        Бух: 18,
        Анж: 20,
        Фер: 5,
        Нам: 2,
        Каш: 10,
        Сур: 3,
        Джи: 2,
        Сыр: 8,
        Таш_об: 6,
        Хор: 3,
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
  getPreparat: async (tokeen) => {
    const token = tokeen || Cookie.get("access_token");

    const sub = jwtDecode(token)?.sub; // To'g'ri ishlatilmoqda

    const mock = [
      {
        id: 1,
        name: "Амините таблеткалар",
        dosage: "5/10 мг",
        quantity: "30 шт",
        price: "12000 Сум",
        Рецептурник: "7",
        СУ11: "11%",
        СУ12: "5",
        СБ1: "5",
        СБ2: "3",
        ГЗ1: "6%",
        ГЗ2: "10",
        КВ1: "6%",
        КВ2: "10",
      },
      {
        id: 2,
        name: "Амините таблеткалар",
        dosage: "5/10 мг",
        quantity: "30 шт",
        price: "12000 Сум",
        Рецептурник: "7",
        СУ11: "11%",
        СУ12: "5",
        СБ1: "5",
        СБ2: "3",
        ГЗ1: "6%",
        ГЗ2: "10",
        КВ1: "6%",
        КВ2: "10",
      },
      {
        id: 3,
        name: "Амините таблеткалар",
        dosage: "5/10 мг",
        quantity: "30 шт",
        price: "12000 Сум",
        Рецептурник: "7",
        СУ11: "11%",
        СУ12: "5",
        СБ1: "5",
        СБ2: "3",
        ГЗ1: "6%",
        ГЗ2: "10",
        КВ1: "6%",
        КВ2: "10",
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
