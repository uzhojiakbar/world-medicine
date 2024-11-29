import { delCookie } from "./useCookie";
import getNotify from "./useNotify";
import Cookies from "js-cookie";

const { notify } = getNotify();

const useLogout = () => {
  return (onSuccess) => {
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
    Cookies.remove("role");

    if (onSuccess) {
      onSuccess(); // Callback ishlaydi
      notify("ok", "Вы успешно вышли из своего профиля");
    }
  };
};

export default useLogout;
