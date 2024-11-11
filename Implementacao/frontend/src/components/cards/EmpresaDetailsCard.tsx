import { Empresa } from "@/types/empresa";
import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";
import {
  FaBuilding,
  FaIdCard,
  FaMapMarkerAlt,
  FaIndustry,
  FaEnvelope,
} from "react-icons/fa";

interface EmpresaDetailsCardProps {
  empresa: Empresa;
}

export default function EmpresaDetailsCard({
  empresa,
}: EmpresaDetailsCardProps) {
  const infoItems = [
    {
      icon: <FaIdCard className="text-gray-400" />,
      label: "CNPJ",
      value: formatters.cnpj(empresa.cnpj),
    },
    {
      icon: <FaMapMarkerAlt className="text-gray-400" />,
      label: "Endereço",
      value: empresa.endereco,
    },
    {
      icon: <FaIndustry className="text-gray-400" />,
      label: "Setor",
      value: empresa.setor,
    },
    {
      icon: <FaEnvelope className="text-gray-400" />,
      label: "Email",
      value: empresa.email,
    },
  ];

  return (
    <CardContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-700 rounded-full">
            <FaBuilding className="text-2xl text-gray-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{empresa.nome}</h2>
            <p className="text-gray-400">Empresa Parceira</p>
          </div>
        </div>

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
      </div>
    </CardContainer>
  );
}
