import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography/index';

export const Link = styled.a`
  font-family: ${fonts.families.brand};
  color: ${colors.brand.primary};
  word-wrap: break-word;
  text-decoration: underline;

  :hover {
    text-decoration: none;  
  }
`;
