"use client";

import { useAuth } from "@/contexts/AuthContext";
import CardContainer from "@/components/cards/CardContainer";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
} from "react-icons/fa";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: "Alunos",
      description:
        "Receba reconhecimento por seu desempenho e troque por vantagens exclusivas",
      icon: <FaUserGraduate className="text-blue-500 text-4xl mb-4" />,
    },
    {
      title: "Professores",
      description: "Distribua moedas para reconhecer o mérito de seus alunos",
      icon: <FaChalkboardTeacher className="text-green-500 text-4xl mb-4" />,
    },
    {
      title: "Empresas",
      description: "Ofereça vantagens e conecte-se com talentos acadêmicos",
      icon: <FaBuilding className="text-yellow-500 text-4xl mb-4" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Sistema Moeda Estudantil
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Plataforma inovadora que conecta alunos, professores e empresas em
            um sistema de reconhecimento e recompensas acadêmicas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <CardContainer key={feature.title} variant="dashboard">
                <div className="flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {feature.description}
                  </p>
                </div>
              </CardContainer>
            ))}
          </div>
          {!isAuthenticated && (
            <div className="flex items-center justify-center space-x-4">
              <Link href="/auth/cadastro/aluno" passHref>
                <Button variant="primary">Cadastrar como Aluno</Button>
              </Link>
              <Link href="/auth/cadastro/empresa" passHref>
                <Button variant="secondary">Cadastrar Empresa</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
