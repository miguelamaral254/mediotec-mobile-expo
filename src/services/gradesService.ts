import api from './api';
import { CreateGradeInterface } from '../interfaces/createGradeInterface';
import { ResponseGradeInterface } from '../interfaces/responseGradeInterface';


export const saveGrade = async (id: number, gradeData: Omit<CreateGradeInterface, 'id'>): Promise<CreateGradeInterface> => {
  const response = await api.post<CreateGradeInterface>(`/grades/assessment/${id}/grades`, gradeData);
  return response.data;
};

export const createGrades = async (CreateGradeInterface: CreateGradeInterface): Promise<CreateGradeInterface> => {
  const response = await api.post<CreateGradeInterface>('/grades', CreateGradeInterface);
  return response.data;
};

export const getAssessmentsByStudentCpf = async (cpf: string, disciplineId: number): Promise<ResponseGradeInterface[]> => {
  const response = await api.get<ResponseGradeInterface[]>(`/grades/student/${cpf}/discipline/${disciplineId}`);
  return response.data;
};

export const getAssessmentById = async (assessmentId: number): Promise<ResponseGradeInterface> => {
  const response = await api.get<ResponseGradeInterface>(`/assessments/${assessmentId}`);
  return response.data;
};
