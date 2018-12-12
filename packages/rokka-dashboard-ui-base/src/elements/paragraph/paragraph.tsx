import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography/index';
import { media } from '../../identity/media/media';

export const ParagraphLoginBrand = styled.p`
  font-size: ${fonts.Sizes.small};
  color: ${colors.tints.white};
  position: absolute;
  bottom: ${spaces.medium};
  left: ${spaces.medium};
  margin: 0;
  ${media.desktop`
    left: auto;
    bottom: ${spaces.large};
    right: 44px;
  `}
`;

export const ParagraphWhite = styled.p`
  color: ${colors.tints.white};
  margin: 0;
`;

export const SpanWhite = styled.span`
  color: ${colors.tints.white};
`;
