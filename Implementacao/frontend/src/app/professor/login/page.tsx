"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const ProfessorLogin: React.FC = () => {
  const [formData, setFormData] = useState({ login: "", senha: "" });
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/professor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas.");
      }

      const data = await response.json();

      // Armazenar informações de autenticação (ex.: token JWT)
      localStorage.setItem("token", data.token);

      setAlert({ type: "success", message: "Login realizado com sucesso!" });
      setTimeout(() => {
        router.push("/professor/menu"); // Redirecionar para o menu do professor
      }, 1000);
    } catch (error) {
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Erro desconhecido.",
      });
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center space-y-4">
      {alert && (
        <div className="w-full max-w-md">
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            {alert.message}
          </Alert>
        </div>
      )}
      <Card className="w-full max-w-md p-4 shadow-md">
        <CardHeader>
          <CardTitle>Login do Professor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              name="login"
              type="text"
              placeholder="Login"
              value={formData.login}
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
            Problemas para acessar?{" "}
            <a href="/contato" className="text-blue-500 hover:underline">
              Contate o suporte
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfessorLogin;
