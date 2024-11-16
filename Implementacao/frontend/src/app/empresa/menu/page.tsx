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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

type Vantagem = {
  id: number;
  descricao: string;
  fotoUrl: string;
  custo: number;
  codigoResgate?: string;
};

const MenuEmpresa: React.FC = () => {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    descricao: "",
    fotoUrl: "",
    custo: "",
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [codigoParaValidar, setCodigoParaValidar] = useState("");
  const [validacaoResultado, setValidacaoResultado] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchVantagens = async () => {
      try {
        const response = await fetch("/api/vantagens");
        if (response.ok) {
          const data = await response.json();
          setVantagens(data);
        } else {
          throw new Error("Erro ao carregar vantagens.");
        }
      } catch {
        setAlertType("error");
        setAlertMessage("Erro ao carregar vantagens.");
      }
    };

    fetchVantagens();
  }, []);

  const handleAddVantagem = async () => {
    const { descricao, fotoUrl, custo } = formData;

    if (!descricao || !fotoUrl || !custo) {
      setAlertType("error");
      setAlertMessage("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("/api/vantagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descricao,
          fotoUrl,
          custo: parseInt(custo, 10),
        }),
      });

      if (response.ok) {
        const novaVantagem = await response.json();
        setVantagens((prev) => [...prev, novaVantagem]);
        setFormData({ descricao: "", fotoUrl: "", custo: "" });
        setAlertType("success");
        setAlertMessage("Vantagem cadastrada com sucesso!");
        setIsDialogOpen(false);
      } else {
        throw new Error("Erro ao adicionar vantagem.");
      }
    } catch {
      setAlertType("error");
      setAlertMessage("Erro ao adicionar vantagem.");
    }
  };

  const handleDeleteVantagem = async (id: number) => {
    try {
      const response = await fetch(`/api/vantagens/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVantagens((prev) => prev.filter((vantagem) => vantagem.id !== id));
        setAlertType("success");
        setAlertMessage("Vantagem excluída com sucesso!");
      } else {
        throw new Error("Erro ao excluir vantagem.");
      }
    } catch {
      setAlertType("error");
      setAlertMessage("Erro ao excluir vantagem.");
    }
  };

  const gerarCodigoResgate = async (vantagem: Vantagem) => {
    try {
      const response = await fetch(`/api/vantagens/${vantagem.id}/codigo`, {
        method: "POST",
      });

      if (response.ok) {
        const { codigoResgate } = await response.json();
        setVantagens((prev) =>
          prev.map((item) =>
            item.id === vantagem.id ? { ...item, codigoResgate } : item
          )
        );
        setAlertType("success");
        setAlertMessage(`Código gerado: ${codigoResgate}`);
      } else {
        throw new Error("Erro ao gerar código de resgate.");
      }
    } catch {
      setAlertType("error");
      setAlertMessage("Erro ao gerar código de resgate.");
    }
  };

  const validarCodigoResgate = async () => {
    try {
      const response = await fetch(`/api/codigo-resgate/validar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: codigoParaValidar }),
      });

      if (response.ok) {
        const data = await response.json();
        setValidacaoResultado(
          `Código válido! Vantagem: ${data.descricao}, Custo: ${data.custo} moedas.`
        );
      } else {
        setValidacaoResultado("Código inválido ou já utilizado.");
      }
    } catch {
      setValidacaoResultado("Erro ao validar código.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Card de Cadastro de Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Vantagens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Adicionar Vantagem
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Vantagem</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da vantagem para cadastrá-la.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    name="descricao"
                    placeholder="Descrição da Vantagem"
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    required
                  />
                  <Input
                    name="fotoUrl"
                    placeholder="URL da Foto"
                    value={formData.fotoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, fotoUrl: e.target.value })
                    }
                    required
                  />
                  <Input
                    name="custo"
                    placeholder="Custo em Moedas"
                    type="number"
                    value={formData.custo}
                    onChange={(e) =>
                      setFormData({ ...formData, custo: e.target.value })
                    }
                    required
                  />
                  <Button className="w-full" onClick={handleAddVantagem}>
                    Cadastrar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Lista de Vantagens */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Vantagens</CardTitle>
        </CardHeader>
        <CardContent>
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
                        src={vantagem.fotoUrl}
                        alt={vantagem.descricao}
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{vantagem.custo} Moedas</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => gerarCodigoResgate(vantagem)}
                      >
                        Gerar Código
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteVantagem(vantagem.id)}
                        className="ml-2"
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

      <Separator className="my-4" />

      {/* Validação de Código de Resgate */}
      <Card>
        <CardHeader>
          <CardTitle>Validar Código de Resgate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Insira o Código de Resgate"
            value={codigoParaValidar}
            onChange={(e) => setCodigoParaValidar(e.target.value)}
          />
          <Button onClick={validarCodigoResgate} className="w-full">
            Validar
          </Button>
          {validacaoResultado && (
            <Alert
              variant={
                validacaoResultado.startsWith("Código válido!")
                  ? "default"
                  : "destructive"
              }
            >
              {validacaoResultado}
            </Alert>
          )}
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

export default MenuEmpresa;
