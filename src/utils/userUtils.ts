import { UserRole } from "../interfaces/userInterface";

export const translateUserRole = (role?: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrador";
    case UserRole.PROFESSOR:
      return "Professor";
    case UserRole.PARENT:
      return "Responsável";
    case UserRole.STUDENT:
      return "Estudante";
    default:
      return "Não especificado";
  }
};

export const formatPhone = (phone?: string): string => {
  if (!phone) return "Não disponível";

  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
};

export const formatCPF = (cpf?: string): string => {
  if (!cpf) return "Não disponível";

  const cleaned = cpf.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }

  return cpf;
};

export const formatBirthDate = (date?: string): string => {
  if (!date) return "Não disponível";

  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return parsedDate.toLocaleDateString("pt-BR", options);
};
