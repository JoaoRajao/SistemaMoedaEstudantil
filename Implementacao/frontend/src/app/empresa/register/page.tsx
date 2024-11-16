"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const CadastroEmpresa = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    contato: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      setAlert({ type: "error", message: "As senhas não coincidem." });
      return;
    }

    try {
      const response = await fetch("/api/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nomeEmpresa,
          contato: formData.contato,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        setAlert({
          type: "success",
          message: "Cadastro realizado com sucesso!",
        });
        setTimeout(() => router.push("/empresa/login"), 1000);
      } else {
        throw new Error("Erro ao cadastrar empresa.");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido.",
      });
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
          <CardTitle>Cadastro de Empresa Parceira</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="nomeEmpresa"
              type="text"
              placeholder="Nome da Empresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              required
            />
            <Input
              name="contato"
              type="text"
              placeholder="Contato"
              value={formData.contato}
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
            <a href="/empresa/login" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CadastroEmpresa;
