import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { spaces } from './spaces';

storiesOf('01 - Identities / Spaces', module).add(
  'Spaces',
  () => (
    <ul>
      {Object.keys(spaces).map(name => {
        return (
          <Entry key={name}>
            <Space size={spaces[name]}>{name}</Space>
          </Entry>
        );
      })}
    </ul>
  ),
  { info: { disable: true } }
);

const Entry = styled.li`
  list-style: none;
  padding: 2rem 0;
  display: block;
  border-bottom: 1px solid #efefef;
`;

const Space = styled.div<{ size: string }>`
  padding: ${({ size }) => `${size} 4px`};
  width: 4rem;
  border-radius: 0.25rem 0.25rem;
  border: 1px solid black;
`;
