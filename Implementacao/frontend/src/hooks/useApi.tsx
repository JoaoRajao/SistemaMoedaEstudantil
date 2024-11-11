import { useState } from "react";
import { fetchWithAuth } from "../services/http-client";
import { useAuth } from "./useAuth";

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchApi = async (options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(endpoint, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data as T);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchApi, setData };
}
