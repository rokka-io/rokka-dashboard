import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { fonts } from '../../identity/typography/index';
import { media } from '../../identity/media/media';

export const ParagraphLoginBrand = styled.p`
  font-size: ${fonts.Sizes.small};
  color: ${colors.tints.white};
  position: absolute;
  bottom: 16px;
  left: 22px;
  ${media.tabletAndUp`
    bottom: 32px;
    right: 44px;
  `}
`;

export const ParagraphWhite = styled.p`
  color: ${colors.tints.white};
`;

export const SpanWhite = styled.span`
  color: ${colors.tints.white};
`;
