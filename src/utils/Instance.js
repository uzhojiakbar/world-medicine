import axios from "axios";
import Cookies from "js-cookie";

// http://192.168.23.100:8080/api

const url = "/api";

const Instance = axios.create({
  baseURL: "https://falcon.enterinfinit.uz:8082/api", // O'zingizning backend URL
  // baseURL: "http://192.168.31.63:8080/api", // O'zingizning backend URL

  timeout: 5000, // Maksimal kutish vaqti (10 soniya)
});

// Access tokenni avtomatik yuborish
Instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token orqali tokenni yangilash
Instance.interceptors.response.use(
  (response) => response, // Javob muvaffaqiyatli bo'lsa, qaytaradi
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 xato bo'lsa va token muddati tugagan bo'lsa
    if (error.response?.startus === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // So'rovni qayta yubormaslik uchun flag

      try {
        const refreshToken = Cookies.get("refresh_token");

        // Refresh token orqali yangi access tokenni olish
        const response = await axios.post(
          `${url}/v1/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token, refresh_token: new_refresh_token } =
          response.data;

        // Yangi tokenlarni saqlash
        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", new_refresh_token);

        // Yangi token bilan original so'rovni qayta yuborish
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return Instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token xatosi:", refreshError);

        // Refresh token ham ishlamasa, foydalanuvchini logout qiling
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login"; // Login sahifasiga qaytarish
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export const reloadPage = () => {
  document.location.reload();
}

export default Instance;
