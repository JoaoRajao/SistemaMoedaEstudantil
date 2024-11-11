export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  setor: string;
  email: string;
  empresaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EmpresaCreateInput = Omit<
  Empresa,
  "id" | "createdAt" | "updatedAt"
>;
