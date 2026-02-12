import type { FormEvent } from 'react'

export type inputProps = React.InputHTMLAttributes<HTMLInputElement>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type MessageProps = {
  msg: string
  type: 'error' | 'success'
}

export interface FormComponentProps {
  inputs: inputProps[]
  buttons: ButtonProps[]
  message?: MessageProps
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}
