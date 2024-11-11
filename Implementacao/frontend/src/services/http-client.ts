import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7065/api";

export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;
    return Date.now() >= expirationTime;
  } catch {
    return true;
  }
};

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const fetchWithAuth = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.message || "Erro na requisição",
        data: null,
      };
    }

    return {
      success: true,
      data: responseData as T,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const loginService = async (
  email: string,
  password: string
): Promise<string | null> => {
  const response = await fetchWithAuth<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.success && response.data) {
    return response.data.token;
  }

  console.error("Erro no login:", response.error);
  return null;
};

export const logoutService = async () => {
  await fetchWithAuth("/api/auth/logout", {
    method: "POST",
  });
  Cookies.remove("token");
};
