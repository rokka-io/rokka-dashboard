import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export interface BoxProps {
  /** Children */
  children?: ReactNode;
  /** height */
  height?: string;
}

export function Box({ children, height = '' }: BoxProps) {
  return (
    <StyledBox height={height}>
      {children}
    </StyledBox>
  );
}

interface StyledBoxProps {
  height?: string;
}

const StyledBox = styled.div<StyledBoxProps>`
  background: ${colors.tints.white};
  padding: ${spaces.medium};
  min-height: ${({ height }) => (height === 'short' ? '80px' : '200px')};
  margin-bottom: ${spaces.medium};
  position: relative;
`;
