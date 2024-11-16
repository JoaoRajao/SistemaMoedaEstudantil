"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Aluno = {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  rg?: string;
  endereco?: string;
  instituicao?: string;
  curso?: string;
};

interface AlunoFormProps {
  onSubmit: (aluno: Omit<Aluno, "id">) => void;
  aluno?: Aluno | null;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ onSubmit, aluno }) => {
  const [formData, setFormData] = useState<Aluno>({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicao: "",
    curso: "",
  });

  useEffect(() => {
    if (aluno) {
      setFormData(aluno);
    } else {
      setFormData({
        nome: "",
        email: "",
        cpf: "",
        rg: "",
        endereco: "",
        instituicao: "",
        curso: "",
      });
    }
  }, [aluno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="nome"
        placeholder="Nome"
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
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        required
      />
      <Input
        name="rg"
        placeholder="RG (Opcional)"
        value={formData.rg || ""}
        onChange={handleChange}
      />
      <Input
        name="endereco"
        placeholder="Endereço"
        value={formData.endereco}
        onChange={handleChange}
      />
      <Input
        name="instituicao"
        placeholder="Instituição de Ensino"
        value={formData.instituicao || ""}
        onChange={handleChange}
      />
      <Input
        name="curso"
        placeholder="Curso"
        value={formData.curso || ""}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        {aluno ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default AlunoForm;
