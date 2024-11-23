import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      document.dispatchEvent(new Event("logout"));

      return new Promise((_, reject) => {
        const interval = window.setInterval(() => {
          reject(error);
          window.clearInterval(interval);
        }, 5000);
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
