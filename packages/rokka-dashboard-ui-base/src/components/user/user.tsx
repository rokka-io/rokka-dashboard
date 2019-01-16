import React from 'react';
import styled from 'styled-components';
import { AvatarIcon, SpanWhite } from '../../elements';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

interface UserProps {
  /** Username */
  username: string;
}

export function User({ username }: UserProps) {
  return (
    <StyledUserDiv>
      <AvatarDiv>
        <AvatarIcon width="32px" height="32px" color={colors.brand.avatar} />
      </AvatarDiv>
      <StyledUsername>{username}</StyledUsername>
    </StyledUserDiv>
  );
}

const StyledUserDiv = styled.div`
  line-height: inherit;
  float: left;
`;

const StyledUsername = styled(SpanWhite)`
  margin-left: ${spaces.small};
`;

const AvatarDiv = styled.div`
  border-radius: 50%;
  background: ${colors.tints.white};
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: inline-block;
  height: ${spaces.large};
  line-height: ${spaces.large};
  vertical-align: middle;
`;
