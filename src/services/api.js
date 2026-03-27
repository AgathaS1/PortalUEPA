import axios from "axios";

// -- Axios Config
const api = axios.create({
  // Url da API
  baseURL: "http://localhost:3000",

  // Mandando Cookies
  withCredentials: true,
});

// Exportando a api
export default api;
