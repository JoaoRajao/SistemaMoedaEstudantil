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
import { useRouter } from "next/navigation";

const LoginAluno = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/aluno/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({ type: "success", message: "Login realizado com sucesso!" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        throw new Error("Credenciais incorretas");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido.",
      });
    }
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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
          <CardTitle>Login de Aluno</CardTitle>
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
            Ainda não tem uma conta?{" "}
            <a href="/aluno/register" className="text-blue-500 hover:underline">
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginAluno;
