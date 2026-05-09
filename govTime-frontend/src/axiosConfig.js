import axios from "axios";

const api = axios.create({
  baseURL: "https://data-process-analytics-api-production.up.railway.app",
  withCredentials: true,
});

export default api;
