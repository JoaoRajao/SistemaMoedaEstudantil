import { NextResponse } from "next/server";
import { empresasMock } from "../route";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  return NextResponse.json(
    empresasMock.find((empresa) => empresa.id === +params.id)
  );
}
