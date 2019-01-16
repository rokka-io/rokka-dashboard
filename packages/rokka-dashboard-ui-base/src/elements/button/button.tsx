import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

export interface ButtonProps {
  /** Children */
  children?: ReactNode;
  /** Button type */
  type?: string;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Padding of button */
  padding?: string;
  /** Callback */
  onClick?(): void;
}

export function Button({ children, type = 'button', onClick, disabled = false, padding }: ButtonProps) {
  return (
    <StyledButton type={type} onClick={disabled ? undefined : onClick} disabled={disabled} padding={padding}>
      {children}
    </StyledButton>
  );
}

interface StyledButtonProps {
  disabled?: boolean;
  padding?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${colors.brand.primary};
  color: ${colors.tints.white};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-family: ${fonts.Families.semiBold};
  font-size: ${fonts.Sizes.medium};
  padding: ${({ padding = `0 ${spaces.large}` }) => padding};
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
