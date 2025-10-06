
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // đổi nếu BE chạy port khác
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ Không có token trong localStorage!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
