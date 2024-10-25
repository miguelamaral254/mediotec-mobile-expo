
export interface LoginRequest {
    cpf: string;
    password: string;
  }
  
  export interface LoginResponse {
    error: boolean;
    message: string;
    token: string;
    role: string; 
  }
  