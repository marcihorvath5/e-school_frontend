import axios from "axios";
import useDatastore from "../dataStore/DataStore";

const api = axios.create({
  baseURL: "/api/",
});

const isAuthEndpoint = (url = "") => url.toLowerCase().includes("user/login");

api.interceptors.request.use(
  (config) => {
    if (isAuthEndpoint(config.url)) return config;
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const url = error.config?.url;
    if (error.response?.status === 401 && !isAuthEndpoint(url)) {
      const store = useDatastore.getState();
      store.logout();
    }
    return Promise.reject(error);
  }
);

export default api;
