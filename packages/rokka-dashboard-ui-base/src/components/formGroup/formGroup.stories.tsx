import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { FormGroup } from './formGroup';
import { Input } from '../../elements/input/input';

storiesOf('Components', module).add('FormGroup', () => (
  <FormGroup id="an-id" label="Label for input">
    <Input id="an-id" placeholder={text('placeholder', 'A placeholder')} />
  </FormGroup>
));
