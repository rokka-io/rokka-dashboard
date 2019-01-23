import { css } from 'styled-components';
import { colors } from '../colors/colors';
import { media } from '../media/media';

// FIXME: maybe rename that to something else than spaces
// because it can also e.g. mean a specific height.
export const spaces: { [index: string]: string } = {
  xsmall: '0.25rem',
  small: '0.5rem',
  medium: '1rem',
  smallPlusMedium: '1.5rem',
  large: '2rem',
  xlarge: '4rem',
  xlargePlusMedium: '5rem'
};

export const SpacesGlobalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(${colors.gray.lightest}, ${colors.gray.light}) no-repeat fixed;
    margin: 0;

    ${media.tabletAndUp`
      overflow-x: hidden;
    `}
  }
`;
