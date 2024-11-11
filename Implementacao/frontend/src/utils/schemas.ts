import { z } from "zod";
import { validateCNPJ, validateCPF } from "./validation";
import { constants } from "./constants";

// Schemas básicos
export const emailSchema = z
  .string()
  .email(constants.VALIDATION_MESSAGES.INVALID_EMAIL);

export const passwordSchema = z
  .string()
  .min(6, constants.VALIDATION_MESSAGES.INVALID_PASSWORD);

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, constants.VALIDATION_MESSAGES.INVALID_DATE);

export const cpfSchema = z
  .string()
  .min(11, "CPF deve ter 11 dígitos")
  .refine((cpf) => validateCPF(cpf), constants.VALIDATION_MESSAGES.INVALID_CPF);

export const cnpjSchema = z
  .string()
  .min(14, "CNPJ deve ter 14 dígitos")
  .refine(
    (cnpj) => validateCNPJ(cnpj),
    constants.VALIDATION_MESSAGES.INVALID_CNPJ
  );

// Schemas de autenticação
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Schemas de entidades
export const alunoSchema = z.object({
  nome: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  password: passwordSchema,
  curso: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  instituicao: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  cpf: cpfSchema,
  rg: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  endereco: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
});

export const professorSchema = z.object({
  nome: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  password: passwordSchema,
  departamento: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  instituicao: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  cpf: cpfSchema,
});

export const empresaSchema = z.object({
  nome: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  email: emailSchema,
  password: passwordSchema,
  cnpj: cnpjSchema,
  endereco: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  setor: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
});

export const vantagemSchema = z.object({
  nome: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  descricao: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  foto: z.string().min(1, "Foto é obrigatória"),
  custo: z
    .number()
    .positive("Custo deve ser positivo")
    .min(constants.VANTAGEM.MIN_CUSTO)
    .max(constants.VANTAGEM.MAX_CUSTO),
});

export const transacaoSchema = z.object({
  descricao: z.string().min(1, constants.VALIDATION_MESSAGES.REQUIRED),
  valor: z
    .number()
    .positive("Valor deve ser positivo")
    .min(constants.MOEDA.MIN_VALOR_TRANSACAO)
    .max(constants.MOEDA.MAX_VALOR_TRANSACAO),
  data: dateSchema,
  tipo: z.enum(["Crédito", "Débito"]),
  motivo: z.string().optional(), // Obrigatório apenas para professor
});

export const distribuicaoMoedasSchema = z.object({
  alunoId: z.string().min(1, "Aluno é obrigatório"),
  valor: z
    .number()
    .positive("Valor deve ser positivo")
    .min(constants.MOEDA.MIN_VALOR_TRANSACAO)
    .max(constants.MOEDA.MAX_VALOR_TRANSACAO),
  motivo: z.string().min(1, "Motivo é obrigatório"),
});

export const resgateCupomSchema = z.object({
  vantagemId: z.string().min(1, "Vantagem é obrigatória"),
  codigo: z.string().min(6, "Código inválido"),
});
