import { css } from 'styled-components';

export const breakpoints = {
  desktop: {
    min: 1024,
    max: null
  },
  tabletWide: {
    min: 832,
    max: 1023
  },
  tablet: {
    min: 640,
    max: 831
  },
};

export const mediaBreakpoints = {
  tablet: `(min-width: ${breakpoints.tablet.min / 16}em) and (max-width: ${breakpoints.tablet.max / 16}em)`,
  tabletAndUp: `(min-width: ${breakpoints.tablet.min / 16}em)`,
  tabletWideAndDown: `(max-width: ${breakpoints.tabletWide.max / 16}em)`,
  tabletWide: `(min-width: ${breakpoints.tabletWide.min / 16}em) and (max-width: ${breakpoints.tabletWide.max / 16}em)`,
  tabletWideAndUp: `(min-width: ${breakpoints.tabletWide.min / 16}em)`,
  desktop: `(min-width: ${breakpoints.desktop.min / 16}em)`,
};

export const media = Object.keys(mediaBreakpoints).reduce((acc, mediaBreakpoint) => {
  acc[mediaBreakpoint] = (...args) => css`
    @media only screen and ${mediaBreakpoints[mediaBreakpoint]} {
      ${css(...args)}
    }
  `;
  return acc
}, {});
