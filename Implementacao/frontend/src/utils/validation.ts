import { z } from "zod";
import { constants } from "./constants";

export const validateCPF = (
  cpf: string
): z.SafeParseReturnType<string, string> => {
  const cleanCPF = cpf.replace(/[^\d]/g, "");

  if (cleanCPF.length !== 11) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cpf"],
          message: constants.VALIDATION_MESSAGES.INVALID_CPF,
        },
      ]),
    };
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (digit !== parseInt(cleanCPF[9])) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cpf"],
          message: constants.VALIDATION_MESSAGES.INVALID_CPF,
        },
      ]),
    };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (digit !== parseInt(cleanCPF[10])) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cpf"],
          message: constants.VALIDATION_MESSAGES.INVALID_CPF,
        },
      ]),
    };
  }

  return { success: true, data: cpf };
};

export const validateCNPJ = (
  cnpj: string
): z.SafeParseReturnType<string, string> => {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");

  if (cleanCNPJ.length !== 14) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cnpj"],
          message: constants.VALIDATION_MESSAGES.INVALID_CNPJ,
        },
      ]),
    };
  }

  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ[i]) * weights[i + 1];
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (digit !== parseInt(cleanCNPJ[12])) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cnpj"],
          message: constants.VALIDATION_MESSAGES.INVALID_CNPJ,
        },
      ]),
    };
  }

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ[i]) * weights[i];
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (digit !== parseInt(cleanCNPJ[13])) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["cnpj"],
          message: constants.VALIDATION_MESSAGES.INVALID_CNPJ,
        },
      ]),
    };
  }

  return { success: true, data: cnpj };
};
