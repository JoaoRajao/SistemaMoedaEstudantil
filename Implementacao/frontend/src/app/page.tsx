"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Título da Página */}
      <h1 className="text-4xl font-bold mb-8">
        Bem-vindo ao Sistema de Mérito Acadêmico!
      </h1>

      {/* Seção de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Card para Aluno */}
        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle>Área do Aluno</CardTitle>
            <CardDescription>
              Gerencie seu saldo, troque moedas por vantagens e muito mais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Acesse funcionalidades exclusivas para estudantes, incluindo
              consulta de saldo e extrato de transações.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => router.push("/aluno/login")}
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>

        {/* Card para Professor */}
        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle>Área do Professor</CardTitle>
            <CardDescription>
              Distribua moedas e acompanhe as transações dos alunos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Acesso às funcionalidades de envio de moedas, consulta de extrato
              e muito mais.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => router.push("/professor/login")}
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>

        {/* Card para Empresa */}
        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle>Área da Empresa</CardTitle>
            <CardDescription>
              Cadastre vantagens e gerencie resgates dos alunos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Acesso ao painel de gestão de vantagens oferecidas e monitoramento
              de trocas.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => router.push("/empresa/login")}
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>

        {/* Card para Admin */}
        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle>Área do Admin</CardTitle>
            <CardDescription>
              Gerencie todos os usuários e funcionalidades do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Acesso a configurações avançadas, gerenciamento de usuários e
              relatórios completos do sistema.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => router.push("/admin/login")}
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
