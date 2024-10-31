import { UserRole } from "./userInterface";

export interface Student {
    cpf: string;
    name: string;
    email: string;
    role?: UserRole; 
    active: boolean;
    birthDate?: string;
    phone?: string;
    registration?: string;
    address?: string; 
  }