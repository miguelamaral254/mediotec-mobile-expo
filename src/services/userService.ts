import api, { DEBUG_MODE } from "./api";

export const getStudentByCpf = async (cpf: string) => {
  if (DEBUG_MODE) {
    console.log(`Buscando informações do estudante com CPF: ${cpf}`);
  }

  const response = await api.get(`/student/${cpf}`);

  if (DEBUG_MODE) {
    console.log("Dados do estudante recebidos:", response.data);
  }

  return response.data;
};

export const getSchoolClassByStudentCpf = async (cpf: string) => {
  if (DEBUG_MODE) {
    console.log(`Buscando turma do estudante com CPF: ${cpf}`);
  }

  try {
    const response = await api.get(`/student/${cpf}/school-class`);

    if (DEBUG_MODE) {
      console.log("Dados da turma do estudante recebidos:", response.data);
    }

    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar a turma do estudante:", error);
    }
    throw error;
  }
};
