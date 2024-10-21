import { NextResponse } from "next/server";
import { empresasMock } from "../route"; // Importando o mock de empresas

type Params = { params: { id: string } };

// Endpoint para obter uma empresa específica pelo ID
export async function GET(req: Request, { params }: Params) {
  const empresa = empresasMock.find(
    (empresa) => empresa.id === Number(params.id)
  );

  if (!empresa) {
    return NextResponse.json(
      { error: "Empresa não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(empresa);
}

// Endpoint para editar uma empresa existente
export async function PUT(req: Request, { params }: Params) {
  const { nomeEmpresa, contato } = await req.json();
  const empresa = empresasMock.find((e) => e.id === Number(params.id));

  if (!empresa) {
    return NextResponse.json(
      { error: "Empresa não encontrada" },
      { status: 404 }
    );
  }

  empresa.nomeEmpresa = nomeEmpresa;
  empresa.contato = contato;

  return NextResponse.json(empresa);
}
