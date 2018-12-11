import styled from 'styled-components';
import { fonts } from '../../identity/typography/index';

interface Heading1StylingProps {
  /** Color of heading text */
  color?: string;
}

export const Heading1 = styled.h1<Heading1StylingProps>`
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.xlarge};
  color: ${({ color }) => color};
`;
