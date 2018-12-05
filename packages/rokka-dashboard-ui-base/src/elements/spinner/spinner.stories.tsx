import { boolean, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';

import { Spinner } from './spinner';

const ExampleContainer = styled.div`
  position: relative;
  background: ${colors.brand.primary};
  width: 200px;
  height: 200px;
`;

storiesOf('Elements / ActivityIndicators', module).add('Spinner', () => (
  <ExampleContainer>
    <Spinner small={boolean('small', false)} backgroundColor={color('background color', colors.tints.black)} />
  </ExampleContainer>
));
