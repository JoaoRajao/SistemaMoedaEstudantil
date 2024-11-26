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
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

type Vantagem = {
  id: string;
  nome: string;
  descricao: string;
  custo: number;
};

type Empresa = {
  id: string;
  nome: string;
  vantagensOferecidas: Vantagem[];
};

const MenuTroca: React.FC = () => {
  const [saldo, setSaldo] = useState<number>(0);
  const [alunoId, setAlunoId] = useState<string | null>(null);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [mensagemAlerta, setMensagemAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [alunoRes, empresasRes] = await Promise.all([
          fetch("http://localhost:5004/api/Aluno/todos"),
          fetch("http://localhost:5004/api/Empresa/todas"),
        ]);

        if (!alunoRes.ok || !empresasRes.ok) {
          throw new Error("Erro ao carregar os dados.");
        }

        const alunos = await alunoRes.json();
        const empresasData = await empresasRes.json();

        if (alunos.length === 0) {
          throw new Error("Nenhum aluno encontrado.");
        }

        // Pegando o primeiro aluno
        const primeiroAluno = alunos[0];
        setAlunoId(primeiroAluno.id);
        setSaldo(primeiroAluno.saldoMoedas);
        setEmpresas(empresasData);
      } catch (error) {
        setTipoAlerta("error");
        setMensagemAlerta("Erro ao carregar os dados. Tente novamente.");
      }
    };

    fetchDados();
  }, []);

  const handleTroca = async (vantagemId: string) => {
    if (!alunoId) {
      setTipoAlerta("error");
      setMensagemAlerta("Aluno não encontrado.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5004/api/Transacao/trocar-moedas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vantagemId, alunoId }),
      });

      if (!res.ok) throw new Error("Erro ao realizar a troca.");

      const data = await res.json();

      setSaldo(data.novoSaldo);
      setTipoAlerta("success");
      setMensagemAlerta("Troca realizada com sucesso!");
    } catch (error) {
      setTipoAlerta("error");
      setMensagemAlerta(
        error instanceof Error ? error.message : "Erro desconhecido."
      );
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Card de Saldo Atual */}
      <Card>
        <CardHeader>
          <CardTitle>Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{saldo} Moedas</p>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Lista de Vantagens por Empresa */}
      {empresas.map((empresa) => (
        <Card key={empresa.id} className="mb-6">
          <CardHeader>
            <CardTitle>{empresa.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Custo (Moedas)</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empresa.vantagensOferecidas.map((vantagem) => (
                  <TableRow key={vantagem.id}>
                    <TableCell>{vantagem.descricao}</TableCell>
                    <TableCell>{vantagem.custo}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleTroca(vantagem.id)}
                        disabled={saldo < vantagem.custo}
                        variant={saldo < vantagem.custo ? "outline" : "default"}
                      >
                        {saldo < vantagem.custo ? "Saldo Insuficiente" : "Trocar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Alertas */}
      {mensagemAlerta && (
        <Alert variant={tipoAlerta === "error" ? "destructive" : "default"}>
          {mensagemAlerta}
        </Alert>
      )}
    </div>
  );
};

export default MenuTroca;
