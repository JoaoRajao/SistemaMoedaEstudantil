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

const LoginEmpresa = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/empresas/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ type: "success", message: "Login realizado com sucesso!" });
        setTimeout(() => {
          router.push("/empresa/crud");
        }, 1000);
      } else {
        throw new Error("Email ou senha incorretos.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido.";
      setAlert({ type: "error", message: errorMessage });
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
          <CardTitle>Login de Empresa Parceira</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">
            Não possui uma conta?{" "}
            <a
              href="/empresa/register"
              className="text-blue-500 hover:underline"
            >
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginEmpresa;
