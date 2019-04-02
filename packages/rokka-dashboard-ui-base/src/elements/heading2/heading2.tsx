import styled from 'styled-components';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

interface Heading2StylingProps {
  /** Color of heading text */
  color?: string;
  /** No Margin of heading text */
  noMargin?:boolean;
}

export const Heading2 = styled.h2<Heading2StylingProps>`
  margin-top: 0;
  margin-bottom: ${({ noMargin }) => noMargin ? '0' : spaces.medium};
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.large};
  color: ${({ color }) => color};
`;
