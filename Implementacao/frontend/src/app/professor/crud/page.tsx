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
import ProfessorForm from "@/components/ProfessorForm";

type Professor = {
  id: number;
  nome: string;
  cpf: string;
  departamento: string;
  instituicaoId: number;
};

const ProfessoresCRUD: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await fetch("/api/professor/todos");
        if (!response.ok) throw new Error("Erro ao buscar professores.");
        const data = await response.json();
        setProfessores(data);
      } catch (error) {
        setAlertMessage(
          error instanceof Error ? error.message : "Erro desconhecido."
        );
        setAlertType("error");
      }
    };

    fetchProfessores();
  }, []);

  const handleAddEditProfessor = async (
    professorData: Omit<Professor, "id">
  ) => {
    try {
      const response = selectedProfessor
        ? await fetch(`/api/professor/${selectedProfessor.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professorData),
          })
        : await fetch("/api/professor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professorData),
          });

      if (!response.ok) throw new Error("Erro ao salvar o professor.");

      const data = await response.json();
      setProfessores((prev) =>
        selectedProfessor
          ? prev.map((prof) =>
              prof.id === selectedProfessor.id ? { ...prof, ...data } : prof
            )
          : [...prev, data]
      );

      setAlertMessage(
        selectedProfessor
          ? "Professor atualizado com sucesso!"
          : "Professor cadastrado com sucesso!"
      );
      setAlertType("success");
      setIsDialogOpen(false);
    } catch (error) {
      setAlertMessage(
        error instanceof Error ? error.message : "Erro ao salvar professor."
      );
      setAlertType("error");
    }
  };

  const handleDeleteProfessor = async (id: number) => {
    try {
      const response = await fetch(`/api/professor/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir professor.");

      setProfessores((prev) => prev.filter((prof) => prof.id !== id));
      setAlertMessage("Professor excluído com sucesso.");
      setAlertType("success");
    } catch (error) {
      setAlertMessage(
        error instanceof Error ? error.message : "Erro ao excluir professor."
      );
      setAlertType("error");
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
          <CardTitle>Lista de Professores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedProfessor(null)}>
                  Adicionar Professor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedProfessor
                      ? "Editar Professor"
                      : "Adicionar Professor"}
                  </DialogTitle>
                </DialogHeader>
                <ProfessorForm
                  professor={selectedProfessor}
                  onSubmit={handleAddEditProfessor}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professores.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>{professor.nome}</TableCell>
                  <TableCell>{professor.cpf}</TableCell>
                  <TableCell>{professor.departamento}</TableCell>
                  <TableCell>{professor.instituicaoId}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedProfessor(professor);
                        setIsDialogOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteProfessor(professor.id)}
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

export default ProfessoresCRUD;
