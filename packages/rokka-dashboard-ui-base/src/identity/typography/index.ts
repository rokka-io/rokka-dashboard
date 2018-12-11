interface Fonts {
  Families: { [index: string]: string };
  Sizes: { [index: string]: string };
  Weights: { [index: string]: number };
}

export const fonts: Fonts = {
  Families: {
    brand: '"Liip Etica Book", sans-serif',
    semiBold: '"Liip Etica SemiBold", sans-serif'
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
