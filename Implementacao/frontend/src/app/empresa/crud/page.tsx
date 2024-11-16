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
import EmpresaForm from "@/components/EmpresaForm";

type Empresa = {
  id: number;
  nome: string;
  contato: string;
  email: string;
};

const EmpresaCRUD: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("/api/empresas");
        if (response.ok) {
          const data = await response.json();
          setEmpresas(data);
        } else {
          throw new Error("Erro ao carregar empresas.");
        }
      } catch {
        setAlertType("error");
        setAlertMessage("Erro ao carregar empresas.");
      }
    };

    fetchEmpresas();
  }, []);

  const handleSaveEmpresa = async (empresaData: Omit<Empresa, "id">) => {
    try {
      const response = selectedEmpresa
        ? await fetch(`/api/empresas/${selectedEmpresa.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empresaData),
          })
        : await fetch("/api/empresas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empresaData),
          });

      if (response.ok) {
        const updatedEmpresa = await response.json();
        setEmpresas((prev) =>
          selectedEmpresa
            ? prev.map((empresa) =>
                empresa.id === updatedEmpresa.id ? updatedEmpresa : empresa
              )
            : [...prev, updatedEmpresa]
        );
        setAlertType("success");
        setAlertMessage(
          selectedEmpresa
            ? "Empresa atualizada com sucesso!"
            : "Empresa cadastrada com sucesso!"
        );
        setIsDialogOpen(false);
      } else {
        throw new Error("Erro ao salvar empresa.");
      }
    } catch {
      setAlertType("error");
      setAlertMessage("Erro ao salvar empresa.");
    }
  };

  const handleDeleteEmpresa = async (id: number) => {
    try {
      const response = await fetch(`/api/empresas/${id}`, { method: "DELETE" });
      if (response.ok) {
        setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
        setAlertType("success");
        setAlertMessage("Empresa excluída com sucesso!");
      } else {
        throw new Error("Erro ao excluir empresa.");
      }
    } catch {
      setAlertType("error");
      setAlertMessage("Erro ao excluir empresa.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas Parceiras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedEmpresa(null)}>
                  Adicionar Empresa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedEmpresa
                      ? "Editar Empresa Parceira"
                      : "Adicionar Empresa Parceira"}
                  </DialogTitle>
                </DialogHeader>
                <EmpresaForm
                  onSubmit={handleSaveEmpresa}
                  empresa={selectedEmpresa}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.nome}</TableCell>
                  <TableCell>{empresa.contato}</TableCell>
                  <TableCell>{empresa.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedEmpresa(empresa);
                        setIsDialogOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEmpresa(empresa.id)}
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

export default EmpresaCRUD;
