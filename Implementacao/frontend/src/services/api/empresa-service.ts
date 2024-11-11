import { ApiResponse } from "@/types/response";
import { fetchWithAuth } from "../http-client";
import { Empresa, EmpresaCreateInput } from "@/types/empresa";
import { Vantagem } from "@/types/vantagem";
import { Transaction } from "@/types/transaction";

export const empresaService = {
  cadastrar: (data: EmpresaCreateInput) =>
    fetchWithAuth<ApiResponse<Empresa>>("/api/empresas/cadastrar", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: Partial<EmpresaCreateInput>) =>
    fetchWithAuth<ApiResponse<Empresa>>(`/api/empresas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  listar: () => fetchWithAuth<ApiResponse<Empresa[]>>("/api/empresas"),

  getById: (id: string) =>
    fetchWithAuth<ApiResponse<Empresa>>(`/api/empresas/${id}`),

  getVantagens: (id: string) =>
    fetchWithAuth<ApiResponse<Vantagem[]>>(`/api/empresas/${id}/vantagens`),

  getTransacoes: (id: string) =>
    fetchWithAuth<ApiResponse<Transaction[]>>(`/api/empresas/${id}/transacoes`),
};
