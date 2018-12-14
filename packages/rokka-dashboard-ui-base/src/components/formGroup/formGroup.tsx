import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Label, LabelText } from '../../elements';
import { spaces } from '../../identity/spaces/spaces';

interface FormGroupProps {
  /** Children */
  children: ReactNode;
  /** Label */
  label: string;
}

export const FormGroup: FunctionComponent<FormGroupProps> = ({ children, label }) => (
  <StyledFormGroup>
    <Label>
      <LabelText>{label}</LabelText>
      {children}
    </Label>
  </StyledFormGroup>
);

const StyledFormGroup = styled.div`
  margin-bottom: ${spaces.medium};
`;
