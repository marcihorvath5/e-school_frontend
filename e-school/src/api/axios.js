import axios from "axios";
import useDatastore from "../dataStore/DataStore";

const api = axios.create({
  baseURL: "http://192.168.0.45:5001/api/",
});

api.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // For example, adding authorization headers
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    return response.data;
  },
  (error) => {
    // Handle errors here
    // For example, handling 401 unauthorized
    if (error.response?.status === 401) {
      const store = useDatastore.getState();
      store.logout();
    }
    return Promise.reject(error);
  }
);

export default api;
