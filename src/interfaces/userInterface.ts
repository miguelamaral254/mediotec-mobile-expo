export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
}

export interface User {
  parentCPF: string;
  cpf: string;
  name: string;
  email: string;
  role?: UserRole; 
  active: boolean;
  birthDate?: string;
  phone?: string;
  registration?: string;
  address?: string;
  studentCPF?: string; 
  expertiseArea?: string; 
  academicTitle?: string;  
}
