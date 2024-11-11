export const constants = {
  ROLES: {
    ADMIN: "ADMIN",
    PROFESSOR: "PROFESSOR",
    ALUNO: "ALUNO",
    EMPRESA: "EMPRESA",
  },

  MOEDA: {
    LIMITE_MENSAL_PROFESSOR: 1000,
    MIN_VALOR_TRANSACAO: 1,
    MAX_VALOR_TRANSACAO: 100,
  },

  VANTAGEM: {
    MIN_CUSTO: 10,
    MAX_CUSTO: 1000,
  },

  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:7065/api",
    TIMEOUT: 8000,
  },

  ROUTES: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
    },
    DASHBOARD: "/dashboard",
    ALUNOS: "/alunos",
    PROFESSORES: "/professores",
    EMPRESAS: "/empresas",
    VANTAGENS: "/vantagens",
    TRANSACOES: "/transacoes",
  },

  VALIDATION_MESSAGES: {
    REQUIRED: "Campo obrigatório",
    INVALID_EMAIL: "E-mail inválido",
    INVALID_CPF: "CPF inválido",
    INVALID_CNPJ: "CNPJ inválido",
    INVALID_PASSWORD: "Senha deve ter no mínimo 6 caracteres",
    INVALID_DATE: "Data inválida",
  },
};
