export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type UserRole = "ALUNO" | "PROFESSOR" | "EMPRESA";
