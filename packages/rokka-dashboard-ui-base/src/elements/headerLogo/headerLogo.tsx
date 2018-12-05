import styled from 'styled-components';

const logo = require('./img/rokka-logo.png');

export const HeaderLogo = styled.img.attrs({ src: logo })`
  display: inline-block;
  width: 140px;
  height: 32px;
  vertical-align: middle;
`;
