import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Label, LabelText } from '../../elements';
import { spaces } from '../../identity/spaces/spaces';

interface FormGroupProps {
  /** Children */
  children: ReactNode;
  /** Label */
  label: string;
}

export function FormGroup({ children, label }: FormGroupProps) {
  return (
    <StyledFormGroup>
      <Label>
        <LabelText>{label}</LabelText>
        {children}
      </Label>
    </StyledFormGroup>
  );
}

const StyledFormGroup = styled.div`
  margin-bottom: ${spaces.medium};
`;
