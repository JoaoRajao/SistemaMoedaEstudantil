import { fetchData } from "./apiService";
import Cookies from "js-cookie";

// Função de login para autenticar o usuário e obter o token
export async function login(email: string, password: string) {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
}

// Função de logout para remover o token armazenado
export function logout() {
  Cookies.remove("token"); // Remove o token do cookie
}
