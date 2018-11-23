import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { spaces } from '../../identity/spaces/spaces';
import { Label } from '../../elements/label/label';

interface FormGroupProps {
  /** Children */
  children: ReactNode;
  /** Label */
  label: string;
  /** ID where label belongs to */
  id: string;
}

export const FormGroup: FunctionComponent<FormGroupProps> = ({ children, id, label }) => (
  <StyledFormGroup>
    <Label htmlFor={id}>{label}</Label>
    {children}
  </StyledFormGroup>
);

const StyledFormGroup = styled.div`
  margin-bottom: ${spaces.medium};
`;
