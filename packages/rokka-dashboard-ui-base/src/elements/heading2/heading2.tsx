import styled from 'styled-components';
import { fonts } from '../../identity/typography/index';

interface Heading2StylingProps {
  /** Color of heading text */
  color?: string;
}

export const Heading2 = styled.h2<Heading2StylingProps>`
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.large};
  color: ${({ color }) => color};
`;
