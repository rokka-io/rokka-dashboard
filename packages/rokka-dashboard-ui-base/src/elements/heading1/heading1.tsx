import styled from 'styled-components';
import { fonts } from '../../identity/typography';
import { spaces } from '../../identity/spaces/spaces';

interface Heading1StylingProps {
  /** Color of heading text */
  color?: string;
  noMargin?:boolean;
}

export const Heading1 = styled.h1<Heading1StylingProps>`
  margin-top: 0;
  margin-bottom: ${({ noMargin }) => noMargin ? '0' : spaces.medium};
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.xlarge};
  color: ${({ color }) => color};
`;
