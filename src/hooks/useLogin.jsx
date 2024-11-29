import Instance from "../utils/Instance";
import getNotify from "./useNotify";

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
      const response = await Instance.post("/v1/auth/login", reqData);

      // Javobni console.log bilan tekshirish
      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      // Tokenlarni ajratib olish (javobni to'g'ri tuzish)
      const accessToken = response.data?.accessToken;
      const refreshToken = response.data?.refreshToken;

      const { access_token, refresh_token } = response.data;

      console.log(response.data);

      // Muvaffaqiyatli javobni qayta ishlash
      notify("ok", `${response.data.name}, добро пожаловать!`);
      onSuccess(response.data);
    } catch (error) {
      // Xatolikni qayta ishlash
      onError(error);
      handleApiError(error);
    }
  };
};
