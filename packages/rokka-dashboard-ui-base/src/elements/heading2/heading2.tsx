import styled from 'styled-components';
import { fonts } from '../../identity/typography/index';

interface Heading2StylingProps {
  color?: string;
}

export const Heading2 = styled.h2<Heading2StylingProps>`
  font-family: ${fonts.families.brand};
  font-size: ${fonts.sizes.large};
  color: ${({ color }) => color};
`;
