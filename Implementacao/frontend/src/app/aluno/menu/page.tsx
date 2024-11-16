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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type Transacao = {
  id: number;
  data: string;
  descricao: string;
  quantidade: number;
};

type Vantagem = {
  id: number;
  descricao: string;
  custo: number;
};

const MenuAluno: React.FC = () => {
  const [saldo, setSaldo] = useState<number>(0);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [vantagensDisponiveis, setVantagensDisponiveis] = useState<Vantagem[]>(
    []
  );
  const [transacoesFiltradas, setTransacoesFiltradas] = useState<Transacao[]>(
    []
  );
  const [dataInicio, setDataInicio] = useState<Date | undefined>();
  const [dataFim, setDataFim] = useState<Date | undefined>();
  const [mensagemAlerta, setMensagemAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [saldoRes, transacoesRes, vantagensRes] = await Promise.all([
          fetch("/api/aluno/saldo"),
          fetch("/api/aluno/transacoes"),
          fetch("/api/vantagens"),
        ]);

        if (!saldoRes.ok || !transacoesRes.ok || !vantagensRes.ok) {
          throw new Error("Erro ao carregar os dados.");
        }

        const saldoData = await saldoRes.json();
        const transacoesData = await transacoesRes.json();
        const vantagensData = await vantagensRes.json();

        setSaldo(saldoData.saldo);
        setTransacoes(transacoesData);
        setTransacoesFiltradas(transacoesData);
        setVantagensDisponiveis(vantagensData);
      } catch (error) {
        setTipoAlerta("error");
        setMensagemAlerta("Erro ao carregar os dados do aluno.");
      }
    };

    fetchDados();
  }, []);

  const handleFiltrar = () => {
    const filtradas = transacoes.filter((transacao) => {
      const dataTransacao = new Date(transacao.data);
      return (
        (!dataInicio || dataTransacao >= dataInicio) &&
        (!dataFim || dataTransacao <= dataFim)
      );
    });
    setTransacoesFiltradas(filtradas);
  };

  const handleTroca = async (vantagemId: number) => {
    try {
      const res = await fetch("/api/aluno/trocar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vantagemId }),
      });

      if (!res.ok) throw new Error("Erro ao realizar a troca.");

      const data = await res.json();

      setSaldo(data.novoSaldo);
      setTransacoes(data.transacoesAtualizadas);
      setTransacoesFiltradas(data.transacoesAtualizadas);
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

      {/* Filtros de Data */}
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2" />
              {dataInicio ? format(dataInicio, "PPP") : "Data Início"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dataInicio}
              onSelect={setDataInicio}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2" />
              {dataFim ? format(dataFim, "PPP") : "Data Fim"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dataFim}
              onSelect={setDataFim}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleFiltrar}>Filtrar</Button>
      </div>

      <Separator className="my-4" />

      {/* Tabela de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {transacoesFiltradas.length === 0 ? (
            <Alert variant="default">Nenhuma transação encontrada.</Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacoesFiltradas.map((transacao) => (
                  <TableRow key={transacao.id}>
                    <TableCell>
                      {format(new Date(transacao.data), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{transacao.descricao}</TableCell>
                    <TableCell>
                      {transacao.quantidade > 0
                        ? `+${transacao.quantidade}`
                        : transacao.quantidade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Lista de Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle>Vantagens Disponíveis</CardTitle>
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
              {vantagensDisponiveis.map((vantagem) => (
                <TableRow key={vantagem.id}>
                  <TableCell>{vantagem.descricao}</TableCell>
                  <TableCell>{vantagem.custo}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleTroca(vantagem.id)}>
                      Trocar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alertas */}
      {mensagemAlerta && (
        <Alert variant={tipoAlerta === "error" ? "destructive" : "default"}>
          {mensagemAlerta}
        </Alert>
      )}
    </div>
  );
};

export default MenuAluno;
