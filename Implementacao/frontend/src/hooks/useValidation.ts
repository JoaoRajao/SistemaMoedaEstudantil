import { z } from "zod";

export const useValidation = () => {
  const validateField = (schema: z.ZodType<any>, value: any) => {
    try {
      schema.parse(value);
      return { isValid: true, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: "Erro de validação" };
    }
  };

  return { validateField };
};
