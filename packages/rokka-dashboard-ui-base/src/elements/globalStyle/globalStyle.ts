import { createGlobalStyle } from 'styled-components';
import { SpacesGlobalStyle } from '../../identity/spaces/spaces';
import { FontGlobalStyle } from '../../identity/typography';

export const GlobalStyle = createGlobalStyle`
  ${SpacesGlobalStyle}
  ${FontGlobalStyle}
`;
