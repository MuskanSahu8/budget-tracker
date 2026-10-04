import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://budget-tracker-backend-hbx7.onrender.com/api",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(
      "request send",
      config.method,
      config.url
    );

    console.log(
      "Full URL:",
      config.baseURL + config.url
    );

    console.log(
      "withCredentials:",
      config.withCredentials
    );

    return config;
  },
  (error) => {
    console.log("request error:", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("response:", response);
    return response;
  },
  (error) => {
    console.log("Response error:", error);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    return Promise.reject(error);
  }
);

export default apiClient;