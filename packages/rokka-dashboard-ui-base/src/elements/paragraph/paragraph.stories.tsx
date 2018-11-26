import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';

import { ParagraphLoginBrand } from './paragraph';

const ExampleContainer = styled.div`
  position: relative;
  background: ${colors.brand.primary};
  width: 200px;
  height: 200px;
`;

storiesOf('Elements / Paragraphs', module).add('Login Brand', () => (
  <ExampleContainer>
    <ParagraphLoginBrand>{text('text', 'Powered by Liip.')}</ParagraphLoginBrand>
  </ExampleContainer>
));
