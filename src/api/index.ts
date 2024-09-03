import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const isDevelopment = import.meta.env.MODE === "development";
let baseURL = "http://localhost:8080/api/v1";

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = "http://localhost:8080/api/v1";
}

const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? "Bearer " + token.replace(/"/g, "") : "";
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.error.errorMessage);
  }
)

export default api;
