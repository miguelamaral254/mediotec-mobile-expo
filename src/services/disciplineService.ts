import { DisciplineInterface } from '../interfaces/disciplineInterface';
import api from './api';


export const createDiscipline = async (disciplineData: Omit<DisciplineInterface, 'id'>): Promise<DisciplineInterface> => {
  const response = await api.post<DisciplineInterface>('/disciplines', disciplineData);
  return response.data;
};

export const getAllDiscipline = async (): Promise<DisciplineInterface[]> => {
  const response = await api.get<DisciplineInterface[]>('/disciplines');
  return response.data;
};

export const getDiscipline = async (id: string): Promise<DisciplineInterface> => {
  const response = await api.get<DisciplineInterface>(`/disciplines/${id}`);
  return response.data;
};

export const updateDiscipline = async (id: string, disciplineData: Omit<DisciplineInterface, 'id'>): Promise<DisciplineInterface> => {
  const response = await api.put<DisciplineInterface>(`/disciplines/${id}`, disciplineData);
  return response.data;
};
