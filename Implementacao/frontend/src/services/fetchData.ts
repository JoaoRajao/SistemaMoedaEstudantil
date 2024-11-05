// src/services/fetchData.ts
import Cookies from "js-cookie";
import { isTokenExpired } from "./apiService";

export const fetchData = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = Cookies.get("token");

  if (!token || isTokenExpired(token)) {
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  console.log("URL da requisição:", `${process.env.NEXT_PUBLIC_API_URL}${url}`);
  console.log("Headers da requisição:", headers);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Tente obter o JSON de erro, mas tenha um fallback para respostas não-JSON
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `Erro ${response.status}: ${response.statusText}`;

      console.error("Erro na resposta da API:", errorMessage, errorData);

      if (response.status === 401) throw new Error("Sessão inválida.");
      throw new Error(errorMessage || "Erro ao realizar a operação.");
    }

    console.log("Resposta bem-sucedida:", response);
    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
