import axios from "axios";

const api = axios.create({
  baseURL: "https://data-process-analytics-api-production.up.railway.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
