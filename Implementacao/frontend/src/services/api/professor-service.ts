import { fetchWithAuth } from "../http-client";
import { Professor, ProfessorCreateInput } from "@/types/professor";
import { ApiResponse } from "@/types/response";
import { Transaction } from "@/types/transaction";

export const professorService = {
  cadastrar: (data: ProfessorCreateInput) =>
    fetchWithAuth<Professor>("/api/professores/cadastrar", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getExtrato: (id: string) =>
    fetchWithAuth<Transaction[]>(`/api/professores/${id}/extrato`),

  listarProfessores: () =>
    fetchWithAuth<ApiResponse<Professor[]>>("/api/professores"),

  getProfessor: (id: string) =>
    fetchWithAuth<ApiResponse<Professor>>(`/api/professores/${id}`),

  distribuirMoedas: (
    id: string,
    data: { alunoId: string; valor: number; motivo: string }
  ) =>
    fetchWithAuth<ApiResponse<void>>(`/api/professores/${id}/distribuirMoeda`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
