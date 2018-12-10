import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';

import { ParagraphLoginBrand, ParagraphWhite, SpanWhite } from './paragraph';

const ExampleContainer = styled.div`
  position: relative;
  background: ${colors.brand.primary};
  width: 200px;
  height: 200px;
`;

storiesOf('Elements / Paragraphs', module)
  .add('Login Brand', () => (
    <ExampleContainer>
      <ParagraphLoginBrand>{text('text', 'Powered by Liip.')}</ParagraphLoginBrand>
    </ExampleContainer>
  ))
  .add('White', () => (
    <ExampleContainer>
      <ParagraphWhite>{text('text', 'Some paragraph with a good text.')}</ParagraphWhite>
    </ExampleContainer>
  ))
  .add('Span White', () => (
    <ExampleContainer>
      <SpanWhite>{text('text', 'Some span with a good text.')}</SpanWhite>
    </ExampleContainer>
  ));
