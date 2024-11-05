import Cookies from "js-cookie";

export const isTokenExpired = (token: string): boolean => {
  // try {
  //   const tokenData = JSON.parse(atob(token.split(".")[1]));
  //   return Date.now() >= tokenData.exp * 1000;
  // } catch (error) {
  //   console.error("Erro ao decodificar o token:", error);
  //   return false;
  // }
  return false;
};

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

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("Sessão inválida.");
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao realizar a operação.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
