import { NextResponse } from "next/server";

export const empresasMock = [
  { id: 1, nomeEmpresa: "Empresa X", contato: "contato@x.com" },
  { id: 2, nomeEmpresa: "Empresa Y", contato: "contato@y.com" },
];

export async function GET() {
  return NextResponse.json(empresasMock);
}

export async function POST(req: Request) {
  const { nomeEmpresa, contato } = await req.json();
  const novaEmpresa = { id: empresasMock.length + 1, nomeEmpresa, contato };
  empresasMock.push(novaEmpresa);
  return NextResponse.json(novaEmpresa, { status: 201 });
}
