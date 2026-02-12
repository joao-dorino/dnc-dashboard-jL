import { useState, useMemo } from "react";
import type { inputProps } from "@/types";

export const useFormValidation = (inputs: inputProps[]) => {
  const [formValues, setFormValues] = useState<string[]>(
    inputs.map(() => "")
  );

  const formValid = useMemo(() => {
    return formValues.every((value, index) => {
      const input = inputs[index];
      if (!input) return false;

      if (input.type === "email") {
        return /\S+@\S+\.\S+/.test(value);
      }

      if (input.type === "password") {
        return value.length >= 7;
      }

      return value.trim() !== "";
    });
  }, [formValues, inputs]);

  const handleChange = (index: number, value: string) => {
    setFormValues((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return { formValues, formValid, handleChange };
};
