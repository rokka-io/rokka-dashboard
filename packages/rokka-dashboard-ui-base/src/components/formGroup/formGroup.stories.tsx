import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { TextInput } from '../../elements';
import { FormGroup } from './formGroup';

storiesOf('Components / Forms', module).add('FormGroup', () => (
  <FormGroup label="Label for input">
    <TextInput
      name="formGroupStory"
      value={text('value', '')}
      onChange={action('onChange')}
      placeholder={text('placeholder', 'A placeholder')}
    />
  </FormGroup>
));
