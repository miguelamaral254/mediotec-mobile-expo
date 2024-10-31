import api from './api';

export const getStudentByCpf = async (cpf: string) => {
  const response = await api.get(`/student/${cpf}`);
  return response.data;
};
