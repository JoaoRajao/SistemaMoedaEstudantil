import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatters = {
  currency: (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },

  date: (date: Date | string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  },

  cpf: (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  cnpj: (cnpj: string) => {
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },

  moedas: (quantidade: number) => {
    return `${quantidade} moeda${quantidade !== 1 ? "s" : ""}`;
  },
};
