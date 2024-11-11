"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { alunoService } from "@/services/api/aluno-service";
import { Aluno } from "@/types/aluno";
import AlunoCard from "@/components/cards/AlunoCard";
import PageContainer from "@/components/layout/PageContainer";
import SearchInput from "@/components/inputs/SearchInput";
import { useRouter } from "next/navigation";

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await alunoService.listarAlunos();
        if (response.data) {
          setAlunos(response.data as unknown as Aluno[]);
        }
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Alunos"
      description="Gerencie os alunos do sistema"
      actions={
        <SearchInput
          placeholder="Buscar alunos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlunos.map((aluno) => (
          <AlunoCard
            key={aluno.id}
            name={aluno.nome}
            course={aluno.curso}
            institution={aluno.instituicao}
            email={aluno.email}
            saldoMoedas={aluno.saldoMoedas}
            onClick={() => router.push(`/dashboard/aluno/${aluno.id}`)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
