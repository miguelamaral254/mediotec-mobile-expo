import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const DEBUG_MODE = false;

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (DEBUG_MODE) {
      console.log("Configuração da requisição:", config);
    }

    return config;
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error("Erro na configuração da requisição:", error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (DEBUG_MODE) {
      console.log("Resposta da API:", response);
    }
    return response;
  },
  (error) => {
    if (DEBUG_MODE) {
      if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
        console.error("Status do erro:", error.response.status);
        console.error("Headers do erro:", error.response.headers);
      } else if (error.request) {
        console.error("Nenhuma resposta da API foi recebida:", error.request);
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
      }
      console.error("Configuração completa do erro:", error.config);
    }

    return Promise.reject(error);
  }
);

export default api;