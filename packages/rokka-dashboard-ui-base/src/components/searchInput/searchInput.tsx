import React from 'react';
import styled from 'styled-components';
import { SearchIcon, TextInput } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

interface SearchInputProps {
  /** Input value */
  value: string;
  /** Input placeholder */
  placeholder?: string;
  /** onChange callback for input */
  onChange(value: string): void;
}

export function SearchInput({ onChange, ...props }: SearchInputProps) {
  return (
    <StyledContainer>
      <StyledInput name="searchInput" {...props} onChange={onChange} />
      <StyledSearchIcon width="1em" height="1em" color={colors.gray.dark} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: relative;
  padding: ${spaces.small} ${spaces.medium} ${spaces.small} ${spaces.smallPlusMedium};
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 0.875rem;
  right: 1.25rem;
`;

const StyledInput = styled(TextInput)`
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
