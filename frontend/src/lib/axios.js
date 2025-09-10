import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // send cookies with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Axios interceptor - Token found:", token ? "yes" : "no");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Axios interceptor - Authorization header set");
    } else {
      console.log(
        "Axios interceptor - No token found, request will be sent without auth"
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
