import api from "./api";

// Função para obter a lista de alunos
export const getAlunos = async () => {
  const response = await api.get("/api/alunos"); // URL concatenada corretamente
  return response.data;
};

// Função para adicionar um novo aluno
export const addAluno = async (aluno: {
  nome: string;
  email: string;
  curso: string;
}) => {
  const response = await api.post("/api/alunos", aluno);
  return response.data;
};

// Função para obter os detalhes de um aluno específico
export const getAlunoById = async (id: number) => {
  const response = await api.get(`/api/alunos/${id}`);
  return response.data;
};

// Função para atualizar um aluno existente
export const updateAluno = async (
  id: number,
  aluno: { nome: string; email: string; curso: string }
) => {
  const response = await api.put(`/api/alunos/${id}`, aluno);
  return response.data;
};

// Função para deletar um aluno
export const deleteAluno = async (id: number) => {
  const response = await api.delete(`/api/alunos/${id}`);
  return response.data;
};
