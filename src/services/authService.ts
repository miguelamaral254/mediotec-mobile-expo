import api, { DEBUG_MODE } from "./api";
import { LoginResponse } from "../interfaces/authInterface";

export const login = async (
  cpf: string,
  password: string
): Promise<LoginResponse> => {
  if (DEBUG_MODE) {
    console.log("Iniciando login...");
  }
  const response = await api.post<LoginResponse>(`/auth/login`, {
    cpf,
    password,
  });

  if (DEBUG_MODE) {
    console.log("Resposta do login:", response.data);
  }

  return response.data;
};

export const getUserData = async (cpf: string) => {
  if (DEBUG_MODE) {
    console.log("Buscando dados do usuário...");
  }
  const response = await api.get(`/user/${cpf}`);

  if (DEBUG_MODE) {
    console.log("Dados do usuário:", response.data);
  }

  return response.data;
};
