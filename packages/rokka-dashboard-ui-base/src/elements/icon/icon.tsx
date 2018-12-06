import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface IconProps {
  size?: string;
  color?: string;
}

interface AllIconProps extends IconProps {
  title: string;
  children: ReactNode;
}

const Icon: FunctionComponent<AllIconProps> = ({ size = '1em', color = 'currentColor', title, children }) => (
  <StyledSVG color={color} width={size} height={size} viewBox="0 0 32 32">
    <title>{title}</title>
    {children}
  </StyledSVG>
);

const StyledSVG = styled.svg`
  vertical-align: middle;
  fill: ${({ color }) => color};
`;
export const LogoutIcon: FunctionComponent<IconProps> = props => (
  <Icon title="Logout icon" {...props}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="logout-icon" transform="translate(-1.000000, -1.000000)">
        <g id="Outline_Icons_1_" transform="translate(1.000000, 1.000000)" fillRule="nonzero" fill="currentColor">
          <g id="Outline_Icons">
            <g id="Group">
              <path
                d="M11.146,15.146 C10.951,15.341 10.951,15.658 11.146,15.853 C11.341,16.048 11.658,16.048 11.853,15.853 L15.853,11.853 C16.047,11.658 16.048,11.341 15.853,11.145 L11.853,7.145 C11.658,6.95 11.341,6.95 11.146,7.145 C10.951,7.34 10.951,7.657 11.146,7.852 L14.293,11 L0.5,11 C0.224,11 -8.8817842e-16,11.224 -8.8817842e-16,11.5 C-8.8817842e-16,11.776 0.224,12 0.5,12 L14.293,12 L11.146,15.146 Z"
                id="Shape"
              />
              <path
                d="M11.5,0 C7.001,0 2.89,2.647 1.027,6.744 C0.913,6.995 1.024,7.292 1.275,7.406 C1.529,7.522 1.823,7.408 1.937,7.158 C3.639,3.417 7.392,1 11.5,1 C17.29,1 22,5.71 22,11.5 C22,17.29 17.29,22 11.5,22 C7.369,22 3.606,19.563 1.914,15.793 C1.801,15.541 1.505,15.428 1.253,15.542 C1.001,15.655 0.888,15.951 1.002,16.203 C2.854,20.332 6.976,23 11.5,23 C17.841,23 23,17.841 23,11.5 C23,5.159 17.841,0 11.5,0 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
        <g id="Invisible_SHape">
          <rect id="Rectangle-path" x="0" y="0" width="24" height="24" />
        </g>
      </g>
    </g>
  </Icon>
);

export const AvatarIcon: FunctionComponent<IconProps> = props => (
  <Icon title="Avatar icon" {...props}>
    <path
      fill="currentColor"
      d="M19.677,17.318L15,15.647v-2.207c1.503-1.162,2.5-3.165,2.5-5.441c0-3.584-2.467-6.5-5.5-6.5S6.5,4.416,6.5,8
			c0,2.276,0.997,4.279,2.5,5.441v2.207l-4.678,1.671C2.933,17.815,2,19.139,2,20.614V22.5C2,22.776,2.224,23,2.5,23h19
			c0.276,0,0.5-0.224,0.5-0.5v-1.886C22,19.139,21.066,17.815,19.677,17.318z M12,2.5c2.204,0,4.039,1.947,4.423,4.507
			c-0.007,0.001-0.011,0.001-0.018,0.002c-1.453,0.28-2.352-0.192-3.206-1.687c-0.09-0.159-0.229-0.245-0.444-0.252
			c-0.183,0.003-0.349,0.106-0.434,0.269C11.861,6.224,10.308,7,9,7C8.491,7,8.054,6.916,7.624,6.74C8.092,4.313,9.874,2.5,12,2.5z
			 M7.5,8c0-0.081,0.007-0.16,0.01-0.24C7.979,7.918,8.464,8,9,8c1.374,0,2.881-0.653,3.735-1.55
			c0.797,1.109,1.737,1.635,2.931,1.635c0.264,0,0.545-0.034,0.834-0.085c0,3.033-2.019,5.5-4.5,5.5S7.5,11.033,7.5,8z M21,22H3
			v-1.386c0-1.053,0.667-1.999,1.659-2.354l5.009-1.789C9.867,16.4,10,16.211,10,16v-1.951c0.621,0.288,1.294,0.451,2,0.451
			s1.379-0.164,2-0.451V16c0,0.211,0.133,0.4,0.332,0.471l5.008,1.789c0.993,0.355,1.66,1.301,1.66,2.354V22z"
    />
  </Icon>
);
