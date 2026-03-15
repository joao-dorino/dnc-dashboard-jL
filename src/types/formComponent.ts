import type { FormEvent, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  lineHeight?: string;
};

export type MessageProps = {
  msg: string;
  type: "error" | "success";
};


export interface FormComponentProps {
  inputs: InputProps[];
  buttons: ButtonProps[];
  message?: MessageProps;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}