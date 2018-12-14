import { css, FlattenSimpleInterpolation } from 'styled-components';

interface MinMax {
  Min?: number;
  Max?: number;
}

interface Breakpoints {
  [index: string]: MinMax;
}

export const breakpoints: Breakpoints = {
  desktop: {
    Min: 1024
  },
  tabletWide: {
    Min: 832,
    Max: 1023
  },
  tablet: {
    Min: 640,
    Max: 831
  },
  mobile: {
    Max: 468
  }
};

interface MediaBreakpoints {
  [index: string]: string;
}

export const mediaBreakpoints: MediaBreakpoints = {
  mobile: `(max-width: ${(breakpoints.mobile.Max as number) / 16}em)`,
  tablet: `(min-width: ${(breakpoints.tablet.Min as number) / 16}em) and (max-width: ${(breakpoints.tablet.Max as number) /
    16}em)`,
  tabletAndUp: `(min-width: ${(breakpoints.tablet.Min as number) / 16}em)`,
  tabletWideAndDown: `(max-width: ${(breakpoints.tabletWide.Max as number) / 16}em)`,
  tabletWide: `(min-width: ${(breakpoints.tabletWide.Min as number) / 16}em) and (max-width: ${(breakpoints.tabletWide
    .Max as number) / 16}em)`,
  tabletWideAndUp: `(min-width: ${(breakpoints.tabletWide.Min as number) / 16}em)`,
  desktop: `(min-width: ${(breakpoints.desktop.Min as number) / 16}em)`
};

export const media = Object.keys(mediaBreakpoints).reduce(
  (acc, mediaBreakpoint) => {
    acc[mediaBreakpoint] = (literals: TemplateStringsArray, ...args: any[]) => css`
      @media only screen and (${mediaBreakpoints[mediaBreakpoint]}) {
        ${css(literals, ...args)}
      }
    `;
    return acc;
  },
  {} as Record<keyof typeof mediaBreakpoints, (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation>
);
