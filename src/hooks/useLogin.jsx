import { users } from "../mock/users";
import getNotify from "./useNotify";

const { notify } = getNotify();

export const useSignIn = () => {
  return (username, password, onSuccess, onError) => {
    const user = users.find(
      (v) => v.login === username && v.password === password
    );

    if (user) {
      onSuccess(user); // Muvaffaqiyat callback
      notify("ok", `${user.name}, добро пожаловать`);
    } else {
      onError("Invalid username or password"); // Xatolik callback
      notify("err", `ошибка логина или пароля`);
    }
  };
};
