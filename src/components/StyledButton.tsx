import styled from 'styled-components'
import type { ButtonProps } from '@/types'
import { pxToRem } from '@/utils'

// Adicionamos .withConfig para o erro do DOM
// E garantimos que o TypeScript aceite a prop no CSS
export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'lineHeight',
})<ButtonProps>`
  border-radius: ${pxToRem(8)};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${pxToRem(16)};
  font-weight: bold;
  height: ${pxToRem(50)};
  padding: 0 ${pxToRem(16)};
  transition: background-color 0.3s; 
  width: 100%;

  /* 
     Usamos uma função que mapeia explicitamente a prop de ButtonProps */
  line-height: ${(props: ButtonProps) => props.lineHeight || 'normal'};

  &.primary {
    background-color: ${(props) => props.theme.buttons.primary};
    color: ${(props) => props.theme.buttons.primaryColor};
    &:hover {
      background-color: ${(props) => props.theme.buttons.primaryHover};
    }
  }

  &.alert {
    background-color: ${(props) => props.theme.buttons.alert};
    color: ${(props) => props.theme.buttons.alertColor};
    &:hover {
      background-color: ${(props) => props.theme.buttons.alertHover};
    }
  }

  &.borderless-alert {
    background-color: transparent;
    color: ${(props) => props.theme.buttons.alert};
    /* Removi o height: 0 para o texto não sumir */
    &:hover {
      color: ${(props) => props.theme.buttons.alertHover};
    }
  }

  &:disabled {
    background-color: ${(props) => props.theme.buttons.disabled};
    color: ${(props) => props.theme.buttons.disabledColor};
    cursor: not-allowed;

    &:hover {
      background-color: ${(props) => props.theme.buttons.disabled};
      color: ${(props) => props.theme.buttons.disabledColor};
    }
  }
`