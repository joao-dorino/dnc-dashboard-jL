import styled from 'styled-components';
import { StyledButton, StyledInput } from "@/components";
import type { FormComponentProps } from "@/types";
import { pxToRem } from '@/utils';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`;

function FormComponent(props: FormComponentProps) {
  const { inputs, buttons, message, onSubmit } = props;

  return (
    <StyledForm onSubmit={onSubmit}>
      {inputs.map((inputProps, index) => (
        <StyledInput key={index} {...inputProps} />
      ))}

      {buttons.map((buttonProps, index) => (
        <StyledButton key={index} {...buttonProps} />
      ))}

      {message && message.msg && (
        <div style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.msg}
        </div>
      )}
    </StyledForm>
  );
}

export default FormComponent;