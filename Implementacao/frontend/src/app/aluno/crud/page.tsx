"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Aluno = {
  id: string;
  nome: string;
  email: string;
  documento: string;
  endereco: string;
  instituicaoEnsino: string;
  curso: string;
  saldoMoedas: number;
};

const AlunoCRUD: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch("http://localhost:5004/api/Aluno/todos");
        if (!response.ok) {
          throw new Error("Erro ao carregar a lista de alunos.");
        }
        const data: Aluno[] = await response.json();
        setAlunos(data);
      } catch (error) {
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      }
    };

    fetchAlunos();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {!error && alunos.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Saldo (Moedas)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alunos.map((aluno) => (
                  <TableRow key={aluno.id}>
                    <TableCell>{aluno.nome}</TableCell>
                    <TableCell>{aluno.email}</TableCell>
                    <TableCell>{aluno.documento}</TableCell>
                    <TableCell>{aluno.instituicaoEnsino}</TableCell>
                    <TableCell>{aluno.curso}</TableCell>
                    <TableCell>{aluno.saldoMoedas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">Nenhum aluno encontrado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlunoCRUD;
