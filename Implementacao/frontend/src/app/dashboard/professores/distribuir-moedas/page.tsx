"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { professorService } from "@/services/api/professor-service";
import { alunoService } from "@/services/api/aluno-service";
import { Aluno } from "@/types/aluno";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { distribuicaoMoedasSchema } from "@/utils/schemas";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import { toast } from "react-toastify";

type FormData = {
  alunoId: string;
  valor: number;
  motivo: string;
};

export default function DistribuirMoedasPage() {
  const { user } = useAuth();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(distribuicaoMoedasSchema),
  });

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await alunoService.listarAlunos();
        if (response.success && response.data?.data) {
          setAlunos(response.data.data || []);
        }
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        toast.error("Erro ao carregar lista de alunos");
      }
    };

    fetchAlunos();
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!user?.id) {
      toast.error("Usuário não identificado");
      return;
    }

    try {
      setLoading(true);
      const response = await professorService.distribuirMoedas(
        String(user.id),
        data
      );

      if (response.success) {
        toast.success("Moedas distribuídas com sucesso!");
        reset();
      } else {
        toast.error(response.message || "Erro ao distribuir moedas");
      }
    } catch (error) {
      console.error("Erro ao distribuir moedas:", error);
      toast.error("Erro ao distribuir moedas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Distribuir Moedas"
      description="Reconheça o mérito de seus alunos distribuindo moedas"
      backButton
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Select
            label="Selecione o Aluno"
            {...register("alunoId")}
            error={errors.alunoId?.message}
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome} - {aluno.curso}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            label="Quantidade de Moedas"
            placeholder="Digite a quantidade de moedas"
            {...register("valor", { valueAsNumber: true })}
            error={errors.valor?.message}
          />

          <Input
            type="text"
            label="Motivo da Distribuição"
            placeholder="Descreva o motivo da distribuição das moedas"
            {...register("motivo")}
            error={errors.motivo?.message}
          />

          <Button type="submit" isLoading={loading} className="w-full">
            Distribuir Moedas
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
