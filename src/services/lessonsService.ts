import { Lesson } from '../interfaces/LessonInterface';
import api from './api';

export const getLessonById = async (id: number): Promise<Lesson> => {
  const response = await api.get<Lesson>(`/lessons/${id}`);
  return response.data;
};
export const getAllLessons = async (): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>('/lessons');
  return response.data;
};
export const updateLesson = async (id: number, lesson: Lesson): Promise<Lesson> => {
  const response = await api.put<Lesson>(`/lessons/${id}`, lesson);
  return response.data;
};
export const getLessonsByCpf = async (cpf: string): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>(`/student/${cpf}/lessons`);
  return response.data;
};