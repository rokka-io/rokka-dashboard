import { css } from 'styled-components';

// FIXME: maybe rename that to something else than spaces
// because it can also e.g. mean a specific height.
export const spaces: { [index: string]: string } = {
  xsmall: '0.25rem',
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
  xlarge: '4rem'
};

export const SpacesGlobalStyle = css`
  * {
    box-sizing: border-box;
  }
`;
