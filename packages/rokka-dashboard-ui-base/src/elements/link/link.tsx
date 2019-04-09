import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography';

export const Link = styled.a`
  font-family: ${fonts.Families.brand};
  color: ${colors.brand.primary};
  word-wrap: break-word;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    color: ${colors.brand.primary};
  }
`;
