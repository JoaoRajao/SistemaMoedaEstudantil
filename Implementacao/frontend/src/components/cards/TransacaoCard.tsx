import React from "react";

interface TransacaoCardProps {
  descricao: string;
  valor: number;
  data: string;
  tipo: string;
}

const TransacaoCard: React.FC<TransacaoCardProps> = ({
  descricao,
  valor,
  data,
  tipo,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Descrição: {descricao}</h2>
      <p>
        Valor:{" "}
        {valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
      <p>Data: {data}</p>
      <p>Tipo: {tipo}</p>
    </div>
  );
};

export default TransacaoCard;
