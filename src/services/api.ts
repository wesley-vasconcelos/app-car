import axios from "axios";

const baseURL = "https://parallelum.com.br/fipe/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
