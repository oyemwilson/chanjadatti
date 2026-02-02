import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  if (adminInfo?.token) {
    config.headers.Authorization = `Bearer ${adminInfo.token}`;
  }

  return config;
});

export default axiosInstance;
