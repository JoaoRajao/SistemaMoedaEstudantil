"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { empresaService } from "@/services/api/empresa-service";
import { Empresa } from "@/types/empresa";
import EmpresaCard from "@/components/cards/EmpresaCard";
import PageContainer from "@/components/layout/PageContainer";
import SearchInput from "@/components/inputs/SearchInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        const response = await empresaService.listar();
        if (response.success && response.data) {
          setEmpresas(response.data as unknown as Empresa[]);
        } else {
          toast.error("Erro ao carregar empresas");
        }
      } catch (error) {
        console.error("Erro ao carregar empresas:", error);
        toast.error("Erro ao carregar lista de empresas");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  const filteredEmpresas = empresas.filter((empresa) =>
    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Empresas Parceiras"
      description="Gerencie as empresas parceiras do sistema"
      actions={
        <SearchInput
          placeholder="Buscar empresas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmpresas.map((empresa) => (
          <EmpresaCard
            key={empresa.id}
            name={empresa.nome}
            cnpj={empresa.cnpj}
            address={empresa.endereco}
            sector={empresa.setor}
            onClick={() => router.push(`/dashboard/empresas/${empresa.id}`)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
