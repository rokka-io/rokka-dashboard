import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography/index';

export interface ButtonProps {
  /** Children */
  children?: ReactNode;
  /** Button type */
  type?: string;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Callback */
  onClick?(): void;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, type = 'button', onClick, disabled = false }) => (
  <StyledButton type={type} onClick={disabled ? undefined : onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

interface StyledButtonProps {
  disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${colors.brand.primary};
  color: ${colors.tints.white};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-family: ${fonts.Families.semiBold};
  font-size: ${fonts.Sizes.medium};
  padding: 0 ${spaces.large};
  border: 0;
  height: 38px;
  line-height: 38px;
  ${({ disabled }) => {
    if (disabled) {
      return `
        opacity: 0.5;
        pointer-events: none;
      `;
    }
    return null;
  }}
`;
