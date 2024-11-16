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

// Tipo Aluno conforme definição
type Aluno = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  instituicaoId: number; // Foreign Key para Instituicao
  curso: string;
  saldoMoedas: number; // Saldo atual de moedas
};

const PerfilAluno: React.FC = () => {
  const [aluno, setAluno] = useState<Aluno>({
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicaoId: 0,
    curso: "",
    saldoMoedas: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"default" | "destructive" | null>(
    null
  );

  useEffect(() => {
    // Fetch dados do aluno
    const fetchAluno = async () => {
      try {
        const response = await fetch("/api/aluno/perfil");
        if (response.ok) {
          const data: Aluno = await response.json();
          setAluno(data);
        } else {
          throw new Error("Erro ao carregar dados do aluno.");
        }
      } catch (error: any) {
        setAlertMessage(error.message || "Erro desconhecido.");
        setAlertType("destructive");
      }
    };

    fetchAluno();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/aluno/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: aluno.nome,
          email: aluno.email,
          cpf: aluno.cpf,
          rg: aluno.rg,
          endereco: aluno.endereco,
          instituicaoId: aluno.instituicaoId,
          curso: aluno.curso,
        }),
      });
      if (response.ok) {
        setAlertMessage("Dados atualizados com sucesso!");
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Aluno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            value={aluno.nome}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
            placeholder="Nome"
          />
          <Input
            value={aluno.email}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
            placeholder="Email"
          />
          <Input
            value={aluno.cpf}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
            placeholder="CPF"
          />
          <Input
            value={aluno.rg}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, rg: e.target.value })}
            placeholder="RG"
          />
          <Input
            value={aluno.endereco}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
            placeholder="Endereço"
          />
          <Input
            value={String(aluno.instituicaoId)}
            disabled={!isEditing}
            onChange={(e) =>
              setAluno({ ...aluno, instituicaoId: Number(e.target.value) })
            }
            placeholder="ID da Instituição"
          />
          <Input
            value={aluno.curso}
            disabled={!isEditing}
            onChange={(e) => setAluno({ ...aluno, curso: e.target.value })}
            placeholder="Curso"
          />
          <Input
            value={String(aluno.saldoMoedas)}
            disabled // Saldo de Moedas é sempre não editável
            placeholder="Saldo de Moedas"
          />
        </div>
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
          <Button variant="default" onClick={handleSave} className="w-full">
            Salvar
          </Button>
        )}
      </CardFooter>
      {alertMessage && <Alert variant={alertType}>{alertMessage}</Alert>}
    </Card>
  );
};

export default PerfilAluno;
