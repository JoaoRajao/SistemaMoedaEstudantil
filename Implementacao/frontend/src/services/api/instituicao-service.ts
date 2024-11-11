import { fetchWithAuth } from "../http-client";
import { Instituicao } from "@/types/instituicao";

export const instituicaoService = {
  listar: () => fetchWithAuth<Instituicao[]>("/api/instituicoes"),

  getById: (id: string) =>
    fetchWithAuth<Instituicao>(`/api/instituicoes/${id}`),

  cadastrar: (data: Omit<Instituicao, "id" | "createdAt" | "updatedAt">) =>
    fetchWithAuth<Instituicao>("/api/instituicoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: Partial<Instituicao>) =>
    fetchWithAuth<Instituicao>(`/api/instituicoes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deletar: (id: string) =>
    fetchWithAuth(`/api/instituicoes/${id}`, {
      method: "DELETE",
    }),

  getProfessores: (id: string) =>
    fetchWithAuth(`/api/instituicoes/${id}/professores`),

  getAlunos: (id: string) => fetchWithAuth(`/api/instituicoes/${id}/alunos`),
};
