import { ApiResponse } from "@/types/response";
import { fetchWithAuth } from "../http-client";
import { Cupom, CupomCreateInput } from "@/types/cupom";

export const cupomService = {
  listarPorAluno: (alunoId: string) =>
    fetchWithAuth<ApiResponse<Cupom[]>>(`/api/alunos/${alunoId}/cupons`),

  listarPorEmpresa: (empresaId: string) =>
    fetchWithAuth<ApiResponse<Cupom[]>>(`/api/empresas/${empresaId}/cupons`),

  validar: (codigo: string) =>
    fetchWithAuth<ApiResponse<void>>(`/api/cupons/${codigo}/validar`, {
      method: "POST",
    }),

  getById: (id: string) =>
    fetchWithAuth<ApiResponse<Cupom>>(`/api/cupons/${id}`),

  getByCodigo: (codigo: string) =>
    fetchWithAuth<ApiResponse<Cupom>>(`/api/cupons/codigo/${codigo}`),
};
