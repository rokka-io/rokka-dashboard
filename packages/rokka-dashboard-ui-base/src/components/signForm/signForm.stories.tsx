import { storiesOf } from '@storybook/react';
import React from 'react';
import { Heading2 } from '../../elements/heading2/heading2';
import { colors } from '../../identity/colors/colors';
import { SignForm } from './signForm';

const marketingText = <Heading2 color={colors.tints.white}>Add marketing text here</Heading2>;

storiesOf('Components / Forms', module)
  // TODO: decide if we want to move that to a separate decorator so it can be used somewhere else, too.
  .addDecorator(story => (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: colors.gray.lightest }}>
      {story()}
    </div>
  ))
  .add('SignForm', () => (
    <SignForm isLogin={false} marketingText={marketingText}>
      <div>Form here</div>
    </SignForm>
  ));
