import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.10.4:5197/api",
});

api.interceptors.request.use(
  (config) => {
    // Add any request modifications here
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
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default api;
