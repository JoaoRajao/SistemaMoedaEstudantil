import api from "./api";

// Tipos para Empresa
interface Empresa {
  id: number;
  nomeEmpresa: string;
  contato: string;
}

// Função para obter a lista de empresas
export const getEmpresas = async (): Promise<Empresa[]> => {
  const response = await api.get<Empresa[]>("/api/empresas");
  return response.data;
};

// Função para adicionar uma nova empresa
export const addEmpresa = async (
  empresa: Omit<Empresa, "id">
): Promise<Empresa> => {
  const response = await api.post<Empresa>("/api/empresas", empresa);
  return response.data;
};

// Função para obter os detalhes de uma empresa específica
export const getEmpresaById = async (id: number): Promise<Empresa> => {
  const response = await api.get<Empresa>(`/api/empresas/${id}`);
  return response.data;
};

// Função para atualizar uma empresa existente
export const updateEmpresa = async (
  id: number,
  empresa: Omit<Empresa, "id">
): Promise<Empresa> => {
  const response = await api.put<Empresa>(`/api/empresas/${id}`, empresa);
  return response.data;
};

// Função para deletar uma empresa
export const deleteEmpresa = async (id: number): Promise<void> => {
  await api.delete(`/api/empresas/${id}`);
};
