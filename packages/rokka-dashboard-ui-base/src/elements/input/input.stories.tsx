import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BooleanInput, NumberInput, TextInput } from './input';

storiesOf('Elements / Forms', module)
  .add('TextInput', () => (
    <TextInput
      name="textInputStory"
      value={text('textInput', 'test')}
      onChange={action('onChange')}
      placeholder={text('text', 'A placeholder')}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('BooleanInput', () => (
    <BooleanInput
      name="booleanInputStory"
      value={boolean('booleanInput', false)}
      onChange={action('onChange')}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('NumberInput', () => (
    <NumberInput
      name="numberInputStory"
      value={number('numberInput', 10)}
      onChange={action('onChange')}
      disabled={boolean('disabled', false)}
    />
  ));
