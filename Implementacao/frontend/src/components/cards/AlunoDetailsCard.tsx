import { Aluno } from "@/types/aluno";
import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";
import {
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUniversity,
  FaEnvelope,
  FaCoins,
} from "react-icons/fa";

interface AlunoDetailsCardProps {
  aluno: Aluno;
}

export default function AlunoDetailsCard({ aluno }: AlunoDetailsCardProps) {
  const infoItems = [
    {
      icon: <FaIdCard className="text-gray-400" />,
      label: "CPF",
      value: formatters.cpf(aluno.cpf),
    },
    {
      icon: <FaIdCard className="text-gray-400" />,
      label: "RG",
      value: aluno.rg,
    },
    {
      icon: <FaMapMarkerAlt className="text-gray-400" />,
      label: "Endereço",
      value: aluno.endereco,
    },
    {
      icon: <FaGraduationCap className="text-gray-400" />,
      label: "Curso",
      value: aluno.curso,
    },
    {
      icon: <FaUniversity className="text-gray-400" />,
      label: "Instituição",
      value: aluno.instituicao,
    },
    {
      icon: <FaEnvelope className="text-gray-400" />,
      label: "Email",
      value: aluno.email,
    },
  ];

  return (
    <CardContainer>
      <div className="space-y-6">
        {/* Cabeçalho com Nome e Saldo */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-700 rounded-full">
              <FaUser className="text-2xl text-gray-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{aluno.nome}</h2>
              <p className="text-gray-400">Aluno</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <FaCoins className="text-yellow-500 text-xl" />
              <span className="text-2xl font-bold text-white">
                {formatters.moedas(aluno.saldoMoedas)}
              </span>
            </div>
            <p className="text-sm text-gray-400">Saldo disponível</p>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg"
            >
              <div className="p-2 bg-gray-700 rounded-full">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <p className="text-gray-400">Cadastrado em</p>
            <p className="text-white">{formatters.date(aluno.createdAt)}</p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
