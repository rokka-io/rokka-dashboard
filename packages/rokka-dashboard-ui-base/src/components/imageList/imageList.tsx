import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { Heading2, Tile, Link } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export interface ImageTileProps {
  /** Images */
  children?: ReactNode;
  /** Title Toggle */
  title?: string;
  /** View All Images Url */
  viewAllUrl?: string;
}

export function ImageList({ children, viewAllUrl, title }: ImageTileProps) {
  return (
    <Tile>
      {title ? 
        <div>
          <Heading2 noMargin={true}>Latest Images</Heading2>
          <StyledLink href={viewAllUrl}>View All</StyledLink>
        </div>
      : null}
      <StyledImageList>{children}</StyledImageList>
    </Tile>
  );
}

const StyledImageList = styled.div`
  position: relative;
  padding: ${spaces.medium};
  background-color: ${colors.tints.white};
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: ${spaces.medium};
`;