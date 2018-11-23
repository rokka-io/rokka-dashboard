import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography/index';
import { spaces } from '../../identity/spaces/spaces';

interface ButtonProps {
  /** Children */
  children: ReactNode;
  /** Button type */
  type?: string;
  /** Callback */
  onClick(): void;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, type, onClick }) => (
  <StyledButton type={type} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  type: 'button'
};

const StyledButton = styled.button`
  background-color: ${colors.brand.primary};
  color: ${colors.tints.white};
  cursor: pointer;
  font-family: ${fonts.families.semiBold};
  font-size: ${fonts.sizes.medium};
  padding: 0 ${spaces.large};
  border: 0;
  height: 38px;
  line-height: 38px;
`;
