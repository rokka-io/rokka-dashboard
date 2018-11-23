import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography/index';
import { spaces } from '../../identity/spaces/spaces';

export const Label = styled.label`
  font-family: ${fonts.families.brand};
  font-size: ${fonts.sizes.xsmall};
  color: ${colors.gray.darkest};
  font-weight: ${fonts.weights.bold};
  margin-bottom: ${spaces.small};
`;
