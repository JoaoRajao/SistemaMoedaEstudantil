import { ApiResponse } from "@/types/response";
import { fetchWithAuth } from "../http-client";
import { Vantagem, VantagemCreateInput } from "@/types/vantagem";

export const vantagemService = {
  cadastrar: (data: VantagemCreateInput) =>
    fetchWithAuth<ApiResponse<Vantagem>>("/api/vantagens", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: Partial<VantagemCreateInput>) =>
    fetchWithAuth<ApiResponse<Vantagem>>(`/api/vantagens/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  listarPorEmpresa: (empresaId: string) =>
    fetchWithAuth<ApiResponse<Vantagem[]>>(
      `/api/empresas/${empresaId}/vantagens`
    ),

  getById: (id: string) =>
    fetchWithAuth<ApiResponse<Vantagem>>(`/api/vantagens/${id}`),
};
