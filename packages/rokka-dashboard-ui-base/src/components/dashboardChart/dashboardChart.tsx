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
      {chart}
    </Tile>
  );
}