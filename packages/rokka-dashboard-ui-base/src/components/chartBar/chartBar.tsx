import React from 'react';
import styled from 'styled-components';
import { Heading1, Tile } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

export interface ChartBarProps {
  /** Statistic number */
  stat?: string;
  /** Statistic label */
  label?: string;
}

export function ChartBar({ stat, label}: ChartBarProps) {
  return (
    <Tile textAlign="center">
      <Heading1 color={colors.brand.primary} noMargin={true}>{stat}</Heading1>
      <StyledLabel>{label}</StyledLabel>
    </Tile>
  );
}

const StyledLabel = styled.p`
  font-size: ${fonts.Sizes.medium}
  margin-top: ${spaces.small};
  margin-bottom: 0;
`;