"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export type Professor = {
  id?: number;
  nome: string;
  cpf: string;
  departamento: string;
  instituicaoId: number;
};

interface ProfessorFormProps {
  professor?: Professor | null;
  onSubmit: (prof: Omit<Professor, "id">) => void;
}

const institutions = [
  { id: 1, name: "Instituição A" },
  { id: 2, name: "Instituição B" },
];

const ProfessorForm: React.FC<ProfessorFormProps> = ({
  professor,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<Professor, "id">>({
    nome: "",
    cpf: "",
    departamento: "",
    instituicaoId: institutions[0].id,
  });

  useEffect(() => {
    if (professor) {
      setFormData({
        nome: professor.nome,
        cpf: professor.cpf,
        departamento: professor.departamento,
        instituicaoId: professor.instituicaoId,
      });
    }
  }, [professor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "instituicaoId" ? parseInt(value, 10) : value,
    }));
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
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        required
      />
      <Input
        name="departamento"
        placeholder="Departamento"
        value={formData.departamento}
        onChange={handleChange}
        required
      />
      <Select
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, instituicaoId: Number(value) }))
        }
        value={String(formData.instituicaoId)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione uma Instituição" />
        </SelectTrigger>
        <SelectContent>
          {institutions.map((institution) => (
            <SelectItem key={institution.id} value={String(institution.id)}>
              {institution.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">{professor ? "Atualizar" : "Cadastrar"}</Button>
    </form>
  );
};

export default ProfessorForm;
