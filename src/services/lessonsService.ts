import { Lesson } from "../interfaces/LessonInterface";
import api, { DEBUG_MODE } from "./api";

export const getLessonById = async (id: number): Promise<Lesson> => {
  if (DEBUG_MODE) {
    console.log(`Buscando lição com ID: ${id}`);
  }

  const response = await api.get<Lesson>(`/lessons/${id}`);

  if (DEBUG_MODE) {
    console.log("Resposta ao buscar lição:", response.data);
  }

  return response.data;
};

export const getAllLessons = async (): Promise<Lesson[]> => {
  if (DEBUG_MODE) {
    console.log("Buscando todas as lições");
  }

  const response = await api.get<Lesson[]>("/lessons");

  if (DEBUG_MODE) {
    console.log("Resposta ao buscar todas as lições:", response.data);
  }

  return response.data;
};

export const updateLesson = async (
  id: number,
  lesson: Lesson
): Promise<Lesson> => {
  if (DEBUG_MODE) {
    console.log(`Atualizando lição com ID: ${id} com os dados:`, lesson);
  }

  const response = await api.put<Lesson>(`/lessons/${id}`, lesson);

  if (DEBUG_MODE) {
    console.log("Resposta ao atualizar lição:", response.data);
  }

  return response.data;
};

export const getLessonsByCpf = async (cpf: string): Promise<Lesson[]> => {
  if (DEBUG_MODE) {
    console.log(`Buscando lições para o estudante com CPF: ${cpf}`);
  }

  const response = await api.get<Lesson[]>(`/student/${cpf}/lessons`);

  if (DEBUG_MODE) {
    console.log("Lições recebidas:", response.data);
  }

  return response.data;
};

export const getLessonsByStudentAndClass = async (
  cpf: string,
  schoolClassId: number
): Promise<Lesson[]> => {
  if (DEBUG_MODE) {
    console.log(`Buscando lições para o estudante com CPF: ${cpf} e turma ID: ${schoolClassId}`);
  }

  const response = await api.get<Lesson[]>(`/lessons/student/${cpf}/class/${schoolClassId}`);

  if (DEBUG_MODE) {
    console.log("Lições recebidas:", response.data);
  }

  return response.data;
};