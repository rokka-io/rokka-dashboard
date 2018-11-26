import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { FormGroup } from './formGroup';
import { Input } from '../../elements/input/input';

storiesOf('Components', module).add('FormGroup', () => (
  <FormGroup label="Label for input">
    <Input placeholder={text('placeholder', 'A placeholder')} />
  </FormGroup>
));
