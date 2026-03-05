import { useState, useMemo } from "react";
import type { InputProps } from "@/types";

export const useFormValidation = (inputs: InputProps[]) => {
  const [formValues, setFormValues] = useState<string[]>(
    inputs.map(() => "")
  );

  const formValid = useMemo(() => {
    return formValues.every((value, index) => {
      const input = inputs[index];
      if (!input) return false;

      if (input.required && !value.trim())
        return false;

      if (input.type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (input.type === "password") {
        return value.length >= 8;
      }

      return true;
    });
  }, [formValues, inputs]);

  const handleChange = (index: number, value: string) => {
    setFormValues((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // ✅ ADICIONADO
  const resetForm = () => {
    setFormValues(inputs.map(() => ""));
  };

  return { formValues, formValid, handleChange, resetForm };
};