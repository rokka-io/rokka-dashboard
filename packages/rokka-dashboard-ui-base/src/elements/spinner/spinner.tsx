import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../identity/colors/colors';

interface SpinnerProps {
  small?: boolean;
  backgroundColor?: string;
}

export function Spinner({ small, backgroundColor }: SpinnerProps) {
  return (
    <FoldingCube small={small}>
      <Cube backgroundColor={backgroundColor} />
      <Cube2 backgroundColor={backgroundColor} />
      <Cube4 backgroundColor={backgroundColor} />
      <Cube3 backgroundColor={backgroundColor} />
    </FoldingCube>
  );
}

interface FoldingCubeProps {
  small?: boolean;
}

// TODO: rem instead of px?
const FoldingCube = styled.div<FoldingCubeProps>`
  margin: ${({ small = false }) => (small ? 0 : '20px auto')};
  width: ${({ small = false }) => (small ? '16px' : '40px')};
  height: ${({ small = false }) => (small ? '16px' : '40px')};
  position: relative;
  transform: rotateZ(45deg);
`;

const foldCubeAngle = keyframes`
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
`;

interface CubeProps {
  backgroundColor?: string;
}

const Cube = styled.div<CubeProps>`
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ backgroundColor = colors.tints.black }) => backgroundColor};
    animation: ${foldCubeAngle} 2.4s infinite linear both;
    transform-origin: 100% 100%;
  }
`;

const Cube2 = styled(Cube)`
  transform: scale(1.1) rotateZ(90deg);

  :before {
    animation-delay: 0.3s;
  }
`;
const Cube3 = styled(Cube)`
  transform: scale(1.1) rotateZ(180deg);

  :before {
    animation-delay: 0.6s;
  }
`;
const Cube4 = styled(Cube)`
  transform: scale(1.1) rotateZ(270deg);

  :before {
    animation-delay: 0.9s;
  }
`;
