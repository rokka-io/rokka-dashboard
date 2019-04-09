import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import React, { ReactNode } from 'react';
import { Heading2, Tile } from '../../elements';

export interface DashboardChartProps {
  /** Chart Title */
  title?: string;
  /** Chart component */
  chart?: ReactNode;
}

export function DashboardChart({ title, chart }: DashboardChartProps) {
  return (
    <Tile>
      <Heading2 noMargin={true}>{title}</Heading2>
      <StyledChartContainer>
        {chart}
      </StyledChartContainer>
    </Tile>
  );
}

const StyledChartContainer = styled.div`
  margin-top: ${spaces.medium};
  background-color: ${colors.gray.lighter};
  height: 200px;
`;
