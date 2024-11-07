import { DisciplineInterface } from "../interfaces/disciplineInterface";
import api, { DEBUG_MODE } from "./api";

export const createDiscipline = async (
  disciplineData: Omit<DisciplineInterface, "id">
): Promise<DisciplineInterface> => {
  if (DEBUG_MODE) {
    console.log("Criando disciplina com os dados:", disciplineData);
  }
  const response = await api.post<DisciplineInterface>(
    "/disciplines",
    disciplineData
  );

  if (DEBUG_MODE) {
    console.log("Resposta ao criar disciplina:", response.data);
  }

  return response.data;
};

export const getAllDiscipline = async (): Promise<DisciplineInterface[]> => {
  if (DEBUG_MODE) {
    console.log("Buscando todas as disciplinas...");
  }
  const response = await api.get<DisciplineInterface[]>("/disciplines");

  if (DEBUG_MODE) {
    console.log("Disciplinas recebidas:", response.data);
  }

  return response.data;
};

export const getDiscipline = async (
  id: string
): Promise<DisciplineInterface> => {
  if (DEBUG_MODE) {
    console.log(`Buscando disciplina com ID: ${id}`);
  }
  const response = await api.get<DisciplineInterface>(`/disciplines/${id}`);

  if (DEBUG_MODE) {
    console.log("Disciplina recebida:", response.data);
  }

  return response.data;
};

export const updateDiscipline = async (
  id: string,
  disciplineData: Omit<DisciplineInterface, "id">
): Promise<DisciplineInterface> => {
  if (DEBUG_MODE) {
    console.log(
      `Atualizando disciplina com ID: ${id} com os dados:`,
      disciplineData
    );
  }
  const response = await api.put<DisciplineInterface>(
    `/disciplines/${id}`,
    disciplineData
  );

  if (DEBUG_MODE) {
    console.log("Resposta ao atualizar disciplina:", response.data);
  }

  return response.data;
};

export const getDisciplinesByStudentCpf = async (
  cpf: string
): Promise<DisciplineInterface[]> => {
  if (DEBUG_MODE) {
    console.log(`Buscando disciplinas para o aluno com CPF: ${cpf}`);
  }
  const response = await api.get<DisciplineInterface[]>(
    `/disciplines/student/${cpf}`
  );

  if (DEBUG_MODE) {
    console.log("Disciplinas recebidas para o aluno:", response.data);
  }

  return response.data;
};
