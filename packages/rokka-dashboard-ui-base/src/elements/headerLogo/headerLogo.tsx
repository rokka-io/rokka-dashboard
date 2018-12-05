import React from 'react';
import styled from 'styled-components';

const logo = require('./img/rokka-logo.png');

const StyledHeaderLogo = styled.img`
  display: inline-block;
  width: 140px;
  height: 32px;
  vertical-align: middle;
`;

export const HeaderLogo = () => <StyledHeaderLogo src={logo} />;
