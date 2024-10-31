import { Student } from "./studentInterface";

export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
}

export interface User {
  cpf: string;
  name: string;
  email: string;
  role?: UserRole;
  active: boolean;
  birthDate?: string;
  phone?: string;
  address?: string;
  studentCPFs?: string[];
  registration?: string;
  expertiseArea?: string;
  academicTitle?: string;
  students?: Student[]; // Add this line
}