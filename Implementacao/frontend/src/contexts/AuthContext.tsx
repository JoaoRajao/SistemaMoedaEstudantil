"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import {
  loginService,
  logoutService,
  isTokenExpired,
} from "../services/http-client";

interface User {
  empresaId(empresaId: any): unknown;
  id(
    id: any,
    data: { alunoId: string; valor: number; motivo: string }
  ): unknown;
  role: string; // Adicionando a propriedade 'role' obrigatória
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isTokenValid: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  let logoutTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setUser(parseUserFromToken(storedToken));
    } else {
      logout();
    }
  }, []);

  const parseUserFromToken = (token: string): User | null => {
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      return {
        id: tokenData.id,
        name: tokenData.name,
        email: tokenData.email,
        role: tokenData.role,
        empresaId: tokenData.empresaId,
      };
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const newToken = await loginService(email, password);
      if (newToken) {
        Cookies.set("token", newToken);
        setToken(newToken);
        setUser(parseUserFromToken(newToken));
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    logoutService();
    Cookies.remove("token");
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  const isTokenValid = () => {
    if (!token) return false;
    return !isTokenExpired(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isTokenValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
