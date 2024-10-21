// src/services/authService.ts
import api from "./api";

// Função de login que autentica o usuário e salva o token JWT
export const login = async (email: string, senha: string) => {
  const response = await api.post("/api/auth", { email, senha });
  if (response.data.token) {
    return {
      user: response.data.user,
      token: response.data.token,
    };
  } else {
    throw new Error("Falha na autenticação");
  }
};

// Função para logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Verifica se o usuário está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
