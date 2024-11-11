import { Vantagem } from "./vantagem";

export type CupomStatus = "DISPONIVEL" | "UTILIZADO" | "EXPIRADO";

export interface Cupom {
  id: string;
  codigo: string;
  status: CupomStatus;
  dataResgate: string;
  dataValidade: string;
  alunoId: string;
  vantagemId: string;
  vantagem: Vantagem;
}

export interface CupomCreateInput {
  alunoId: string;
  vantagemId: string;
}
