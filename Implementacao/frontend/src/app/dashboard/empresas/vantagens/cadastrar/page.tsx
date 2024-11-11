"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { vantagemService } from "@/services/api/vantagem-service";
import { vantagemSchema } from "@/utils/schemas";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { toast } from "react-toastify";

type FormData = {
  nome: string;
  descricao: string;
  custo: number;
  foto: string;
};

export default function CadastrarVantagemPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(vantagemSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.empresaId) {
      toast.error("Empresa não identificada");
      return;
    }

    try {
      setLoading(true);
      const response = await vantagemService.cadastrar({
        ...data,
        empresaId: user.empresaId.toString(),
        disponivel: false,
        empresa: undefined,
      });

      if (response.success) {
        toast.success("Vantagem cadastrada com sucesso!");
        reset();
      } else {
        toast.error(response.message || "Erro ao cadastrar vantagem");
      }
    } catch (error) {
      console.error("Erro ao cadastrar vantagem:", error);
      toast.error("Erro ao cadastrar vantagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Cadastrar Nova Vantagem" backButton>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nome da Vantagem"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <Input
            label="Descrição"
            {...register("descricao")}
            error={errors.descricao?.message}
          />

          <Input
            type="number"
            label="Custo em Moedas"
            {...register("custo", { valueAsNumber: true })}
            error={errors.custo?.message}
          />

          <Input
            label="URL da Imagem"
            {...register("foto")}
            error={errors.foto?.message}
          />

          <Button type="submit" isLoading={loading} className="w-full">
            Cadastrar Vantagem
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
