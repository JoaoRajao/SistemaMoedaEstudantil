"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { professorService } from "@/services/api/professor-service";
import { Professor } from "@/types/professor";
import ProfessorCard from "@/components/cards/ProfessorCard";
import PageContainer from "@/components/layout/PageContainer";
import SearchInput from "@/components/inputs/SearchInput";
import { useRouter } from "next/navigation";

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await professorService.listarProfessores();
        if (response.data) {
          setProfessores(response.data as unknown as Professor[]);
        }
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
      }
    };

    fetchProfessores();
  }, []);

  const filteredProfessores = professores.filter((professor) =>
    professor.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Professores"
      description="Gerencie os professores do sistema"
      actions={
        <SearchInput
          placeholder="Buscar professores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessores.map((professor) => (
          <ProfessorCard
            key={professor.id}
            name={professor.nome}
            discipline={professor.disciplina}
            institution={professor.instituicao}
            cpf={professor.cpf}
            rg={professor.rg}
            address={professor.endereco}
            salary={professor.salario}
            onClick={() =>
              router.push(`/dashboard/professores/${professor.id}`)
            }
          />
        ))}
      </div>
    </PageContainer>
  );
}
