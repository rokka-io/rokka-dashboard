import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface ShowOnActiveProps {
  active?: boolean;
  activeDisplay?: string;
}

export const ShowOnActive = styled.div<ShowOnActiveProps & HTMLAttributes<HTMLElement>>`
  display: ${({ active = true, activeDisplay = 'block' }) => (active ? activeDisplay : 'none')};
`;
