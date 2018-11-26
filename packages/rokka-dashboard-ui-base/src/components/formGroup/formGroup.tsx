import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { spaces } from '../../identity/spaces/spaces';
import { Label } from '../../elements/label/label';

interface FormGroupProps {
  /** Children */
  children: ReactNode;
  /** Label */
  label: string;
}

export const FormGroup: FunctionComponent<FormGroupProps> = ({ children, label }) => (
  <StyledFormGroup>
    <Label>
      {label}
      {children}
    </Label>
  </StyledFormGroup>
);

const StyledFormGroup = styled.div`
  margin-bottom: ${spaces.medium};
`;
