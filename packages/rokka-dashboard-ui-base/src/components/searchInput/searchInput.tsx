import React from 'react';
import styled from 'styled-components';
import { Input, SearchIcon } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export const SearchInput = () => (
  <StyledContainer>
    <StyledInput />
    <StyledSearchIcon width="1em" height="1em" color={colors.gray.dark} />
  </StyledContainer>
);

const StyledContainer = styled.div`
  position: relative;
  padding: ${spaces.small} ${spaces.medium} ${spaces.small} ${spaces.medium + spaces.small};
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: ${spaces.small};
  right: ${spaces.xsmall};
`;

const StyledInput = styled(Input)`
  transition: border 0.3s ease;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: none;
  color: ${colors.tints.white};
  height: 1.75rem;
  line-height: 1.75rem;
  padding: 0 ${spaces.large} 0 0;

  :focus {
    transition: border 0.3s ease;
    border-color: ${colors.tints.white};

    & + ${StyledSearchIcon} {
      color: ${colors.tints.white};
    }
  }
`;
