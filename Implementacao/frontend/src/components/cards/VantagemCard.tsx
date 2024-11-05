import React from "react";

interface VantagemCardProps {
  nome: string;
  descricao: string;
  custo: number;
}

const VantagemCard: React.FC<VantagemCardProps> = ({
  nome,
  descricao,
  custo,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{nome}</h2>
      <p className="mb-2">{descricao}</p>
      <p className="text-gray-700">
        Custo:{" "}
        {custo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
};

export default VantagemCard;
