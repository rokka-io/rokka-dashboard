import { css } from 'styled-components';
import LFT_Etica_Book_LiipEot from './fonts/LFT_Etica_Book_Liip.eot';
import LFT_Etica_Book_LiipTTF from './fonts/LFT_Etica_Book_Liip.ttf';
import LFT_Etica_Book_LiipWoff from './fonts/LFT_Etica_Book_Liip.woff';
import LFT_Etica_Semibold_LiipEot from './fonts/LFT_Etica_Semibold_Liip.eot';
import LFT_Etica_Semibold_LiipTTF from './fonts/LFT_Etica_Semibold_Liip.ttf';
import LFT_Etica_Semibold_LiipWoff from './fonts/LFT_Etica_Semibold_Liip.woff';
import LFT_Etica_Book_LiipSVG from './fonts/LiipEticaBk.svg';
import LFT_Etica_Semibold_LiipSVG from './fonts/LiipEticaSB.svg';

interface Fonts {
  Families: { [index: string]: string };
  Sizes: { [index: string]: string };
  Weights: { [index: string]: number };
}

const LiipEticaBook = 'Liip Etica Book';
const LiipEticaSemiBold = 'Liip Etica SemiBold';

export const fonts: Fonts = {
  Families: {
    brand: `"${LiipEticaBook}", sans-serif`,
    semiBold: `"${LiipEticaSemiBold}", sans-serif`
  },
  Sizes: {
    // TODO: check if matches
    xsmall: '.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem'
  },
  Weights: {
    light: 100,
    regular: 300,
    bold: 700,
    heavy: 900
  }
};

export const FontGlobalStyle = css`
  body {
    font-family: ${LiipEticaBook};
    font-size: 100%;
  }
  @font-face {
    font-family: ${LiipEticaBook};
    font-weight: 100;
    src: url(${LFT_Etica_Book_LiipEot});
    src: url(${LFT_Etica_Book_LiipEot}) format('eot'), url(${LFT_Etica_Book_LiipWoff}) format('woff'),
      url(${LFT_Etica_Book_LiipTTF}) format('truetype'), url(${LFT_Etica_Book_LiipSVG}) format('svg');
  }

  @font-face {
    font-family: ${LiipEticaBook};
    font-weight: 400;
    src: url(${LFT_Etica_Book_LiipEot});
    src: url(${LFT_Etica_Book_LiipEot}) format('eot'), url(${LFT_Etica_Book_LiipWoff}) format('woff'),
      url(${LFT_Etica_Book_LiipTTF}) format('truetype'), url(${LFT_Etica_Book_LiipSVG}) format('svg');
  }

  @font-face {
    font-family: ${LiipEticaBook};
    font-weight: 700;
    src: url(${LFT_Etica_Book_LiipEot});
    src: url(${LFT_Etica_Book_LiipEot}) format('eot'), url(${LFT_Etica_Book_LiipWoff}) format('woff'),
      url(${LFT_Etica_Book_LiipTTF}) format('truetype'), url(${LFT_Etica_Book_LiipSVG}) format('svg');
  }

  @font-face {
    font-family: ${LiipEticaSemiBold};
    font-weight: 100;
    src: url(${LFT_Etica_Semibold_LiipEot});
    src: url(${LFT_Etica_Semibold_LiipEot}) format('eot'), url(${LFT_Etica_Semibold_LiipWoff}) format('woff'),
      url(${LFT_Etica_Semibold_LiipTTF}) format('truetype'), url(${LFT_Etica_Semibold_LiipSVG}) format('svg');
  }

  @font-face {
    font-family: ${LiipEticaSemiBold};
    font-weight: 400;
    src: url(${LFT_Etica_Semibold_LiipEot});
    src: url(${LFT_Etica_Semibold_LiipEot}) format('eot'), url(${LFT_Etica_Semibold_LiipWoff}) format('woff'),
      url(${LFT_Etica_Semibold_LiipTTF}) format('truetype'), url(${LFT_Etica_Semibold_LiipSVG}) format('svg');
  }

  @font-face {
    font-family: ${LiipEticaSemiBold};
    font-weight: 700;
    src: url(${LFT_Etica_Semibold_LiipEot});
    src: url(${LFT_Etica_Semibold_LiipEot}) format('eot'), url(${LFT_Etica_Semibold_LiipWoff}) format('woff'),
      url(${LFT_Etica_Semibold_LiipTTF}) format('truetype'), url(${LFT_Etica_Semibold_LiipSVG}) format('svg');
  }
`;
