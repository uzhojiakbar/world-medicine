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
      const reqData = isNumber
        ? { number: username, isNumber, password }
        : { email: username, isNumber, password };

      // API so'rovi
      const response = await Instance.post("/v1/auth/login", reqData);
      const user = response.data;

      // Muvaffaqiyatli javobni qayta ishlash
      notify("ok", `${user.name}, добро пожаловать!`);
      onSuccess(user);
    } catch (error) {
      // Xatolikni qayta ishlash
      onError(error);
      handleApiError(error);
    }
  };
};
