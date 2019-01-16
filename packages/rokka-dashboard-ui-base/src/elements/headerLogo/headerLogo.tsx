import React from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';

interface HeaderLogoProps {
  width?: string;
  marginBottom?: string;
}

export function HeaderLogo({ width = '7em', marginBottom }: HeaderLogoProps) {
  return (
    <LogoDiv marginBottom={marginBottom}>
      <LogoSVG width={width} viewBox="0 0 206 48" xmlns="http://www.w3.org/2000/svg">
        <StyledG id="Page-1-Copy-11" fill="none" fillRule="evenodd">
          <StyledG id="Desktop-HD" transform="translate(-52 -53)">
            <StyledG id="Group" transform="translate(52 53)">
              <path
                d="M65.652 38.602h7.122V28.72h2.013c.774 0 1.548 0 2.323-.155l4.955 10.037h7.741l-6.038-11.735c2.942-1.699 4.645-4.787 4.49-8.184 0-5.867-4.026-9.573-11.148-9.573H65.652v29.492zM76.8 15.286c2.942 0 4.18 1.236 4.18 3.706 0 2.625-1.548 3.86-4.49 3.86h-3.716v-7.566H76.8zm22.142 8.493c0-5.096 2.477-8.647 6.813-8.647 4.335 0 6.968 3.397 6.968 8.647 0 5.404-2.478 8.8-6.968 8.8-4.336 0-6.813-3.396-6.813-8.8zm-7.587 0c-.155 4.169 1.239 8.183 3.87 11.117 6.04 5.404 15.175 5.404 21.059 0 2.787-3.088 4.18-7.103 3.87-11.272.156-4.014-1.238-8.029-3.87-11.117-6.039-5.404-15.174-5.404-21.058 0-2.632 3.242-4.026 7.257-3.871 11.272zm39.948 14.823V26.558h2.942l6.813 12.044h8.207l-8.826-15.132 8.206-14.36h-7.897l-6.193 11.426h-3.097V9.11h-7.277v29.337h7.122v.155zm28.026 0V26.558h2.942l6.813 12.044h8.206l-8.825-15.132 8.051-14.206h-7.897l-6.193 11.427h-3.097V9.11h-7.123v29.337h7.123v.155zm18.116 0h7.742l1.548-5.405h9.29l1.704 5.405h7.742L195.097 9.264h-7.123l-10.529 29.338zm13.936-21.154l2.787 9.728h-5.574l2.787-9.728zm6.038-10.809V2.316h-11.767v4.17h11.767v.153z"
                id="rokka-text"
              />
              <StyledG id="rokka-box">
                <path id="Rechteck_6_Kopie_23" opacity=".8" d="M24.774 27.33L0 13.588v20.381l24.774 13.588z" />
                <path id="Rechteck_6_Kopie_24" d="M24.774 27.33l24.774-13.588V33.97L24.774 47.557z" />
                <path id="Rechteck_6_Kopie_23-2" opacity=".5" d="M49.548 13.588L24.774 0v20.382l24.774 13.587z" />
                <path id="Rechteck_6_Kopie_23-3" opacity=".3" d="M0 13.588L24.774 0v20.382L0 33.969z" />
              </StyledG>
            </StyledG>
          </StyledG>
        </StyledG>
      </LogoSVG>
    </LogoDiv>
  );
}

interface LogoDivProps {
  marginBottom?: string;
}

const LogoDiv = styled.div<LogoDivProps>`
  transform: scale(1);
  display: inline-block;
  vertical-align: middle;
  transform-origin: left center;
  font-size: 1.41176rem;
  color: ${colors.tints.white};
  ${({ marginBottom }) => marginBottom !== undefined && `margin-bottom: ${marginBottom}`}
`;

const LogoSVG = styled.svg`
  color: inherit;
  width: ${({ width }) => width};
  float: left;
  fill: currentColor;
  transition-property: opacity, transform;
  transition-duration: 0.5s;
`;

const StyledG = styled.g`
  fill: currentColor;
`;
