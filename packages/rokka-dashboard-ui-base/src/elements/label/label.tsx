import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography/index';

export const Label = styled.label`
  font-family: ${fonts.families.brand};
  font-size: ${fonts.sizes.xsmall};
  color: ${colors.gray.darkest};
  font-weight: ${fonts.weights.bold};
`;

export const LabelText = styled.span`
  display: inline-block;
  margin-bottom: ${spaces.small};
`;
