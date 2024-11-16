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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const CadastroAluno = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicao: "",
    curso: "",
    senha: "",
    confirmSenha: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [instituicoes, setInstituicoes] = useState<
    { id: number; nome: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInstituicoes = async () => {
      try {
        const response = await fetch("/api/instituicoes");
        if (response.ok) {
          const data = await response.json();
          setInstituicoes(data);
        } else {
          throw new Error("Erro ao carregar as instituições.");
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: "Erro ao carregar as instituições.",
        });
      }
    };

    fetchInstituicoes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmSenha) {
      setAlert({ type: "error", message: "As senhas não coincidem." });
      return;
    }

    try {
      const response = await fetch("/api/aluno/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          rg: formData.rg,
          endereco: formData.endereco,
          instituicao: formData.instituicao,
          curso: formData.curso,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        setAlert({
          type: "success",
          message: "Cadastro realizado com sucesso!",
        });
        setTimeout(() => {
          router.push("/aluno/login");
        }, 1000);
      } else {
        throw new Error("Erro ao cadastrar aluno.");
      }
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao cadastrar aluno." });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center space-y-4">
      {alert.message && (
        <div className="w-full max-w-md">
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            {alert.message}
          </Alert>
        </div>
      )}
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Cadastro de Aluno</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="nome"
              type="text"
              placeholder="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="cpf"
              type="text"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
            <Input
              name="rg"
              type="text"
              placeholder="RG"
              value={formData.rg}
              onChange={handleChange}
            />
            <Input
              name="endereco"
              type="text"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleChange}
            />
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, instituicao: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a Instituição" />
              </SelectTrigger>
              <SelectContent>
                {instituicoes.map((instituicao) => (
                  <SelectItem key={instituicao.id} value={instituicao.nome}>
                    {instituicao.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="curso"
              type="text"
              placeholder="Curso"
              value={formData.curso}
              onChange={handleChange}
              required
            />
            <Input
              name="senha"
              type="password"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <Input
              name="confirmSenha"
              type="password"
              placeholder="Confirme a Senha"
              value={formData.confirmSenha}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full mt-2">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">
            Já possui uma conta?{" "}
            <a href="/aluno/login" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CadastroAluno;
