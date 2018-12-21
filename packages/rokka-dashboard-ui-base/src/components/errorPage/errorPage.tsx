import React from 'react';
import styled from 'styled-components';
import { Heading1, Link } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export const ErrorPage = () => (
  <StyledErrorContainer>
    <Heading1>Something went wrong</Heading1>
    <p>
      Unable to load the page
      <span role="img" aria-label="sad">
        😟
      </span>
      . Please{' '}
      <Link href="https://github.com/rokka-io/rokka-dashboard" rel="noopener">
        file an issue on GitHub.
      </Link>
      Thanks!{' '}
      <span role="img" aria-label="yay">
        😍
      </span>
    </p>
  </StyledErrorContainer>
);

const StyledErrorContainer = styled.div`
  background-color: ${colors.tints.white};
  padding: ${spaces.medium};

  :after {
    content: '';
    display: table;
    clear: both;
  }
`;
