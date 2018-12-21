import styled from 'styled-components';
import { media } from '../../identity/media/media';
import { spaces } from '../../identity/spaces/spaces';

interface MainProps {
  active?: boolean;
}

export const Main = styled.main<MainProps>`
  transition: 0.4s ease margin;
  margin: 0 ${spaces.medium};
  padding-top: ${spaces.xlargePlusMedium};

  ${({ active }) =>
    active &&
    `
    transition: .4s ease margin;
    margin-left: 14.6875rem;

    ${media.mobile`margin-left: ${spaces.medium}`}
  `}

  ${media.desktop`margin-left: 14.6875rem`}
  ${media.mobile`margin-left: ${spaces.medium}`}
`;
