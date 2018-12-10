import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { AvatarIcon } from '../../elements/icon/icon';
import { SpanWhite } from '../../elements/paragraph/paragraph';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

interface UserProps {
  /** Username */
  username: string;
}

export const User: FunctionComponent<UserProps> = ({ username }) => (
  <>
    <AvatarDiv>
      <AvatarIcon size="32px" color={colors.brand.avatar} />
    </AvatarDiv>
    <StyledUsername>{username}</StyledUsername>
  </>
);

const StyledUsername = styled(SpanWhite)`
  margin-left: ${spaces.small};
`;

const AvatarDiv = styled.div`
  border-radius: 50%;
  background: ${colors.tints.white};
  vertical-align: middle;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: inline-block;
`;
