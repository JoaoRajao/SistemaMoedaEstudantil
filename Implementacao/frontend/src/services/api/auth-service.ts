import { fetchWithAuth } from "../http-client";
import { AuthCredentials, AuthResponse } from "@/types/auth";

export const authService = {
  login: (credentials: AuthCredentials) =>
    fetchWithAuth<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchWithAuth("/api/auth/logout", {
      method: "POST",
    }),

  register: (data: AuthCredentials & { role: string }) =>
    fetchWithAuth<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
