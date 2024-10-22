import api from './api';

import { LoginResponse } from '../interfaces/authInterface';

export const login = async (cpf: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`/auth/login`, { cpf, password });
  console.log("Resposta do getUserData:", response.data);
  return response.data;
};
export const getUserData = async (cpf: string) => {
  const response = await api.get(`/user/${cpf}`); 
  return response.data; 
};
