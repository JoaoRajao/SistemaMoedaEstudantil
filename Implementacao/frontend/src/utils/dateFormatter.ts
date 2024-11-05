// src/utils/dateFormatter.ts
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Data inválida");
    return date.toLocaleDateString("pt-BR");
  } catch {
    return "Data inválida";
  }
};
