import { NextResponse } from "next/server";
import { professoresMock } from "../route"; // Importando o mock de professores

type Params = { params: { id: string } };

// Endpoint para obter um professor específico pelo ID
export async function GET(req: Request, { params }: Params) {
  const professor = professoresMock.find(
    (professor) => professor.id === Number(params.id)
  );

  if (!professor) {
    return NextResponse.json(
      { error: "Professor não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(professor);
}

// Endpoint para editar um professor existente
export async function PUT(req: Request, { params }: Params) {
  const { nome, email } = await req.json();
  const professor = professoresMock.find((p) => p.id === Number(params.id));

  if (!professor) {
    return NextResponse.json(
      { error: "Professor não encontrado" },
      { status: 404 }
    );
  }

  professor.nome = nome;
  professor.email = email;

  return NextResponse.json(professor);
}
