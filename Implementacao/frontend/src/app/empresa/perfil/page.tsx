"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Tipos definidos
type EmpresaParceira = {
  id: number;
  nomeEmpresa: string;
  dadosContato: string;
};

type Vantagem = {
  id: number;
  descricao: string;
  fotoProduto: string; // URL da imagem
  custoMoedas: number;
  empresaId: number; // Foreign Key para EmpresaParceira
};

const PerfilEmpresa: React.FC = () => {
  const [empresa, setEmpresa] = useState<EmpresaParceira>({
    id: 0,
    nomeEmpresa: "",
    dadosContato: "",
  });

  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Vantagem, "id" | "empresaId">>({
    descricao: "",
    fotoProduto: "",
    custoMoedas: 0,
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"default" | "destructive" | null>(
    null
  );

  // Fetch inicial para dados da empresa e vantagens
  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await fetch(`/api/empresa/perfil`);
        if (response.ok) {
          const data: EmpresaParceira = await response.json();
          setEmpresa(data);
        } else {
          throw new Error("Erro ao carregar dados da empresa.");
        }
      } catch (error: any) {
        setAlertMessage(error.message || "Erro desconhecido.");
        setAlertType("destructive");
      }
    };

    const fetchVantagens = async () => {
      try {
        const response = await fetch(`/api/empresa/vantagens`);
        if (response.ok) {
          const data: Vantagem[] = await response.json();
          setVantagens(data);
        } else {
          throw new Error("Erro ao carregar vantagens.");
        }
      } catch (error: any) {
        setAlertMessage(error.message || "Erro desconhecido.");
        setAlertType("destructive");
      }
    };

    fetchEmpresa();
    fetchVantagens();
  }, []);

  // Gerenciamento de perfil
  const handleProfileSave = async () => {
    try {
      const response = await fetch(`/api/empresa/perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeEmpresa: empresa.nomeEmpresa,
          dadosContato: empresa.dadosContato,
        }),
      });

      if (response.ok) {
        setAlertMessage("Perfil atualizado com sucesso!");
        setAlertType("default");
        setIsEditing(false);
      } else {
        throw new Error("Erro ao atualizar dados.");
      }
    } catch (error: any) {
      setAlertMessage(error.message || "Erro desconhecido.");
      setAlertType("destructive");
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  // Gerenciamento de vantagens
  const handleVantagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVantagem = async () => {
    const { descricao, fotoProduto, custoMoedas } = formData;

    if (!descricao || !fotoProduto || !custoMoedas) {
      setAlertMessage("Preencha todos os campos da vantagem.");
      setAlertType("destructive");
      return;
    }

    try {
      const response = await fetch(`/api/empresa/vantagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          empresaId: empresa.id,
        }),
      });

      if (response.ok) {
        const novaVantagem = await response.json();
        setVantagens((prev) => [...prev, novaVantagem]);
        setFormData({ descricao: "", fotoProduto: "", custoMoedas: 0 });
        setAlertMessage("Vantagem adicionada com sucesso!");
        setAlertType("default");
        setIsDialogOpen(false);
      } else {
        throw new Error("Erro ao adicionar vantagem.");
      }
    } catch (error: any) {
      setAlertMessage(error.message || "Erro desconhecido.");
      setAlertType("destructive");
    }
  };

  const handleDeleteVantagem = async (id: number) => {
    try {
      const response = await fetch(`/api/empresa/vantagens/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVantagens((prev) => prev.filter((vantagem) => vantagem.id !== id));
        setAlertMessage("Vantagem removida com sucesso!");
        setAlertType("default");
      } else {
        throw new Error("Erro ao remover vantagem.");
      }
    } catch (error: any) {
      setAlertMessage(error.message || "Erro desconhecido.");
      setAlertType("destructive");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Gerenciamento de Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="nomeEmpresa"
            placeholder="Nome da Empresa"
            value={empresa.nomeEmpresa}
            onChange={handleProfileChange}
            disabled={!isEditing}
          />
          <Input
            name="dadosContato"
            placeholder="Dados de Contato"
            value={empresa.dadosContato}
            onChange={handleProfileChange}
            disabled={!isEditing}
          />
        </CardContent>
        <CardFooter className="space-y-4 flex flex-col">
          <Button
            variant="default"
            onClick={() => setIsEditing((prev) => !prev)}
            className="w-full"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          {isEditing && (
            <Button
              variant="default"
              onClick={handleProfileSave}
              className="w-full"
            >
              Salvar
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Gerenciamento de Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Vantagens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Adicionar Vantagem</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Vantagem</DialogTitle>
                </DialogHeader>
                <Input
                  name="descricao"
                  placeholder="Descrição da Vantagem"
                  value={formData.descricao}
                  onChange={handleVantagemChange}
                />
                <Input
                  name="fotoProduto"
                  placeholder="URL da Foto"
                  value={formData.fotoProduto}
                  onChange={handleVantagemChange}
                />
                <Input
                  name="custoMoedas"
                  placeholder="Custo em Moedas"
                  type="number"
                  value={formData.custoMoedas}
                  onChange={handleVantagemChange}
                />
                <Button onClick={handleAddVantagem} className="mt-4">
                  Salvar
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          {vantagens.length === 0 ? (
            <Alert variant="default">Nenhuma vantagem cadastrada.</Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vantagens.map((vantagem) => (
                  <TableRow key={vantagem.id}>
                    <TableCell>{vantagem.descricao}</TableCell>
                    <TableCell>
                      <img
                        src={vantagem.fotoProduto}
                        alt={vantagem.descricao}
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{vantagem.custoMoedas} Moedas</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteVantagem(vantagem.id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Alertas */}
      {alertMessage && <Alert variant={alertType}>{alertMessage}</Alert>}
    </div>
  );
};

export default PerfilEmpresa;
