import { NextResponse } from "next/server";

export const empresasMock = [
  { id: 1, nomeEmpresa: "Empresa X", contato: "contato@x.com" },
  { id: 2, nomeEmpresa: "Empresa Y", contato: "contato@y.com" },
];

// Função para gerar IDs únicos
let nextEmpresaId = empresasMock.length
  ? empresasMock[empresasMock.length - 1].id + 1
  : 1;

// Endpoint para obter todas as empresas
export async function GET() {
  return NextResponse.json(empresasMock);
}

// Endpoint para adicionar uma nova empresa
export async function POST(req: Request) {
  const { nomeEmpresa, contato } = await req.json();
  const novaEmpresa = { id: nextEmpresaId++, nomeEmpresa, contato }; // Gera um novo ID único
  empresasMock.push(novaEmpresa);
  return NextResponse.json(novaEmpresa, { status: 201 });
}
