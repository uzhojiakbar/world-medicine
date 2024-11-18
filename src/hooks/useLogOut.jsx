import { delCookie } from "./useCookie";
import getNotify from "./useNotify";

const { notify } = getNotify();

const useLogout = () => {
  return (onSuccess) => {
    delCookie("name");
    delCookie("role");
    delCookie("token");

    if (onSuccess) {
      onSuccess(); // Callback ishlaydi
      notify("ok", "Вы успешно вышли из своего профиля");
    }
  };
};

export default useLogout;
