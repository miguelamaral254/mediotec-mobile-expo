import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const api = axios.create({
  baseURL: "http://192.168.1.43:8080", 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token'); // Usa AsyncStorage para obter o token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
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
    
    return Promise.reject(error);
  }
);

export default api;
