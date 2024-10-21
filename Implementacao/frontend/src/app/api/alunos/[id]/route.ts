import { NextResponse } from "next/server";
import { alunosMock } from "../route";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  return NextResponse.json(alunosMock.find((aluno) => aluno.id === +params.id));
}
