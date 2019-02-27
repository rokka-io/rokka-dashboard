import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export interface TileProps {
  /** Children */
  children?: ReactNode;
  /** height */
  minHeight?: string;
  /** Text alignment */
  textAlign?: string;
}

export function Tile({ children, minHeight, textAlign }: TileProps) {
  return (
    <StyledTile minHeight={minHeight} textAlign={textAlign}>
      {children}
    </StyledTile>
  );
}

interface StyledTileProps {
  minHeight?: string;
  textAlign?: string;
}

const StyledTile = styled.div<StyledTileProps>`
  background: ${colors.tints.white};
  padding: ${spaces.medium};
  text-align: ${({ textAlign }) => textAlign};
  ${({ minHeight }) => {
    if (minHeight === 'short') {
      return `
        min-height: 80px;
      `;
    } else if (minHeight === 'tall') {
      return `
        min-height: 200px;
      `;
    }
    return null;
  }}
`;
