import api, { DEBUG_MODE } from "./api";
import { CreateGradeInterface } from "../interfaces/createGradeInterface";
import { ResponseGradeInterface } from "../interfaces/responseGradeInterface";

export const saveGrade = async (
  id: number,
  gradeData: Omit<CreateGradeInterface, "id">
): Promise<CreateGradeInterface> => {
  if (DEBUG_MODE) {
    console.log(
      `Salvando nota para avaliação ID: ${id} com os dados:`,
      gradeData
    );
  }

  const response = await api.post<CreateGradeInterface>(
    `/grades/assessment/${id}/grades`,
    gradeData
  );

  if (DEBUG_MODE) {
    console.log("Resposta ao salvar nota:", response.data);
  }

  return response.data;
};

export const createGrades = async (
  CreateGradeInterface: CreateGradeInterface
): Promise<CreateGradeInterface> => {
  if (DEBUG_MODE) {
    console.log("Criando notas com os dados:", CreateGradeInterface);
  }

  const response = await api.post<CreateGradeInterface>(
    "/grades",
    CreateGradeInterface
  );

  if (DEBUG_MODE) {
    console.log("Resposta ao criar notas:", response.data);
  }

  return response.data;
};

// Obtém avaliações de um estudante baseado no CPF e ID da disciplina
export const getAssessmentsByStudentCpf = async (
  cpf: string,
  disciplineId: number
): Promise<ResponseGradeInterface[]> => {
  if (DEBUG_MODE) {
    console.log(
      `Buscando avaliações para o aluno com CPF: ${cpf} e disciplina ID: ${disciplineId}`
    );
  }

  const response = await api.get<ResponseGradeInterface[]>(
    `/grades/student/${cpf}/discipline/${disciplineId}`
  );

  if (DEBUG_MODE) {
    console.log("Avaliações recebidas:", response.data);
  }

  return response.data;
};

export const getAssessmentById = async (
  assessmentId: number
): Promise<ResponseGradeInterface> => {
  if (DEBUG_MODE) {
    console.log(`Buscando avaliação com ID: ${assessmentId}`);
  }

  const response = await api.get<ResponseGradeInterface>(
    `/assessments/${assessmentId}`
  );

  if (DEBUG_MODE) {
    console.log("Avaliação recebida:", response.data);
  }

  return response.data;
};
