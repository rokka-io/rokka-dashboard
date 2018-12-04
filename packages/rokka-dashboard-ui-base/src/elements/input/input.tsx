import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography/index';

export const Input = styled.input`
  font-family: ${fonts.families.brand};
  font-size: ${fonts.sizes.small};
  width: 100%;
  height: 38px;
  line-height: 38px;
  border: 1px solid ${colors.gray.light};
  padding: 0 ${spaces.small};
  outline: none;

  :focus {
    transition: border 0.4s ease;
    border-color: ${colors.gray.darker};
  }

  :disabled {
    color: ${colors.gray.darkest};
    background: ${colors.gray.lighter};
  }
`;
