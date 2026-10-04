import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://budget-tracker-backend-hbx7.onrender.com/api",
  withCredentials: true,
  timeout: 60000, // Render free tier can take ~50s to wake up
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("request send", config.method, config.url);
    return config;
  },
  (error) => {
    console.log("request error", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response = network error, CORS block, timeout, or server asleep
    if (!error.response) {
      console.log("Network error:", error.code, error.message);
      return Promise.reject(error);
    }

    const status = error.response.status;
    console.log("Response error:", status, error.response.data);

    if (status === 401 || status === 403) {
      console.log("unauthorized || forbidden");
      // redirect to login page
    }

    return Promise.reject(error);
  }
);

export default apiClient;