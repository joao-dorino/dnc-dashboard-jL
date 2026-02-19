import { useState } from "react";
import type { inputProps } from "@/types";

export const useFormValidation = (inputs: inputProps[]) => {
  const [formValues, setFormValues] = useState<string[]>(
    inputs.map(() => "")
  );

  const handleChange = (index: number, value: string) => {
    setFormValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const formValid = inputs.every((input, index) => {
    const value = formValues[index];

    if (input.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (input.type === "password") {
      return value.length > 7;
    }

    return value.trim() !== "";
  });

  return {
    formValues,
    formValid,
    handleChange,
  };
};
