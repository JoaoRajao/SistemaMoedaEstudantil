import { useState } from "react";
import { z } from "zod";

export function useForm<T extends Record<string, any>>(
  initialState: T,
  schema: z.ZodObject<any>
) {
  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    try {
      (schema.shape[name as keyof typeof schema.shape] as z.ZodString).parse(
        value
      );
      setErrors({ ...errors, [name]: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ ...errors, [name]: error.errors[0].message });
      }
    }
  };

  const validate = () => {
    try {
      schema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(newErrors);
      }
      return false;
    }
  };

  return { data, errors, handleChange, validate, setData };
}
