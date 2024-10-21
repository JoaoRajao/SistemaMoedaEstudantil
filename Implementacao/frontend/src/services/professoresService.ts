import api from "./api";

// Tipos para Professor
interface Professor {
  id: number;
  nome: string;
  email: string;
}

// Função para obter a lista de professores
export const getProfessores = async (): Promise<Professor[]> => {
  const response = await api.get<Professor[]>("/api/professores");
  return response.data;
};

// Função para adicionar um novo professor
export const addProfessor = async (
  professor: Omit<Professor, "id">
): Promise<Professor> => {
  const response = await api.post<Professor>("/api/professores", professor);
  return response.data;
};

// Função para obter os detalhes de um professor específico
export const getProfessorById = async (
  id: number
): Promise<Professor | null> => {
  try {
    const response = await api.get<Professor>(`/api/professores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar professor com id ${id}:`, error);
    return null;
  }
};

// Função para atualizar um professor
export const updateProfessor = async (
  id: number,
  professor: Omit<Professor, "id">
): Promise<Professor> => {
  const response = await api.put<Professor>(
    `/api/professores/${id}`,
    professor
  );
  return response.data;
};

// Função para deletar um professor
export const deleteProfessor = async (id: number): Promise<void> => {
  await api.delete(`/api/professores/${id}`);
};
