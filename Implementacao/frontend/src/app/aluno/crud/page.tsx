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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import AlunoForm from "@/components/AlunoForm";

type Aluno = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg?: string;
  endereco?: string;
  instituicao?: string;
  curso?: string;
};

const AlunoCRUD: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch("/api/alunos");
        const data = await response.json();
        setAlunos(data);
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Erro ao carregar a lista de alunos.");
      }
    };

    fetchAlunos();
  }, []);

  const handleAddEditAluno = async (alunoData: Omit<Aluno, "id">) => {
    if (selectedAluno) {
      try {
        const response = await fetch(`/api/alunos/${selectedAluno.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alunoData),
        });
        if (response.ok) {
          setAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
              aluno.id === selectedAluno.id ? { ...aluno, ...alunoData } : aluno
            )
          );
          setAlertType("success");
          setAlertMessage("Aluno atualizado com sucesso!");
        } else {
          throw new Error("Erro ao atualizar o aluno.");
        }
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Erro ao atualizar o aluno.");
      }
    } else {
      try {
        const response = await fetch("/api/alunos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alunoData),
        });
        if (response.ok) {
          const newAluno = await response.json();
          setAlunos((prevAlunos) => [...prevAlunos, newAluno]);
          setAlertType("success");
          setAlertMessage("Aluno cadastrado com sucesso!");
        } else {
          throw new Error("Erro ao cadastrar o aluno.");
        }
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Erro ao cadastrar o aluno.");
      }
    }
    setIsDialogOpen(false);
  };

  const handleDeleteAlunoAction = async (id: number) => {
    try {
      const response = await fetch(`/api/alunos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAlunos((prevAlunos) =>
          prevAlunos.filter((aluno) => aluno.id !== id)
        );
        setAlertType("success");
        setAlertMessage("Aluno excluído com sucesso.");
      } else {
        throw new Error("Erro ao excluir o aluno.");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Erro ao excluir o aluno.");
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setSelectedAluno(null);
                    setIsDialogOpen(true);
                  }}
                >
                  Adicionar Aluno
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedAluno ? "Editar Aluno" : "Adicionar Novo Aluno"}
                  </DialogTitle>
                </DialogHeader>
                <AlunoForm
                  aluno={selectedAluno}
                  onSubmit={handleAddEditAluno}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell>{aluno.cpf}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAluno(aluno);
                        setIsDialogOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteAlunoAction(aluno.id)}
                      className="ml-2"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {alertMessage && (
        <Alert variant={alertType === "error" ? "destructive" : "default"}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default AlunoCRUD;
