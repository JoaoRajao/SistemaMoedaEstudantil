// src/services/empresasService.ts
import api from "./api";

// Função para obter a lista de empresas
export const getEmpresas = async () => {
  const response = await api.get<
    {
      id: number;
      nome: string;
      contato: string;
    }[]
  >("/api/empresas");
  return response.data;
};

// Função para adicionar uma nova empresa
export const addEmpresa = async (empresa: {
  nomeEmpresa: string;
  contato: string;
}) => {
  const response = await api.post("/api/empresas", empresa);
  return response.data;
};

// Função para obter os detalhes de uma empresa específica
export const getEmpresaById = async (id: number) => {
  const response = await api.get(`/api/empresas/${id}`);
  return response.data;
};

// Função para atualizar uma empresa existente
export const updateEmpresa = async (
  id: number,
  empresa: { nomeEmpresa: string; contato: string }
) => {
  const response = await api.put(`/api/empresas/${id}`, empresa);
  return response.data;
};

// Função para deletar uma empresa
export const deleteEmpresa = async (id: number) => {
  const response = await api.delete(`/api/empresas/${id}`);
  return response.data;
};
