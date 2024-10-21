import api from "./api";

// Tipos para Aluno
export interface Aluno {
  id: number;
  nome: string;
  email: string;
  curso: string;
}

// Função para obter a lista de alunos
export const getAlunos = async (): Promise<Aluno[]> => {
  try {
    const response = await api.get<Aluno[]>("/api/alunos");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter alunos:", error);
    throw new Error("Falha ao buscar a lista de alunos.");
  }
};

// Função para adicionar um novo aluno
export const addAluno = async (aluno: Omit<Aluno, "id">): Promise<Aluno> => {
  try {
    const response = await api.post<Aluno>("/api/alunos", aluno);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar aluno:", error);
    throw new Error("Falha ao adicionar um novo aluno.");
  }
};

// Função para obter os detalhes de um aluno específico
export const getAlunoById = async (id: number): Promise<Aluno | null> => {
  try {
    const response = await api.get<Aluno>(`/api/alunos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar aluno com id ${id}:`, error);
    return null;
  }
};

// Função para atualizar um aluno existente
export const updateAluno = async (
  id: number,
  aluno: Omit<Aluno, "id">
): Promise<Aluno> => {
  try {
    const response = await api.put<Aluno>(`/api/alunos/${id}`, aluno);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar aluno com id ${id}:`, error);
    throw new Error("Falha ao atualizar o aluno.");
  }
};

// Função para excluir um aluno
export const deleteAluno = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/alunos/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar aluno com id ${id}:`, error);
    throw new Error("Falha ao deletar o aluno.");
  }
};
