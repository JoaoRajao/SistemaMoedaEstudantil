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
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";

type Transacao = {
  id: number;
  date: string;
  aluno: string;
  description: string;
  amount: number;
};

const ConsultaSaldoExtratoProfessor: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transacao[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transacao[]>(
    []
  );
  const [alunos, setAlunos] = useState<string[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<string | undefined>(
    "Todos"
  );
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [moedas, setMoedas] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [saldoRes, transacoesRes, alunosRes] = await Promise.all([
          fetch("/api/professor/saldo"),
          fetch("/api/professor/transacoes"),
          fetch("/api/aluno/todos"),
        ]);

        const saldoData = await saldoRes.json();
        const transacoesData = await transacoesRes.json();
        const alunosData = await alunosRes.json();

        setBalance(saldoData.saldo);
        setTransactions(transacoesData);
        setFilteredTransactions(transacoesData);
        setAlunos(["Todos", ...alunosData.map((aluno: any) => aluno.nome)]);
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Erro ao carregar dados.");
      }
    };

    fetchDados();
  }, []);

  const handleFilter = () => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        (!startDate || transactionDate >= startDate) &&
        (!endDate || transactionDate <= endDate) &&
        (selectedAluno === "Todos" || transaction.aluno === selectedAluno)
      );
    });
    setFilteredTransactions(filtered);
  };

  const handleSendMoedas = async () => {
    const parsedMoedas = parseInt(moedas, 10);

    if (!selectedAluno || selectedAluno === "Todos") {
      setAlertType("error");
      setAlertMessage("Por favor, selecione um aluno.");
      return;
    }

    if (!parsedMoedas || parsedMoedas <= 0) {
      setAlertType("error");
      setAlertMessage("Insira uma quantidade válida de moedas.");
      return;
    }

    try {
      const response = await fetch("/api/professor/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aluno: selectedAluno,
          quantidade: parsedMoedas,
          mensagem,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBalance(result.novoSaldo);
        setTransactions(result.transacoesAtualizadas);
        setFilteredTransactions(result.transacoesAtualizadas);
        setAlertType("success");
        setAlertMessage("Moedas enviadas com sucesso!");
      } else {
        throw new Error(result.message || "Erro ao enviar moedas.");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(
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
          <p className="text-2xl font-bold">{balance} Moedas</p>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Distribuição de Moedas */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuir Moedas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            onValueChange={(value) => setSelectedAluno(value)}
            value={selectedAluno}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o Aluno" />
            </SelectTrigger>
            <SelectContent>
              {alunos.map((aluno) => (
                <SelectItem key={aluno} value={aluno}>
                  {aluno}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Quantidade de Moedas"
            value={moedas}
            onChange={(e) => setMoedas(e.target.value)}
          />

          <Textarea
            placeholder="Mensagem de Reconhecimento (Opcional)"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />

          <Button onClick={handleSendMoedas} className="w-full">
            Enviar Moedas
          </Button>
        </CardContent>
      </Card>

      {alertMessage && (
        <Alert variant={alertType === "error" ? "destructive" : "default"}>
          {alertMessage}
        </Alert>
      )}

      <Separator className="my-4" />

      {/* Filtros de Data e Aluno */}
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2" />
              {startDate ? format(startDate, "PPP") : "Data Início"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
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
              {endDate ? format(endDate, "PPP") : "Data Fim"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleFilter}>Filtrar</Button>
      </div>

      <Separator className="my-4" />

      {/* Tabela de Transações */}
      {filteredTransactions.length === 0 ? (
        <Alert variant="default">
          Nenhuma transação encontrada para os filtros selecionados.
        </Alert>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{transaction.aluno}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {transaction.amount > 0
                    ? `+${transaction.amount}`
                    : transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ConsultaSaldoExtratoProfessor;
