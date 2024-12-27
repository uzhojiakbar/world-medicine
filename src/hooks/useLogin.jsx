import { jwtDecode } from "jwt-decode";
import Instance from "../utils/Instance";
import getNotify from "./useNotify";
import Server from "../utils/server/server";

const { notify } = getNotify();

const handleApiError = (error) => {
  if (error.response?.data === "INCORRECT_NUMBER_OR_PASSWORD") {
    notify("err", "Login yoki Parol xato");
  } else if (error.request) {
    notify("err", "Serverga ulanishda muammo!");
  } else {
    notify("err", error.message || "Noma'lum xato yuz berdi!");
  }
  throw error;
};

export const useSignIn = () => {
  return async (username, password, isNumber, onSuccess, onError) => {
    try {
      // API so'rovi uchun payloadni tayyorlash
      const reqData = {
        number: username,
        email: "",
        isNumber: isNumber,
        password,
      };

      // API so'rovi
      // const response = await Instance.post("/v1/auth/login", reqData);

      // Javobni console.log bilan tekshirish
      // console.log("API Response:", response);
      // console.log("Response Data:", response.data);

      // Tokenlarni ajratib olish (javobni to'g'ri tuzish)

      if (
        reqData.number === "998911111111" &&
        reqData.password === "998911111111"
      ) {
        const role = jwtDecode(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE3MzUyNzU0ODgsImV4cCI6MTczNTYzNTQ4OH0.an95ZWVaPh0i0uCWGjuWRGF26bXyUWmHBrCEwtvX3AA"
        )?.role;

        notify("ok", `${role}, добро пожаловать!`);
        // MANAGER
        onSuccess(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE3MzUyNzU0ODgsImV4cCI6MTczNTYzNTQ4OH0.an95ZWVaPh0i0uCWGjuWRGF26bXyUWmHBrCEwtvX3AA"
        );
      }

      if (
        reqData.number === "998900000000" &&
        reqData.password === "998900000000"
      ) {
        const role = jwtDecode(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNVUEVSQURNSU4iLCJpYXQiOjE3MzUyNzU0NTEsImV4cCI6MTczNTYzNTQ1MX0.87WHmuTpR95-uSPcGpaaeLspe9Oq1jp6JA_qFbKXE7s"
        )?.role;

        notify("ok", `${role}, добро пожаловать!`);
        // SUPERADMIN
        onSuccess(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNVUEVSQURNSU4iLCJpYXQiOjE3MzUyNzU0NTEsImV4cCI6MTczNTYzNTQ1MX0.87WHmuTpR95-uSPcGpaaeLspe9Oq1jp6JA_qFbKXE7s"
        );
      }

      if (
        reqData.number === "998999999999" &&
        reqData.password === "998999999999"
      ) {
        const role = jwtDecode(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNISUVGIiwiaWF0IjoxNzM1Mjc1NDE1LCJleHAiOjE3MzU2MzU0MTV9.wwrq-mWfWfPDPk88xuZZ-Lj0gjugs0LX_9xKp1WaYTs"
        )?.role;

        notify("ok", `${role}, добро пожаловать!`);
        // CHIEF
        onSuccess(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNISUVGIiwiaWF0IjoxNzM1Mjc1NDE1LCJleHAiOjE3MzU2MzU0MTV9.wwrq-mWfWfPDPk88xuZZ-Lj0gjugs0LX_9xKp1WaYTs"
        );
      }
    } catch (error) {
      // Xatolikni qayta ishlash
      console.log("ERRROOOR", error);

      onError(error);
      handleApiError(error);
    }
  };
};
